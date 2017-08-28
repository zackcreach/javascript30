let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

function timer(seconds) {
  // Date.now() replaces new Date();
  clearInterval(countdown);
  const now = Date.now();
  const then = now + seconds * 1000;
  displayTimeLeft(seconds);
  displayEndTime(then);

  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    // check if we should stop the clock
    if (secondsLeft < 0) {
      clearInterval(countdown);
      return;
    }
    displayTimeLeft(secondsLeft);
  }, 1000);
}

function displayTimeLeft(seconds) {
  // Math.floor grabs the lower bound of the result
  const minutes = Math.floor(seconds / 60);
  const remainderSeconds = seconds % 60;
  const display = `${minutes}:${remainderSeconds < 10 ? '0' : '' }${remainderSeconds}`;
  timerDisplay.textContent = display;
}

function displayEndTime(timestamp) {
  const end = new Date(timestamp);
  const hour = end.getHours();
  const minutes = end.getMinutes();
  // Goofy if statement is to convert 24 hr clock to 12 hour
  endTime.textContent = `Be Back At ${(hour > 12) ? (hour - 12) : hour}:${minutes < 10 ? '0' : ''}${minutes}`;
}

function startTimer() {
  // this.dataset will give us an object with the time on it from the custom HTML attribute "data-time"
  // but it comes out in a string, so we use parseInt to convert to an integer
  const seconds = parseInt(this.dataset.time)
  timer(seconds);
}

buttons.forEach(button => button.addEventListener('click', startTimer));

// customForm is already created in the DOM when you add a name to a form! No need to select it first.
document.customForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const mins = this.minutes.value;
  timer(mins & 60);

  // this.reset() clears the value
  this.reset();
})
