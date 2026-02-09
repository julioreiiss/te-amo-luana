const text =
  "Luana, eu te amo mais do que palavras conseguem explicar.\n" +
  "Você é meu lar, meu melhor dia e minha paz.\n" +
  "Pra sempre nós! Eu te seguro 💕";

const typeEl = document.getElementById("type");
const btn = document.getElementById("btn");
const music = document.getElementById("music");
const debug = document.getElementById("debug");

let i = 0;

function typeWriter() {
  if (i <= text.length) {
    typeEl.textContent = text.slice(0, i);
    i++;
    setTimeout(typeWriter, 35);
  }
}
typeWriter();

// Debug: mostra se o áudio carregou e a duração
if (music) {
  music.addEventListener("loadedmetadata", () => {
    if (debug) debug.textContent = `Áudio ok: ${Math.round(music.duration)}s`;
  });
  music.addEventListener("error", () => {
    if (debug) debug.textContent = "Áudio com erro (formato/codec). Troque o mp3.";
  });
}

function spawnHeart() {
  const heart = document.createElement("div");
  heart.className = "heart";
  heart.textContent = Math.random() > 0.5 ? "💖" : "💗";

  const x = Math.random() * window.innerWidth;
  const y = window.innerHeight + 30;
  const size = 16 + Math.random() * 24;
  const drift = (Math.random() - 0.5) * 160;
  const duration = 2600 + Math.random() * 1600;

  heart.style.left = "0";
  heart.style.top = "0";
  heart.style.fontSize = `${size}px`;
  heart.style.transform = `translate(${x}px, ${y}px)`;

  document.body.appendChild(heart);

  const start = performance.now();
  function animate(time) {
    const progress = Math.min(1, (time - start) / duration);
    const translateY = y - progress * (window.innerHeight + 160);
    const translateX = x + drift * progress;
    const rotate = Math.sin(progress * Math.PI) * 20;

    heart.style.transform =
      `translate(${translateX}px, ${translateY}px) rotate(${rotate}deg)`;
    heart.style.opacity = `${1 - progress}`;

    if (progress < 1) requestAnimationFrame(animate);
    else heart.remove();
  }
  requestAnimationFrame(animate);
}

setInterval(spawnHeart, 120);

btn.addEventListener("click", () => {
  // tenta tocar o áudio
  if (music) {
    music.muted = false;
    music.volume = 1;
    music.play().catch(() => {});
  }

  btn.textContent = "Eu te amo 💖";
  setTimeout(() => (btn.textContent = "Clique aqui"), 2000);

  const burst = setInterval(spawnHeart, 35);
  setTimeout(() => clearInterval(burst), 1500);
});
