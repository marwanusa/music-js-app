/*
 1. Collect The assets 
 2. Setup HTML & CSS 
 3. get the songs from js array
 4. play & pause a song
 5. progress bar
 6. play the song (Keep Tracker on songs)
   a. next & previous button
   b. pressing on the song 
 7. repeat song
*/
let music = document.querySelector("#audio");
let play_pause_btn = document.querySelector("#play-pause");
let duration, minutes, seconds;
let curr_time = document.querySelector(".curr_time");
let passed_time;
let progress_bar = document.querySelector(".range");
let repeat = document.querySelector("#repeat");
let isRepeat = false;
let next = document.querySelector("#next");
let currentSongIndex = 0;
let prev = document.querySelector("#prev");
let songs = [
  {
    name: "Bread",
    img: "./imgs/Bread.jpg",
    duration: "2:41",
    src: "./musics/Bread.mp3",
  },
  {
    name: "Biscuit",
    img: "./imgs/Biscuit.jpg",
    duration: "1:48",
    src: "./musics/Biscuit.mp3",
  },
  {
    name: "Onion",
    img: "./imgs/Onion.jpg",
    duration: "2:16",
    src: "./musics/Onion.mp3",
  },
  {
    name: "Rose",
    img: "./imgs/Rose.jpg",
    duration: "2:43",
    src: "./musics/Rose.mp3",
  },
];

function loadSong(songIndex) {
  music.src = songs[songIndex].src;
  document.querySelector("img").src = songs[songIndex].img;
  document.querySelector(".artist h4").innerHTML = songs[songIndex].name;
  document.querySelector(".duration").innerHTML = songs[songIndex].duration;
  music.play();
  play_pause_btn.innerHTML = "&#10074;&#10074;";
}

document.querySelectorAll(".song").forEach((songEle, songInd) => {
  songEle.addEventListener("click", () => {
    loadSong(songInd);
    currentSongIndex = songInd;
    document
      .querySelectorAll(".song")
      .forEach((ele) => ele.classList.remove("active"));
    songEle.classList.add("active");
  });
});

next.addEventListener("click", () => {
  if (currentSongIndex < songs.length - 1) {
    currentSongIndex++;
    loadSong(currentSongIndex);
  } else {
    currentSongIndex = 0;
    loadSong(currentSongIndex);
  }
  document
    .querySelectorAll(".song")
    .forEach((ele) => ele.classList.remove("active"));
  document.querySelectorAll(".song")[currentSongIndex].classList.add("active");
});
prev.addEventListener("click", () => {
  if (currentSongIndex > 0) {
    currentSongIndex--;
    loadSong(currentSongIndex);
  } else {
    loadSong(0);
  }
  document
    .querySelectorAll(".song")
    .forEach((ele) => ele.classList.remove("active"));
  document.querySelectorAll(".song")[currentSongIndex].classList.add("active");
});
repeat.addEventListener("click", () => {
  isRepeat = !isRepeat;
  repeat.classList.toggle("active", isRepeat);
});

music.addEventListener("ended", () => {
  if (isRepeat) {
    music.currentTime = 0;
    music.play();
  }
});

music.addEventListener("loadedmetadata", () => {
  duration = music.duration;
  minutes = Math.floor(duration / 60);
  seconds = Math.floor(duration % 60);
  document.querySelector(".duration").innerHTML = `${minutes}:${seconds}`;
});
function update_curr_time() {
  passed_time = music.currentTime;
  let minutes = Math.floor(passed_time / 60);
  let seconds = Math.floor(passed_time % 60);
  curr_time.innerHTML = `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
}
function update_progress_bar() {
  if (duration && music.currentTime) {
    let progress = (music.currentTime / duration) * 100;
    progress_bar.value = progress;
  }
}
music.addEventListener("timeupdate", () => {
  update_curr_time();
  update_progress_bar();
});
play_pause_btn.addEventListener("click", () => {
  if (music.paused) {
    music.play();
    play_pause_btn.innerHTML = "&#10074;&#10074;";
  } else {
    music.pause();
    play_pause_btn.innerHTML = "&#9658;";
  }
});

progress_bar.addEventListener("input", () => {
  let seek_time = (progress_bar.value / 100) * duration;
  music.currentTime = seek_time;
  update_curr_time();
});
