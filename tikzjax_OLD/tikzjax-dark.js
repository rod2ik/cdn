import { Worker, spawn, Thread } from 'threads';
import { openDB } from 'idb';
import '../css/container.css';

// =================================================
// BASE URL
// =================================================
if (!document.currentScript) {
    const scripts = document.getElementsByTagName('script');
    document.currentScript = scripts[scripts.length - 1];
}

const url = new URL(document.currentScript.src);

// =================================================
// CACHE
// =================================================
const dbPromise = openDB('TikzJax', 2, {
    upgrade(db) {
        db.createObjectStore('svgImages');
    }
});

const getItem = async (key) =>
    (await dbPromise).get('svgImages', key);

const setItem = async (key, val) =>
    (await dbPromise).put('svgImages', val, key);

// =================================================
// STATE
// =================================================
let texWorker;
let observer;

// =================================================
// SPINNER (UNCHANGED)
// =================================================
const createLoader = () => {
    const frag = document.createRange().createContextualFragment(`
<svg width="75" height="75" viewBox="0 0 75 75">
    <rect width="100%" height="100%" fill="rgba(0,0,0,0.08)"/>
    <circle cx="37.5" cy="37.5" r="14"
        stroke="currentColor" fill="none" stroke-width="3"/>
    <circle cx="37.5" cy="37.5" r="14"
        stroke="currentColor" fill="none" stroke-width="3">
        <animateTransform attributeName="transform"
            type="rotate"
            from="0 37.5 37.5"
            to="360 37.5 37.5"
            dur="1s"
            repeatCount="indefinite"/>
    </circle>
</svg>
    `);

    return frag.firstChild;
};

// =================================================
// SOURCES (UNCHANGED)
// =================================================
const getTikzSources = (root = document) => {
    const sources = [];

    sources.push(...root.querySelectorAll('script[type="text/tikz"]'));
    sources.push(...root.querySelectorAll('pre.language-tikzjax'));

    return sources.filter(el => !el.dataset?.tikzjaxProcessed);
};

// =================================================
// TEXT EXTRACTION (UNCHANGED)
// =================================================
const getTikzSourceText = (elt) => {
    if (elt.tagName === 'SCRIPT') return elt.textContent || '';

    const code = elt.querySelector('code');
    return (code ? code.textContent : elt.textContent || '').trim();
};

// =================================================
// 🚀 SVG DARK MODE FIX (NEW CORE ADDITION)
// =================================================
const fixSvgColorsForTheme = (svg) => {
    const isDark =
        document.body?.getAttribute('data-md-color-scheme') === 'slate';

    if (!isDark) return;

    // 1. Fix black strokes/fills → white
    svg.querySelectorAll(
        '[fill="#000"], [fill="black"], [stroke="#000"], [stroke="black"]'
    ).forEach(el => {
        el.setAttribute('fill', 'white');
        el.setAttribute('stroke', 'white');
    });

    // 2. Fix text visibility
    svg.querySelectorAll('text, tspan').forEach(el => {
        el.setAttribute('fill', 'white');
    });

    // 3. Fix tkz-tab white boxes → transparent
    svg.querySelectorAll('[fill="#fff"], [fill="white"]').forEach(el => {
        el.setAttribute('fill', 'transparent');
    });
};

// =================================================
// WRAPPER (UNCHANGED)
// =================================================
const wrapSvg = (svg) => {
    const wrapper = document.createElement('span');
    wrapper.className = 'tikzjax-wrapper';

    svg.classList.add('tikzjax', 'tikz');
    svg.style.color = 'currentColor';

    wrapper.appendChild(svg);

    // ensure theme consistency immediately
    fixSvgColorsForTheme(svg);

    return wrapper;
};

// =================================================
// ENGINE (UNCHANGED LOGIC + FIX HOOK)
// =================================================
const processTikzSources = async (sources) => {
    const queue = [];

    const load = async (elt) => {
        const text = getTikzSourceText(elt);

        elt.dataset.tikzjaxProcessed = 'true';
        elt.tikzjaxText = text;

        const container =
            elt.closest('pre.language-tikzjax') ||
            elt.closest('script') ||
            elt;

        const loader = createLoader();

        const wrapper = document.createElement('span');
        wrapper.className = 'tikzjax-wrapper';

        container.replaceWith(wrapper);
        wrapper.appendChild(loader);

        elt.tikzjaxLoader = wrapper;

        queue.push(elt);
    };

    const process = async (elt) => {
        const text = elt.tikzjaxText;

        const cached = await getItem(text);

        let html;

        if (cached) {
            html = cached;
        } else {
            html = await texWorker.texify(text, {});
            await setItem(text, html);
        }

        const svg = document.createRange().createContextualFragment(html).firstChild;

        elt.tikzjaxLoader.replaceWith(wrapSvg(svg));

        // 🔥 IMPORTANT: apply dark mode fix after render
        fixSvgColorsForTheme(svg);

        svg.dispatchEvent(
            new Event('tikzjax-load-finished', { bubbles: true })
        );
    };

    for (const s of sources) await load(s);

    texWorker = await texWorker;

    for (const elt of queue) await process(elt);
};

// =================================================
// WORKER (UNCHANGED)
// =================================================
const initializeWorker = async () => {
    const root = url.href.replace(/\/tikzjax\.js(?:\?.*)?$/, '');

    const tex = await spawn(new Worker(`${root}/run-tex.js`));

    Thread.events(tex).subscribe(() => {});

    await tex.load(root);

    return tex;
};

// =================================================
// THEME OBSERVER (FIXED HOOK ONLY)
// =================================================
const observeTheme = () => {
    const obs = new MutationObserver(() => {
        document.querySelectorAll('svg.tikzjax, svg.tikz').forEach(svg => {
            fixSvgColorsForTheme(svg);
        });
    });

    obs.observe(document.body, {
        attributes: true,
        attributeFilter: ['data-md-color-scheme']
    });

    return obs;
};

// =================================================
// INIT (UNCHANGED)
// =================================================
const initialize = async () => {
    texWorker = await initializeWorker();

    const schedule = new Set();

    const scheduleProcess = (node) => {
        schedule.add(node);

        setTimeout(() => {
            processTikzSources([...schedule]);
            schedule.clear();
        }, 50);
    };

    const boot = () => {
        processTikzSources(getTikzSources(document));
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', boot);
    } else {
        boot();
    }

    observer = new MutationObserver((mutations) => {
        for (const m of mutations) {
            for (const node of m.addedNodes) {
                if (node.nodeType !== 1) continue;

                if (node.matches?.('script[type="text/tikz"]')) scheduleProcess(node);
                if (node.matches?.('pre.language-tikzjax')) scheduleProcess(node);

                node.querySelectorAll?.('script[type="text/tikz"]')?.forEach(scheduleProcess);
                node.querySelectorAll?.('pre.language-tikzjax')?.forEach(scheduleProcess);
            }
        }
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    observeTheme();

    setTimeout(() => {
        processTikzSources(getTikzSources(document));
    }, 300);
};

// =================================================
// BOOT
// =================================================
if (!window.TikzJax) {
    window.TikzJax = true;

    if (document.readyState === 'complete') {
        initialize();
    } else {
        window.addEventListener('load', initialize);
    }
}