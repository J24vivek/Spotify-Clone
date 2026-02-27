console.log("S_index.js loaded");

// Song data
const songs = [
    { songName: "Dil Ne Ye Kaha Hain Dil Se", filePath: "dilNe.mp3", coverPath: "Doremon.jpg" },
    { songName: "Chup Gaya", filePath: "chhup.mp3", coverPath: "Doremon.jpg" },
    { songName: "Bholi Si Surat", filePath: "Bholi.mp3", coverPath: "Doremon.jpg" },
    { songName: "Chand Chupa", filePath: "Chand.mp3", coverPath: "Doremon.jpg" }
];

let songIndex = 0;
let audioElement = new Audio(songs[songIndex].filePath);

// Play/Pause button
const masterPlay = document.getElementById('masterPlay');
masterPlay.addEventListener('click', function () {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.querySelector('i').classList.remove('fa-play');
        masterPlay.querySelector('i').classList.add('fa-pause');
    } else {
        audioElement.pause();
        masterPlay.querySelector('i').classList.remove('fa-pause');
        masterPlay.querySelector('i').classList.add('fa-play');
    }
});

// Progress bar
const progressBar = document.getElementById('myProgressBar');
audioElement.addEventListener('timeupdate', function () {
    if (audioElement.duration) {
        let progress = (audioElement.currentTime / audioElement.duration) * 100;
        progressBar.value = progress;
    }
});
progressBar.addEventListener('input', function () {
    audioElement.currentTime = (progressBar.value * audioElement.duration) / 100;
});

// Update song info and cover
function loadSong(index) {
    audioElement.src = songs[index].filePath;
    document.querySelector('.songInfo').innerText = songs[index].songName;
    document.querySelector('.card-img-top').src = songs[index].coverPath;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.querySelector('i').classList.remove('fa-play');
    masterPlay.querySelector('i').classList.add('fa-pause');
}

// Next/Prev buttons
document.querySelector('.fa-forward').addEventListener('click', function () {
    songIndex = (songIndex + 1) % songs.length;
    loadSong(songIndex);
});
document.querySelector('.fa-backward').addEventListener('click', function () {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    loadSong(songIndex);
});

// Initial load
loadSong(songIndex);