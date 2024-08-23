// ^ ARRAY OF OBJECT (contains details of song) ---------------------------------------------------------------
let songs = [
  {
    songName: "Aagodella Olledakke",
    covers: "./covers/Aagodella_Olledakke.jpg",
    singer: "All Ok",
    url: "./songs/Aagodella Olledakke.mp3",
  },
  {
    songName: "Nenne Tanaka",
    covers: "/covers/thrivikarama.jpg",
    singer: "Hamsalekha",
    url: "/songs/Nenne Tanaka.mp3",
  },
  {
    songName: "Katheyonda Helide",
    covers: "/covers/kirik-party.webp",
    singer: "Varun Ramachandra",
    url: "/songs/Katheyonda Helide.mp3",
  },
  {
    songName: "Maathu Sothu",
    covers: "/covers/kotee.jpg",
    singer: "Vishal raj shekar",
    url: "/songs/Maathu Sothu.mp3",
  },
  {
    songName: "Ninnanu Nodida",
    covers: "/covers/Baanadariyalli.jpg",
    singer: "Ramesh ram rao",
    url: "/songs/Ninnanu Nodida.mp3",
  },
  {
    songName: "Time Baruthe",
    covers: "/covers/gowri.jpg",
    singer: "Chandhan Shetty",
    url: "/songs/Time Baruthe.mp3",
  },
  {
    songName: "Hands up",
    covers: "/covers/avane_shreeman_narayana.jpg",
    singer: "Vijay Prakash",
    url: "/songs/Hands UP.mp3",
  },
  {
    songName: "Malenadina Hoovu",
    covers: "/covers/malenadina_hoovu.png",
    singer: "Arfaz Ullal",
    url: "/songs/Malenadina Hennu.mp3",
  },
  {
    songName: "Pushpa Puspha",
    covers: "/covers/pushpa.jpg",
    singer: "Arvind chawan",
    url: "/songs/Pushpa Pushpa.mp3",
  },
  {
    songName: "Restart",
    covers: "/covers/12th-Fail.jpg",
    singer: "Ganesh Shiruru",
    url: "/songs/Restart.mp3",
  },
  {
    songName: "Studend Party",
    covers: "/covers/vidyarthini_vidyarthiniyare.jpg",
    singer: "Chandan Shetty",
    url: "/songs/Student Party.mp3",
  },
  {
    songName: "KD Title Teaser",
    covers: "/covers/kd.jpg",
    singer: "Kamath",
    url: "/songs/KD Title Teaser.mp3",
  },
  {
    songName: "Ra Ra Rakamma",
    covers: "/covers/vikrant_rona.jpg",
    singer: "Naksha Aziz, Sunidhi Chauhan",
    url: "/songs/Ra Ra Rakkamma.mp3",
  },
  {
    songName: "Yethake bogase thumba aase mudidhe",
    covers: "/covers/bell+bottom.jpg",
    singer: "Vijay Prakash",
    url: "/songs/Yethake Bogase Thumba aase.mp3",
  },
  {
    songName: "Appa I Love U Pa",
    covers: "/covers/cowka.jpg",
    singer: "Anuradha Bhat",
    url: "/songs/Appa I Love You.mp3",
  }
];

// ^ VARIABLE DECLARATION (contains audio element and html element fetch using DOM) ---------------------------------------
let audioElement = new Audio("./songs/Aagodella Olledakke.mp3");

let playList = document.getElementById("playList");
let masterPlay = document.getElementById("masterPlay");
let previous = document.getElementById("previous");
let next = document.getElementById("next");
let progressBar = document.getElementById("range");
let trackCover = document.getElementById("trackCover"); 
let songInfo = document.getElementById("songInfo");
let playlist_cover = document.getElementById("playlist_cover");
let trackInfo = document.getElementById("trackInfo");
let playlist_play = document.getElementsByClassName("playlist_play");
let card = document.getElementsByClassName("card");


// ^ FUNCTION TO BUILD PLAYLIST (iterates song array of object to create cards in playlist)---------------------------------
function display() {
  songs.map(({ covers, songName, singer, url }, i) => {
    playList.innerHTML += ` <main class="card">
    <div class="songcover">
        <img src=${covers} alt="" id="playlist_cover">
        <i class="fa-solid fa-play playlist_play" onclick="CurrentTrack('${covers}','${songName}','${singer}','${url}',${i})"></i>
    </div>
    <h4>${songName}</h4>
    <p>${singer}</p>
    </main>`;
  });
}
display();


// ^ FUNCTION TO PLAY THE SONG ONCLICK (this functions gets called when the play button on the card is clicked to play the selected song)
function CurrentTrack(cover, songName, singer, url, i) {
  // ^* new class is added for the alignments of trackInfo and playlist when the song is played
  trackInfo.classList.add("slide");
  playList.classList.add("compress");

  // ^* info of the played song displayed in the trackinfo
  trackCover.innerHTML = `<img src=${cover} height="100%" width="100%" alt="image">`;
  songInfo.innerHTML = `<h3>${songName}</h3>
<marquee scrollamount="3s">${singer}</marquee>`;

// ^* play and pause buttons and highlight of the song info in the playlist
Focus()

// ^* audion element, masterplay and progressbar functionality
  audioElement.pause();
  audioElement.currentTime = progressBar.value = 0;
  audioElement = new Audio(url);
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();
    masterPlay.classList.remove("fa-circle-play");
    masterPlay.classList.add("fa-circle-pause");
  } else {
    audioElement.pause();
    masterPlay.classList.remove("fa-circle-pause");
    masterPlay.classList.add("fa-circle-play");
  }
  audioElement.addEventListener("timeupdate", () => {
    let progress = parseInt(
      (audioElement.currentTime / audioElement.duration) * 100
    );
    progressBar.value = progress;
  });
  progressBar.addEventListener("change", () => {
    audioElement.currentTime =
      (progressBar.value * audioElement.duration) / 100;
  });

// ^* next and previous button functionality
  let songurl = [];
let songIndex = 0;
  songs.map(({ url }) => {
    songurl.push(url);
  });
  songIndex = i;

// * next button
  next.addEventListener("click", () => {
    if (songIndex >= songs.length-1) {
      songIndex = songs.length-1;
    } else {
      songIndex += 1;
    }
    console.log(songIndex);
    audioElement.src = songurl[songIndex];
    audioElement.currentTime = 0;
    audioElement.play();
    trackCover.innerHTML = `<img src=${songs[songIndex].covers} height="100%" width="100%" alt="image">`;
    songInfo.innerHTML = `<h3>${songs[songIndex].songName}</h3>
    <marquee scrollamount="3s">${songs[songIndex].singer}</marquee>`;
    masterPlay.classList.remove("fa-circle-play");
    masterPlay.classList.add("fa-circle-pause");
    // ^* ----------------------------------------
    Focus()
  });
// * previous button
  previous.addEventListener("click", () => {
    if (songIndex <= 0) {
      songIndex = 0;
    } else {
      songIndex -= 1;
    }
    console.log(songIndex);
    audioElement.src = songurl[songIndex];
    audioElement.currentTime = 0;
    audioElement.play();
    trackCover.innerHTML = `<img src=${songs[songIndex].covers} height="100%" width="100%" alt="image">`;
    songInfo.innerHTML = `<h3>${songs[songIndex].songName}</h3>
    <marquee scrollamount="3s">${songs[songIndex].singer}</marquee>`;
    masterPlay.classList.remove("fa-circle-play");
    masterPlay.classList.add("fa-circle-pause");
     // ^* -------------------------------------------
    Focus()

  });
}

// ^ PAUSE PLAY EVENTS OF MASTERPLAY -----------------------------------------------------------------
masterPlay.addEventListener("click", () => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();
    masterPlay.classList.remove("fa-circle-play");
    masterPlay.classList.add("fa-circle-pause");
  } else {
    audioElement.pause();
    masterPlay.classList.remove("fa-circle-pause");
    masterPlay.classList.add("fa-circle-play");
  }
});

// ^ FUNCTION TO HIGHLIGHT THE SONG IN THE PLAYLIST (this fuction is called on when the song is being play/next button/previous button)
function Focus(){
    Array.from(card).map((e,i) => {
        if(e.children.item(0).children.item(0).src===trackCover.children.item(0).src){
            console.log("hii")
                e.style.background="#f6f5f512";
                e.children.item(0).children.item(1).classList.add('fa-pause');
                e.children.item(0).children.item(1).classList.remove('fa-play');
    }else{
        console.log("bye")
        e.style.background=""
        e.children.item(0).children.item(1).classList.add('fa-play')
        e.children.item(0).children.item(1).classList.remove('fa-pause')
    }
    })
}
