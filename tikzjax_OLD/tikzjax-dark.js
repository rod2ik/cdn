import { Worker, spawn, Thread } from 'threads';
import { openDB } from 'idb';
import '../css/container.css';

// =================================================
// BASE URL
// =================================================
if (document.currentScript === undefined) {
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
// THEME SUPPORT — MKDOCS 1.x / MATERIAL
// =================================================
const getMkdocsTheme = () => {
    const bodyTheme = document.body?.getAttribute('data-md-color-scheme');

    if (bodyTheme === 'slate') return 'dark';

    return 'light';
};

const isBlackValue = (value) => {
    if (!value) return false;

    const v = value.trim().toLowerCase();

    return (
        v === 'black' ||
        v === '#000' ||
        v === '#000000' ||
        v === 'rgb(0,0,0)' ||
        v === 'rgb(0, 0, 0)'
    );
};

const isWhiteValue = (value) => {
    if (!value) return false;

    const v = value.trim().toLowerCase();

    return (
        v === 'white' ||
        v === '#fff' ||
        v === '#ffffff' ||
        v === 'rgb(255,255,255)' ||
        v === 'rgb(255, 255, 255)'
    );
};

const isTextNode = (node) => {
    const tag = node?.tagName?.toLowerCase();

    return tag === 'text' || tag === 'tspan';
};

const rememberOriginalAttribute = (node, attr) => {
    const dataName = `tikzjaxOriginal${attr[0].toUpperCase()}${attr.slice(1)}`;

    if (!node.dataset[dataName] && node.hasAttribute(attr)) {
        node.dataset[dataName] = node.getAttribute(attr);
    }

    return node.dataset[dataName];
};

const applyThemeToTikz = (root = document) => {
    const isDark = getMkdocsTheme() === 'dark';

    root.querySelectorAll?.('.tikzjax-wrapper').forEach((wrapper) => {
        wrapper.style.color = isDark ? '#ffffff' : '#000000';

        const svg = wrapper.querySelector('svg');
        if (!svg) return;

        svg.classList.add('tikzjax', 'tikz');
        svg.style.color = 'currentColor';

        svg.querySelectorAll('[stroke]').forEach((node) => {
            const original = rememberOriginalAttribute(node, 'stroke');

            if (isBlackValue(original)) {
                node.setAttribute('stroke', isDark ? '#ffffff' : '#000000');
            }
        });

        svg.querySelectorAll('[fill]').forEach((node) => {
            const original = rememberOriginalAttribute(node, 'fill');

            if (isTextNode(node)) {
                node.setAttribute('fill', isDark ? '#ffffff' : '#000000');
                return;
            }

            if (isBlackValue(original)) {
                node.setAttribute('fill', isDark ? '#ffffff' : '#000000');
                return;
            }

            if (isWhiteValue(original)) {
                node.setAttribute('fill', isDark ? 'transparent' : '#ffffff');
            }
        });

        svg.querySelectorAll('text, tspan').forEach((node) => {
            node.setAttribute('fill', isDark ? '#ffffff' : '#000000');
        });
    });
};

const observeTheme = () => {
    if (!document.body) return;

    const themeObserver = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
            if (
                mutation.type === 'attributes' &&
                mutation.attributeName === 'data-md-color-scheme'
            ) {
                applyThemeToTikz(document);
            }
        }
    });

    themeObserver.observe(document.body, {
        attributes: true,
        attributeFilter: ['data-md-color-scheme']
    });
};

// =================================================
// SPINNER
// =================================================
const createLoader = () => {
    const frag = document.createRange().createContextualFragment(`
<svg class="tikzjax-loader" width="75" height="75" viewBox="0 0 75 75">
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
// SOURCES
// =================================================
const getTikzSources = (root = document) => {
    const sources = [];

    sources.push(...root.querySelectorAll('script[type="text/tikz"]'));
    sources.push(...root.querySelectorAll('pre.language-tikzjax'));

    return sources.filter((el) => !el.dataset?.tikzjaxProcessed);
};

// =================================================
// TEXT EXTRACTION
// =================================================
const getTikzSourceText = (elt) => {
    if (!elt) return '';

    if (elt.tagName === 'SCRIPT') {
        return elt.textContent || '';
    }

    const code = elt.querySelector('code');

    return (code ? code.textContent : elt.textContent || '').trim();
};

// =================================================
// SVG WRAPPER
// =================================================
const wrapSvg = (svg) => {
    const wrapper = document.createElement('span');
    wrapper.className = 'tikzjax-wrapper';

    svg.classList.add('tikzjax', 'tikz');
    svg.style.color = 'currentColor';

    wrapper.appendChild(svg);

    applyThemeToTikz(wrapper);

    return wrapper;
};

// =================================================
// ENGINE
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

        applyThemeToTikz(wrapper);

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

        applyThemeToTikz(document);

        svg.dispatchEvent(
            new Event('tikzjax-load-finished', { bubbles: true })
        );
    };

    for (const source of sources) {
        await load(source);
    }

    texWorker = await texWorker;

    for (const elt of queue) {
        await process(elt);
    }
};

// =================================================
// WORKER
// =================================================
const initializeWorker = async () => {
    const root = url.href.replace(/\/tikzjax\.js(?:\?.*)?$/, '');

    const tex = await spawn(new Worker(`${root}/run-tex.js`));

    Thread.events(tex).subscribe(() => {});

    await tex.load(root);

    return tex;
};

// =================================================
// INIT
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
        applyThemeToTikz(document);
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', boot);
    } else {
        boot();
    }

    observer = new MutationObserver((mutations) => {
        const targets = [];

        for (const mutation of mutations) {
            for (const node of mutation.addedNodes) {
                if (!node || node.nodeType !== 1) continue;

                if (node.matches?.('script[type="text/tikz"]')) {
                    targets.push(node);
                }

                if (node.matches?.('pre.language-tikzjax')) {
                    targets.push(node);
                }

                node.querySelectorAll?.('script[type="text/tikz"]')
                    ?.forEach((child) => targets.push(child));

                node.querySelectorAll?.('pre.language-tikzjax')
                    ?.forEach((child) => targets.push(child));
            }
        }

        if (targets.length) {
            targets.forEach(scheduleProcess);
        }
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    observeTheme();
    applyThemeToTikz(document);

    setTimeout(() => {
        processTikzSources(getTikzSources(document));
        applyThemeToTikz(document);
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