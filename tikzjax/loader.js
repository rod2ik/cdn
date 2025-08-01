async function loadAllTikzModules() {
    // console.log("massilia-xtables PAGE LOADED");
    
    await import('./tikzjax.js');
    await import('./tikzjax-dark.js');

}

loadAllTikzModules();