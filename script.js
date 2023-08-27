console.log("Welcome to spotify");

// initialize the variables
let songIndex = 1;
let audioElement = new Audio('songs/Perfect.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songitem'));

let songs = [
    {songName: "Perfect", filePath: "songs/1.mp3", coverPath: "songcover/Perfect.jpg"},
    {songName: "Photograph", filePath: "songs/2.mp3", coverPath: "songcover/Photograph.jpg"},
    {songName: "Steal-My-Girl", filePath: "songs/3.mp3", coverPath: "songcover/Steal-My-Girl.jpg"},
    {songName: "Unstoppable", filePath: "songs/4.mp3", coverPath: "songcover/Perfect.jpg"},
    {songName: "Closer", filePath: "songs/5.mp3", coverPath: "songcover/Closer.jpg"},
    {songName: "Darkside", filePath: "songs/6.mp3", coverPath: "songcover/Darkside.jpg"},
    {songName: "Middle of the Night", filePath: "songs/7.mp3", coverPath: "songcover/Middle of the Night.jpg"},
    {songName: "Lovely", filePath: "songs/8.mp3", coverPath: "songcover/Lovely.jpg"},
    {songName: "Dusk till Dawn", filePath: "songs/9.mp3", coverPath: "songcover/Dusk.jpg"},
    {songName: "Fairytale", filePath: "songs/10.mp3", coverPath: "songcover/Fairytale.jpg"},
];

songItems.forEach( (element, i) => {
    console.log(element, i);
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songname")[0].innerText = songs[i].songName;
});

// handle play/pause click
masterPlay.addEventListener('click', () => {
    if(audioElement.paused || audioElement.currentTime<=0) {
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;

        const currentPlayIcon = document.getElementById(songIndex);
        currentPlayIcon.classList.remove('fa-circle-play');
        currentPlayIcon.classList.add('fa-circle-pause');
    }
    else {
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity = 0;

        const currentPlayIcon = document.getElementById(songIndex);
        currentPlayIcon.classList.remove('fa-circle-pause');
        currentPlayIcon.classList.add('fa-circle-play');
    }
});

// listen to events
audioElement.addEventListener('timeupdate', ()=> {
    //update seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value = progress;
});

myProgressBar.addEventListener('change' , ()=> {
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;   
});

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPLay')).forEach((element)=> {
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    });
};

// playing the song from songbar
Array.from(document.getElementsByClassName('songItemPLay')).forEach((element)=>{
    element.addEventListener('click', (e)=> {
        const clickedSongIndex = parseInt(e.target.id);
        if (songIndex !== clickedSongIndex) {
            // Pause the current song and reset its play icon
            audioElement.pause();
            const currentPlayIcon = document.getElementById(songIndex);
            currentPlayIcon.classList.remove('fa-circle-pause');
            currentPlayIcon.classList.add('fa-circle-play');

            // Update the song index
            songIndex = clickedSongIndex;

            // Update the audio source and song name
            audioElement.src = `songs/${songIndex}.mp3`;
            masterSongName.innerText = songs[songIndex - 1].songName;

            // Play the new song
            audioElement.currentTime = 0;
            audioElement.play();

            // Update the play icon and GIF
            makeAllPlays();
            e.target.classList.remove('fa-circle-play');
            e.target.classList.add('fa-circle-pause');
            gif.style.opacity = 1;
            masterPlay.classList.remove('fa-circle-play');
            masterPlay.classList.add('fa-circle-pause');
        } else {
            // Toggle play/pause for the current song
            if (audioElement.paused || audioElement.currentTime <= 0) {
                audioElement.play();
                e.target.classList.remove('fa-circle-play');
                e.target.classList.add('fa-circle-pause');
                gif.style.opacity = 1;
                masterPlay.classList.remove('fa-circle-play');
                masterPlay.classList.add('fa-circle-pause');
            } else {
                audioElement.pause();
                e.target.classList.remove('fa-circle-pause');
                e.target.classList.add('fa-circle-play');
                gif.style.opacity = 0;
                masterPlay.classList.remove('fa-circle-pause');
                masterPlay.classList.add('fa-circle-play');
            }
        }
    });
});

document.getElementById('next').addEventListener('click' , ()=> {
    if(songIndex >= 10) {
        songIndex = 1;
    }
    else {
        songIndex++;
    }
    audioElement.src = `songs/${songIndex}.mp3`;
    masterSongName.innerText = songs[songIndex-1].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
});

document.getElementById('previous').addEventListener('click' , ()=> {
    if(songIndex<=1) {
        songIndex = 10;
    }
    else {
        songIndex--;
    }
    audioElement.src = `songs/${songIndex}.mp3`;
    masterSongName.innerText = songs[songIndex-1].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
});

audioElement.addEventListener('ended' , () => {
    playNextSong();
});

function playNextSong() {
    if(songIndex>=10) {
        songIndex = 1;
    } else {
        songIndex++;
    }

    audioElement.src = `songs/${songIndex}.mp3`;
    masterSongName.innerText = songs[songIndex - 1].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');

    makeAllPlays();
    const newPlayIcon = document.getElementById(songIndex);
    newPlayIcon.classList.remove('fa-circle-play');
    newPlayIcon.classList.add('fa-circle-pause');
};