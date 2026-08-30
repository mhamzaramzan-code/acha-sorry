const soundButton = document.getElementById("soundButton");
const soundLabel = soundButton.querySelector(".sound-label");
let context = null;
let master = null;
let timer = null;
let chordIndex = 0;
const chords = [[261.63,329.63,392],[220,261.63,329.63],[174.61,220,261.63],[196,246.94,293.66]];

function playChord() {
  const now = context.currentTime;
  chords[chordIndex].forEach((frequency,index) => {
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = "sine";
    oscillator.frequency.value = frequency / (index === 0 ? 2 : 1);
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(.35, now + 1.8);
    gain.gain.linearRampToValueAtTime(0, now + 6.5);
    oscillator.connect(gain); gain.connect(master);
    oscillator.start(now); oscillator.stop(now + 6.7);
  });
  chordIndex = (chordIndex + 1) % chords.length;
}

function stopSound() {
  clearInterval(timer); timer = null;
  if (context) context.close();
  context = null; master = null;
  soundButton.classList.remove("playing");
  soundButton.setAttribute("aria-label", "Play ambient sound");
  soundLabel.textContent = "Play something gentle";
}

soundButton.addEventListener("click", () => {
  if (context) return stopSound();
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return;
  context = new AudioContext();
  master = context.createGain(); master.gain.value = .035; master.connect(context.destination);
  playChord(); timer = setInterval(playChord, 6200);
  soundButton.classList.add("playing");
  soundButton.setAttribute("aria-label", "Turn off ambient sound");
  soundLabel.textContent = "Sound on";
});
