console.log("Welcome to Spotify");
// Things that are yet to be implemented - 
// Change covers to orignal song's cover by simple taking images from somewhere else
// Change covers by using Mp3 tags, by implementing through jsmediatags
// Change names of the song while playing a song in the bottom(songInfo) bar basically below
// Change duration displaying of the song as per the song on the list.


// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "Paniyon Sa - Satyameva Jayate", filePath: "songs/1.mp3", coverPath: "original covers/1.jpg", songDuration: "05:34"},
    {songName: "Tum Saath Ho - Tamasha", filePath: "songs/2.mp3", coverPath: "original covers/2.jpg", songDuration: "05:35"},
    {songName: "8 Parche - Baani Sandhu", filePath: "songs/3.mp3", coverPath: "original covers/3.jpg", songDuration: "05:36"},
    {songName: "Badaami Rang - Nikk", filePath: "songs/4.mp3", coverPath: "original covers/4.jpg", songDuration: "05:36"},
    {songName: "Bewafa Tera Masoom Chehra - Jubin Nautiyal", filePath: "songs/5.mp3", coverPath: "original covers/5.jpg", songDuration: "05:37"},
    {songName: "Bholenath_192(PagalWorld)", filePath: "songs/6.mp3", coverPath: "original covers/6.jpg", songDuration: "05:38"},
    {songName: "Phulkari - Karan Randhawa", filePath: "songs/7.mp3", coverPath: "original covers/7.jpg", songDuration: "05:39"},
    {songName: "Tera Yaar Hoon Main - Sonu Ke Titu Ki Sweety", filePath: "songs/8.mp3", coverPath: "original covers/8.jpg", songDuration: "05:40"},
    {songName: "Tu Hi Yaar Mera - Pati Patni Aur Woh", filePath: "songs/9.mp3", coverPath: "original covers/9.jpg", songDuration: "05:41"},
    {songName: "Waliyan_192(PagalWorld)", filePath: "songs/10.mp3", coverPath: "original covers/10.jpg", songDuration: "05:42"},
]

songItems.forEach((element, i)=>{ 
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
    // element.getElementsByClassName("timestamp")[0].childNodes[0].textContent = songs[i].songDuration;
    element.getElementsByTagName("p")[0].innerText = songs[i].songDuration;
})
 

// Handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})
// Listen to Events
audioElement.addEventListener('timeupdate', ()=>{ 
    // Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100); 
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{ 
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=9){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})