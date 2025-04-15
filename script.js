const params = new URLSearchParams(window.location.search);
const nomeFilme = params.get("filme");

const video = document.getElementById("filme");
const playPauseBtn = document.getElementById("playPause");
const voltarBtn = document.getElementById("voltar");
const avancarBtn = document.getElementById("avancar");
const muteBtn = document.getElementById("mute");
const volumeSlider = document.getElementById("volume");
const telaCheiaBtn = document.getElementById("telaCheia");
const tempo = document.getElementById("tempo");

if (nomeFilme) {
  video.src = `filmes/${nomeFilme}`;
}

// Controles
playPauseBtn.onclick = () => {
  if (video.paused) {
    video.play();
    playPauseBtn.textContent = '⏸️';
  } else {
    video.pause();
    playPauseBtn.textContent = '⏯️';
  }
};

voltarBtn.onclick = () => video.currentTime -= 10;
avancarBtn.onclick = () => video.currentTime += 10;

muteBtn.onclick = () => {
  video.muted = !video.muted;
  muteBtn.textContent = video.muted ? '🔊' : '🔇';
};

volumeSlider.oninput = () => video.volume = volumeSlider.value;

telaCheiaBtn.onclick = () => {
  if (video.requestFullscreen) {
    video.requestFullscreen();
  }
};

video.ontimeupdate = () => {
  let atual = formatarTempo(video.currentTime);
  let total = formatarTempo(video.duration);
  tempo.textContent = `${atual} / ${total}`;
};

function formatarTempo(segundos) {
  let min = Math.floor(segundos / 60);
  let seg = Math.floor(segundos % 60);
  return `${String(min).padStart(2, '0')}:${String(seg).padStart(2, '0')}`;
}
