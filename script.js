const soundButton = document.getElementById("soundButton");
const soundLabel = soundButton.querySelector(".sound-label");
const backgroundMusic = document.getElementById("backgroundMusic");

backgroundMusic.volume = 0.35;

soundButton.addEventListener("click", async () => {
  if (backgroundMusic.paused) {
    try {
      await backgroundMusic.play();

      soundButton.classList.add("playing");
      soundButton.setAttribute("aria-label", "Pause music");
      soundLabel.textContent = "Music on";
    } catch (error) {
      soundLabel.textContent = "Tap to play";
    }
  } else {
    backgroundMusic.pause();

    soundButton.classList.remove("playing");
    soundButton.setAttribute("aria-label", "Play music");
    soundLabel.textContent = "Play our song";
  }
});
