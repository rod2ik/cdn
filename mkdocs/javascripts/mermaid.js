window.addEventListener('load', function() {
  // console.log('All assets are now loaded')

  document.querySelectorAll("svg[id^='mermaid'] .messageText")
  .forEach( el => {
    el.setAttribute("dominant-baseline","top");
});

})



