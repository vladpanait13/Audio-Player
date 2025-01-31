let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");

let playPause_btn = document.querySelector(".playPause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");

let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");
let randomIcon = document.querySelector(".fa-random");
let wave = document.getElementById("wave");
let curr_track = document.createElement("audio");

let track_index = 0;
let isPlaying = false;
let isRandom = false;
let updateTimer;

const music_list = [
  {
    img: "./assets/images/pinkfloyd.jpg",
    name: "Time",
    artist: "Pink Floyd",
    music: "./assets/music/pinkfloyd.mp3",
  },
  {
    img: "./assets/images/nirvana.jpeg",
    name: "Something in the Way",
    artist: "Nirvana",
    music: "./assets/music/nirvana.mp3",
  },
  {
    img: "./assets/images/travis.jpg",
    name: "Goosebumps",
    artist: "Travis Scott",
    music: "./assets/music/travis.mp3",
  },
  {
    img: "./assets/images/keinemusik.png",
    name: "Say What",
    artist: "Keinemusik Rampa &ME Adam Port",
    music: "./assets/music/keinemusik.mp3",
  },
];

// Load Track

loadTrack(track_index);

function loadTrack(track_index) {
  clearInterval(updateTimer);
  reset();

  curr_track.src = music_list[track_index].music;
  curr_track.load();

  track_art.style.backgroundImage = "url(" + music_list[track_index].img + ")";
  track_name.textContent = music_list[track_index].name;
  track_artist.textContent = music_list[track_index].artist;

  now_playing.textContent =
    "Playing music " + (track_index + 1) + " of " + music_list.length;

  updateTimer = setInterval(setUpdate, 1000);

  curr_track.addEventListener("loadedmetadata", () => {
    total_duration.textContent = formatTime(curr_track.duration);
    curr_track.volume = volume_slider.value / 100;
  });

  curr_track.addEventListener("ended", nextTrack);
}

function reset() {
  curr_time.textContent = "0:00";
  total_duration.textContent = "0:00";
  seek_slider.value = 0;
}

// Format time helper function

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60);
  return `${minutes < 10 ? "0" : ""} ${minutes}:${sec < 10 ? "0" : ""}${sec}`;
}

// Random track functionality

function randomTrack() {
  isRandom = !isRandom;
  randomIcon.classList.toggle("randomActive");
}

// Repeat current track

function repeatTrack() {
  loadTrack(track_index);
  playTrack();
}

// Play or pause track

function playPauseTrack() {
  isPlaying ? pauseTrack() : playTrack();
}

function playTrack() {
  curr_track.play();
  isPlaying = true;
  track_art.classList.add("rotate");
  wave.classList.add("loader");
  playPause_btn.innerHTML = '<i class="fa fa-pause-circle fa-3x"></i>';
}

function pauseTrack() {
  curr_track.pause();
  isPlaying = false;
  track_art.classList.remove("rotate");
  wave.classList.remove("loader");
  playPause_btn.innerHTML = '<i class="fa fa-play-circle fa-3x"></i>';
}

// Play next track

function nextTrack() {
  if (isRandom) {
    let random_index = Math.floor(Math.random() * music_list.length);
    track_index = random_index;
  } else {
    track_index = (track_index + 1) % music_list.length;
  }
  loadTrack(track_index);
  playTrack();
}

// Play the previous track

function prevTrack() {
  track_index = (track_index - 1 + music_list.length) % music_list.length;
  loadTrack(track_index);
  playTrack();
}

// Seek slider

function seekTo() {
  let seekTo = curr_track.duration * (seek_slider.value / 100);
  curr_track.currentTime = seekTo;
}

// Volume control

function setVolume() {
  curr_track.volume = volume_slider.value / 100;
}

// Update seek slider and current time

function setUpdate() {
  if (!isNaN(curr_track.duration)) {
    let seekPosition = (curr_track.currentTime / curr_track.duration) * 100;
    seek_slider.value = seekPosition;

    curr_time.textContent = formatTime(curr_track.currentTime);
  }
}
