function timer(seconds) {
  // Date.now() replaces new Date();
  const now = Date.now()
  const then = now + seconds * 1000;

  setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    // check if we shoudl stop the clock
    if (secondsLeft <= 0) {
      return;
    }

  }, 1000);
}
