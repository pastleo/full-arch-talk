(() => {
  const timeline = document.getElementById('timeline');
  if(window.params.start && window.params.end && timeline) {
    const start = new Date(window.params.start);
    const period = new Date(window.params.end) - start;
    setInterval(() => {
      timeline.style.cssText = `left: ${(new Date() - start) * 100 / period}%;`;
    }, 1000);
  } else {
    console.info(
    `timeline.js: add #/start=${(new Date()).toISOString()}/end=${(new Date()).toISOString()}`
    );
  }
})();
