// Initialize the variables
let audioElement = new Audio();
let songIndex = 0;
let masterPlay = document.getElementById('masterPlay');
let play = masterPlay.getElementsByClassName('fa-play')[0];
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif')
let interval; // Variable to store the interval
let totalDuration = audioElement.duration;
let startTime = document.getElementById('startTime')
let endTime = document.getElementById('endTime')
let songItems = document.getElementsByClassName('songItem');
const next = document.getElementById('next')
const previous = document.getElementById('previous');
const loopSong = document.getElementById('loop')

let songs = [
    { songName: 'Tum Se He', filePath: "./songs/1.mp4" },
    { songName: 'Labon Ko', filePath: "./songs/2.mp4" },
    { songName: 'Be Intehaan', filePath: "./songs/3.mp4" },
    { songName: 'Pehli Dafa', filePath: "./songs/4.mp4" },
    { songName: 'Perfect', filePath: "./songs/5.mp4" },
    { songName: 'Bloody Mary Instrumental', filePath: "./songs/6.mp4" },
    { songName: 'Tourner Dans Le Vide', filePath: "./songs/7.mp4" },
    { songName: 'Danza Kuduro', filePath: "./songs/8.mp4" },
    { songName: 'Pee Loon', filePath: "./songs/9.mp4" },
    { songName: 'GF BF Song', filePath: "./songs/10.mp4" },
    { songName: 'Tu Itni Khoobsoorat Hai', filePath: "./songs/11.mp4" }
];
function formatDuration(seconds) {
    const minutes = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${minutes}:${sec < 10 ? '0' : ''}${sec}`;
}

// Function to update the audio's current time and the progress bar
function updateAudioCurrentTime() {
    if (audioElement) {
        const currentTime = audioElement.currentTime;
        const minutes = Math.floor(currentTime / 60);
        const seconds = Math.floor(currentTime % 60);
        const formattedTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        myProgressBar.setAttribute('max', totalDuration); // Set max to the total duration in seconds
        startTime.innerHTML = formattedTime;
        endTime.innerHTML = formatDuration(totalDuration); // Use a function to format the total duration
        myProgressBar.value = currentTime; // Update the progress bar value
    }
}

loopSong.addEventListener('click', () => {
    if (!(audioElement.src.endsWith('.mp4'))) {
        alert('Play a valid song');
        return;
    }
    loopSong.classList.toggle('active');
    audioElement.loop = loopSong.classList.contains('active');
});

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-pause')
        element.classList.add('fa-play')
        element.closest('.playButton').setAttribute('data-tooltip', 'Play Song')
        element.closest('.songItem').style.background = 'mediumpurple'
    })
}

myProgressBar.setAttribute('disabled', '')

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        makeAllPlays();
        e.target.closest('.tooltip').setAttribute('data-tooltip', 'Play Song From Start');
        if (audioElement.paused) {
            songIndex = parseInt(e.target.id)
            e.target.classList.remove('fa-play');
            e.target.classList.add('fa-pause');
            e.target.closest('.tooltip').setAttribute('data-tooltip', 'Pause Song');
            audioElement.src = `./songs/${songIndex + 1}.mp4`
            play.click();
            audioElement.play();
            audioElement.currentTime = 0;
            myProgressBar.removeAttribute('disabled');
            setTimeout(() => {
                gif.style.opacity = '1';
            }, 200);
            e.target.closest('.songItem').style.backgroundColor = 'rgb(89, 176, 174)'
            document.getElementsByClassName('bottomSongName')[0].innerHTML = songs[songIndex]['songName'];
        } else {
            myProgressBar.setAttribute('disabled', '')
            e.target.classList.remove('fa-pause');
            myProgressBar.value = '0'
            startTime.innerHTML = "0:00"
            endTime.innerHTML = ''
            e.target.classList.add('fa-play');
            e.target.closest('.tooltip').setAttribute('data-tooltip', 'Play Song From Start');
            masterPlay.click();
            setTimeout(() => {
                gif.style.opacity = '0';
            }, 200);
            audioElement.pause();
            audioElement.src = '';
            document.getElementsByClassName('bottomSongName')[0].innerHTML = '';
        }
    });
});

// Function to update the audio's current time
audioElement.addEventListener('loadedmetadata', () => {
    totalDuration = Math.floor(audioElement.duration);
    updateAudioCurrentTime(); // Initial update
});

// handle play/pause click

myProgressBar.addEventListener('input', () => {
    // Get the value of the input range (time in seconds)
    const newTime = myProgressBar.value;

    // Set the audio's current time to the newTime
    audioElement.currentTime = newTime;

    // Update the displayed time
    updateAudioCurrentTime();
});

next.addEventListener('click', (e) => {
    if (!(audioElement.src).endsWith('mp4')) {
        alert('Play a valid Song');
        return;
    }
    audioElement.currentTime = 0;
    songIndex += 1;
    if (songIndex > 10) {
        songIndex = 0
    }
    audioElement.src = `./songs/${songIndex + 1}.mp4`
    play.click();
    setTimeout(() => {
        gif.style.opacity = '1';
    }, 200);
    makeAllPlays();
    document.getElementsByClassName('bottomSongName')[0].innerHTML = songs[songIndex]['songName'];
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.closest('.songItem').style.backgroundColor = '';
    });
    document.getElementById(`s${songIndex}`).querySelector('.songItemPlay').classList.add('fa-pause')
    document.getElementById(`s${songIndex}`).querySelector('.songItemPlay').classList.remove('fa-play')
    document.getElementById(`s${songIndex}`).querySelector('.playButton').setAttribute('data-tooltip', 'Pause Song')
    document.getElementById(`s${songIndex}`).style.backgroundColor = 'rgb(89, 176, 174)';
})

previous.addEventListener('click', (e) => {
    if (!(audioElement.src).endsWith('mp4')) {
        alert('Play a valid Song');
        return;
    }
    audioElement.currentTime = 0;
    songIndex -= 1;
    if (songIndex < 0) {
        songIndex = songs.length - 1
    }
    audioElement.src = `./songs/${songIndex + 1}.mp4`
    play.click();
    setTimeout(() => {
        gif.style.opacity = '1';
    }, 200);
    makeAllPlays();
    document.getElementsByClassName('bottomSongName')[0].innerHTML = songs[songIndex]['songName'];
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.closest('.songItem').style.backgroundColor = '';
    });
    document.getElementById(`s${songIndex}`).querySelector('.songItemPlay').classList.add('fa-pause')
    document.getElementById(`s${songIndex}`).querySelector('.songItemPlay').classList.remove('fa-play')
    document.getElementById(`s${songIndex}`).querySelector('.playButton').setAttribute('data-tooltip', 'Pause Song')
    document.getElementById(`s${songIndex}`).style.backgroundColor = 'rgb(89, 176, 174)';
})

// Function to handle the song ending and move to the next song
function handleSongEnd() {
    if (songIndex < 10) {
        // Increment the songIndex to play the next song
        songIndex += 1;
    } else {
        // If the last song has ended, wrap around to the first song
        songIndex = 0;
    }

    // Load and play the next song
    audioElement.src = `./songs/${songIndex + 1}.mp4`;
    audioElement.play();

    // Update the UI and make all play buttons show play icon
    makeAllPlays();
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.closest('.songItem').style.backgroundColor = '';
    });
    document.getElementById(`s${songIndex}`).querySelector('.songItemPlay').classList.add('fa-pause')
    document.getElementById(`s${songIndex}`).querySelector('.songItemPlay').classList.remove('fa-play')
    document.getElementById(`s${songIndex}`).querySelector('.playButton').setAttribute('data-tooltip', 'Pause Song')
    document.getElementById(`s${songIndex}`).style.backgroundColor = 'rgb(89, 176, 174)';
    // Update the bottom song name
    document.getElementsByClassName('bottomSongName')[0].innerHTML = songs[songIndex]['songName'];

    // Update the background color of the songItem
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.closest('.songItem').style.backgroundColor = '';
    });
    document.getElementById(`s${songIndex}`).style.backgroundColor = 'rgb(89, 176, 174)';
}

audioElement.addEventListener('ended', handleSongEnd);

masterPlay.addEventListener('click', () => {
    if (!(audioElement.src).endsWith('mp4')) {
        alert('Play a valid Song');
        return;
    }
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        play.classList.remove('fa-play')
        play.classList.add('fa-pause')
        masterPlay.setAttribute('data-tooltip', 'Pause Song')
        setTimeout(() => {
            gif.style.opacity = '1';
        }, 200);
        interval = setInterval(updateAudioCurrentTime, 1000);
    } else {
        audioElement.pause();
        play.classList.remove('fa-pause')
        play.classList.add('fa-play')
        masterPlay.setAttribute('data-tooltip', 'Play Song');
        setTimeout(() => {
            gif.style.opacity = '0'
        }, 200);
        clearInterval(interval)
    }
})

document.addEventListener('keydown', function (event) {
    event.preventDefault();
    if (event.key === 'ArrowRight') {
        next.click();
    }
    if (event.key === 'ArrowLeft') {
        previous.click();
    }
    if (event.key === ' ') {
        play.click();
    }
    if (event.key === 'l') {
        loop.click();
    }
});

let scrollDirection = 0; // 0 for no scroll, 1 for down, -1 for up
let scrollAmount = 40; // Adjust the scroll amount as needed

document.addEventListener('keydown', function (event) {
    if (event.key === 'ArrowDown') {
        scrollDirection = 1;
        requestAnimationFrame(scroll);
    } else if (event.key === 'ArrowUp') {
        scrollDirection = -1;
        requestAnimationFrame(scroll);
    }
});



document.addEventListener('keyup', function (event) {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        scrollDirection = 0;
    }
});

function scroll() {
    if (scrollDirection === 1) {
        window.scrollBy(0, scrollAmount);
    } else if (scrollDirection === -1) {
        window.scrollBy(0, -scrollAmount);
    }
    if (scrollDirection !== 0) {
        requestAnimationFrame(scroll);
    }
}
