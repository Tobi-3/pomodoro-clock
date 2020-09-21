// DOM objects

//sliders
const sliders = {
	focus: document.getElementById("focusInput"),
	shortBreak: document.getElementById("breakInput"),
	longBreak: document.getElementById("longBreakInput"),
};
//buttons
const btns = {
	stop: document.getElementById("stop"),
	start_pause: document.getElementById("pause_start"),
};

btns.start_pause.addEventListener("click", () => {
	if (!countdown.isRunning) {
		countdown.isRunning = true;
		startCountdown();
	}
});

//countdowndisplay
const countdownDisplay = document.getElementById("countdownDisplay");

//eventHandlers for sliders
sliders.focus.addEventListener("change", () => (countdown.countdownTime = sliders.focus.value * 60000));
sliders.shortBreak.addEventListener("change", () => (countdown.break = sliders.shortBreak.value * 60000));
sliders.longBreak.addEventListener("change", () => (countdown.longBreak = sliders.longBreak.value * 60000));

// holds timestamps and work/break times
const countdown = {
	countdownTime: sliders.focus.value * 60000, // duration of work cycle in millisecs
	break: sliders.shortBreak.value * 60000, // duration in millisecs
	longBreak: sliders.longBreak.value * 60000, // duration in millisecs

	cyclestage: 1, //represents
	isRunning: false, // currently running?
};

/**
 * gets remaing countdown time in browser
 * returns it formatted as mm:ss
 *
 * @param {number} timestamp
 * a Date() timestamp
 */
function formatRemainigTime(timestamp) {
	const minutes = Math.floor((timestamp / 60000) % 60);
	const seconds = Math.floor((timestamp / 1000) % 60);
	const formatedTime = `${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
	console.log(formatedTime);
	return formatedTime;
}

/**
 * updates the countdown display
 * @param {number} startingTime
 * timestamp when countdown was started
 */
function updateCountdown(countdownTime, startingTime) {
	const difference = new Date().getTime() - startingTime;

	if (countdownTime - difference < 0) {
		countdown.isRunning = false;
		countdownDisplay.textContent = formatRemainigTime(0);
		countdown.cyclestage = (countdown.cyclestage + 1) % 8;
		setColorAndTitle();



	} else {
		countdownDisplay.textContent = formatRemainigTime(countdownTime - difference);
		setTimeout(() => updateCountdown(countdownTime, startingTime), 60);
	}
}

function startCountdown() {
	const now = new Date().getTime();
	console.log(now);
	let countdownTime;

	countdownTime = countdown.cyclestage % 2 === 1 ? countdown.countdownTime
		: countdown.cyclestage === 0 ?
			countdown.longBreak : countdown.break;


	setColorAndTitle()
	updateCountdown(countdownTime, now);

}

function setColorAndTitle() {
	const even = countdown.cyclestage % 2 == 0;
	const color = even ? '#007ac1' : '#c10039';
	const time = countdown.cyclestage % 2 === 1 ? countdown.countdownTime
		: (countdown.cyclestage === 0 ? countdown.longBreak : countdown.break);

	countdownTitle.textContent = even ? `${countdown.cyclestage == 0 ? "Long " : ""}Break` : "Focus";
	countdownDisplay.textContent = formatRemainigTime(time)
	document.body.style.setProperty('--work-color', color);
}