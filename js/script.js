/* ============================================================
   SELAMAT PAGI SAYANG - script.js
   Semua bagian yang BOLEH & MUDAH kamu ubah ada di atas,
   ditandai dengan komentar "GANTI DI SINI".
   ============================================================ */

/* ---------- 0. GANTI DI SINI: PIN untuk masuk website ---------- */
const CORRECT_PIN = "141023";

/* ---------- 1. GANTI DI SINI: tanggal mulai hubungan kalian ---------- */
/* Format: Tahun, Bulan (0=Jan,...,11=Des), Tanggal, Jam, Menit */
const START_DATE = new Date(2023, 9, 14, 0, 0); // 14 Oktober 2023

/* ---------- 2. GANTI DI SINI: isi pesan rahasia ---------- */
const SECRET_MESSAGE = `Halo sayang, ini pesan rahasia dariku untukmu.
Terima kasih sudah selalu ada. Aku sayang kamu selalu. ❤️`;

/* ---------- 3. GANTI DI SINI: judul lagu & penyanyi ---------- */
const SONG_TITLE = "You Are The Reason";
const SONG_ARTIST = "Calum Scott";

/* ============================================================
   JANGAN DIUBAH DI BAWAH INI (kecuali kamu paham JavaScript)
   ============================================================ */

/* ---------- Jam & Tanggal langsung (real time) ---------- */
const dayNames = ["Minggu","Senin","Selasa","Rabu","Kamis","Jumat","Sabtu"];
const monthNames = ["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"];

function updateClock(){
  const now = new Date();
  let h = now.getHours();
  const m = now.getMinutes().toString().padStart(2,"0");
  const ampm = h >= 12 ? "PM" : "AM";
  h = h % 12; h = h ? h : 12;
  document.getElementById("clock").textContent = `${h.toString().padStart(2,"0")}:${m} ${ampm}`;
  document.getElementById("dateDisplay").textContent =
    `${dayNames[now.getDay()]}, ${now.getDate()} ${monthNames[now.getMonth()]} ${now.getFullYear()}`;
}
updateClock();
setInterval(updateClock, 1000);

/* ---------- Timer "Sudah bersama selama" ---------- */
function updateTimer(){
  const now = new Date();
  let diff = Math.max(0, now - START_DATE);

  const days = Math.floor(diff / (1000*60*60*24));
  diff -= days * 1000*60*60*24;
  const hours = Math.floor(diff / (1000*60*60));
  diff -= hours * 1000*60*60;
  const minutes = Math.floor(diff / (1000*60));
  diff -= minutes * 1000*60;
  const seconds = Math.floor(diff / 1000);

  document.getElementById("days").textContent = days.toString().padStart(3,"0");
  document.getElementById("hours").textContent = hours.toString().padStart(2,"0");
  document.getElementById("minutes").textContent = minutes.toString().padStart(2,"0");
  document.getElementById("seconds").textContent = seconds.toString().padStart(2,"0");
}
updateTimer();
setInterval(updateTimer, 1000);

/* ---------- Efek mengetik ---------- */
const typingText = "Semoga harimu seindah senyummu...";
const typingEl = document.getElementById("typingText");
let typeIndex = 0;
function typeEffect(){
  if(typeIndex <= typingText.length){
    typingEl.textContent = typingText.slice(0, typeIndex);
    typeIndex++;
    setTimeout(typeEffect, 70);
  } else {
    setTimeout(()=>{ typeIndex = 0; typeEffect(); }, 3000);
  }
}
typeEffect();

/* ---------- Hati & kelopak bunga beterbangan ---------- */
const floatingLayer = document.getElementById("floatingLayer");
const symbols = ["♥","❤","♡","🌸"];

function spawnFloatingItem(){
  const item = document.createElement("div");
  item.className = "floating-item";
  item.textContent = symbols[Math.floor(Math.random()*symbols.length)];
  const size = 14 + Math.random()*22;
  item.style.left = Math.random()*100 + "vw";
  item.style.fontSize = size + "px";
  item.style.color = Math.random() > 0.5 ? "#ff8fab" : "#ffd6e6";
  const duration = 8 + Math.random()*10;
  item.style.animationDuration = duration + "s";
  floatingLayer.appendChild(item);
  setTimeout(()=> item.remove(), duration*1000);
}
setInterval(spawnFloatingItem, 600);
for(let i=0;i<10;i++) setTimeout(spawnFloatingItem, i*300);

/* ---------- Music Player ---------- */
const audio = document.getElementById("audioPlayer");
const playBtn = document.getElementById("playBtn");
const vinyl = document.getElementById("vinyl");
const progressBar = document.getElementById("progressBar");
const currentTimeEl = document.getElementById("currentTime");
const durationTimeEl = document.getElementById("durationTime");

document.getElementById("musicTitle").textContent = SONG_TITLE;
document.getElementById("musicArtist").textContent = SONG_ARTIST;

function formatTime(sec){
  if(isNaN(sec)) return "00:00";
  const m = Math.floor(sec/60).toString().padStart(2,"0");
  const s = Math.floor(sec%60).toString().padStart(2,"0");
  return `${m}:${s}`;
}

playBtn.addEventListener("click", ()=>{
  if(audio.paused){
    audio.play().catch(()=>{
      alert("Taruh file musik di assets/music/song.mp3 dulu ya, supaya bisa diputar!");
    });
    vinyl.classList.add("playing");
    playBtn.textContent = "⏸";
  } else {
    audio.pause();
    vinyl.classList.remove("playing");
    playBtn.textContent = "▶";
  }
});

audio.addEventListener("loadedmetadata", ()=>{
  progressBar.max = audio.duration;
  durationTimeEl.textContent = formatTime(audio.duration);
});

audio.addEventListener("timeupdate", ()=>{
  progressBar.value = audio.currentTime;
  currentTimeEl.textContent = formatTime(audio.currentTime);
  const pct = (audio.currentTime / (audio.duration||1)) * 100;
  progressBar.style.background = `linear-gradient(to right, var(--pink-4) ${pct}%, var(--pink-2) ${pct}%)`;
});

progressBar.addEventListener("input", ()=>{
  audio.currentTime = progressBar.value;
});

document.getElementById("prevBtn").addEventListener("click", ()=>{
  audio.currentTime = 0;
});
document.getElementById("nextBtn").addEventListener("click", ()=>{
  audio.currentTime = audio.duration || 0;
});

/* ---------- Modal Pesan Rahasia ---------- */
const secretModal = document.getElementById("secretModal");
document.getElementById("secretMessage").textContent = SECRET_MESSAGE;

function openModal(){ secretModal.classList.add("show"); }
function closeModal(){ secretModal.classList.remove("show"); }

document.getElementById("secretBtn").addEventListener("click", openModal);
document.getElementById("envelopeBtn").addEventListener("click", openModal);
document.getElementById("closeModal").addEventListener("click", closeModal);
secretModal.addEventListener("click", (e)=>{
  if(e.target === secretModal) closeModal();
});

/* ---------- FRAGMENT 1: Layar PIN ---------- */
const pinScreen = document.getElementById("pinScreen");
const giftScreen = document.getElementById("giftScreen");
const mainSite = document.getElementById("mainSite");
const pinBoxesWrap = document.getElementById("pinBoxes");
const pinBoxes = document.querySelectorAll(".pin-box");
const pinError = document.getElementById("pinError");
const pinSubmit = document.getElementById("pinSubmit");

// pindah otomatis ke kotak berikutnya saat diisi
pinBoxes.forEach((box, i)=>{
  box.addEventListener("input", ()=>{
    box.value = box.value.replace(/[^0-9]/g, ""); // hanya angka
    if(box.value && i < pinBoxes.length - 1){
      pinBoxes[i+1].focus();
    }
  });
  box.addEventListener("keydown", (e)=>{
    if(e.key === "Backspace" && !box.value && i > 0){
      pinBoxes[i-1].focus();
    }
    if(e.key === "Enter"){
      checkPin();
    }
  });
});

function checkPin(){
  const entered = Array.from(pinBoxes).map(b => b.value).join("");
  if(entered.length < CORRECT_PIN.length){
    triggerPinError();
    return;
  }
  if(entered === CORRECT_PIN){
    // PIN benar -> pindah ke Fragment 2 (kotak hadiah)
    pinScreen.classList.add("hidden");
    giftScreen.classList.remove("hidden");
  } else {
    triggerPinError();
  }
}

function triggerPinError(){
  pinError.classList.add("show");
  pinBoxesWrap.classList.add("shake");
  setTimeout(()=>{
    pinBoxesWrap.classList.remove("shake");
    pinBoxes.forEach(b => b.value = "");
    pinBoxes[0].focus();
  }, 400);
}

pinSubmit.addEventListener("click", checkPin);

/* ---------- FRAGMENT 2: Layar Kotak Hadiah ---------- */
const giftBox = document.getElementById("giftBox");
const giftCaption = document.getElementById("giftCaption");
let giftOpened = false;

giftBox.addEventListener("click", ()=>{
  if(giftOpened) return;
  giftOpened = true;
  giftBox.classList.add("opened");
  giftCaption.textContent = "Yeay, terbuka! 💖";

  // setelah animasi kotak selesai, pindah ke Fragment 3 (website utama)
  setTimeout(()=>{
    giftScreen.classList.add("hidden");
    mainSite.classList.remove("hidden");
  }, 900);
});

/* ---------- BUKET BUNGA DIGITAL: klik tangkai -> muncul pesan ---------- */
const flowerPopup = document.createElement("div");
flowerPopup.className = "flower-popup";
flowerPopup.id = "flowerPopup";
document.body.appendChild(flowerPopup);

let flowerPopupTimeout = null;

document.querySelectorAll(".flower").forEach((flower)=>{
  flower.addEventListener("click", ()=>{
    const msg = flower.dataset.message || "Kamu spesial buatku ♥";
    flowerPopup.textContent = msg;

    // posisikan popup tepat di atas bunga yang diklik
    const rect = flower.getBoundingClientRect();
    const popupWidth = 230;
    let left = rect.left + rect.width/2 - popupWidth/2;
    left = Math.max(12, Math.min(left, window.innerWidth - popupWidth - 12));
    const top = rect.top - 96;

    flowerPopup.style.left = left + "px";
    flowerPopup.style.top = top + "px";
    flowerPopup.classList.add("show");

    flower.classList.add("picked");

    clearTimeout(flowerPopupTimeout);
    flowerPopupTimeout = setTimeout(()=>{
      flowerPopup.classList.remove("show");
    }, 3200);
  });
});

/* ---------- Smooth scroll untuk menu navbar ---------- */
document.querySelectorAll('.nav-links a').forEach(link=>{
  link.addEventListener('click', function(e){
    e.preventDefault();
    document.querySelectorAll('.nav-links a').forEach(a=>a.classList.remove('active'));
    this.classList.add('active');
    const target = document.querySelector(this.getAttribute('href'));
    if(target) target.scrollIntoView({behavior:'smooth', block:'start'});
  });
});