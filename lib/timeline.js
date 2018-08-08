(() => {
  console.info("timeline: type '~' to set timeline time");
  document.addEventListener('keypress', ({ key }) => {
    if(key === '~') {
      const minutes = parseFloat(prompt('How long is this session? (in minutes)'));
      let start_time = (new Date(
        prompt('when will the session start? (ISO date format, empty to start from now)')
      )).getTime();
      if(isNaN(start_time)) {
        start_time = (new Date()).getTime();
      }

      window.params = {
        start: (new Date(start_time)).toISOString(),
        end: (new Date(start_time + Math.ceil(minutes * 60000))).toISOString(),
      };
      window.location.reload();
    }
  });

  if(window.params.start && window.params.end && timeline) {
    const timeline = document.getElementById('timeline');

    const start = new Date(window.params.start);
    const period = new Date(window.params.end) - start;

    setInterval(() => {
      const percent = (new Date() - start) * 100 / period;
      if(percent >= -5 && percent <= 105) {
        timeline.style.cssText = `left: ${percent}%;`;
      }
    }, 1000);

    console.info("timeline: activated");
    console.info("  start:", start);
    console.info("  period:", period, "seconds");
  }
})();
