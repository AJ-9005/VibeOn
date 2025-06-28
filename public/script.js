let no = document.querySelector(".Sno")
let name1 = document.querySelectorAll(".name")
let duration = document.querySelector(".duration")
let player = document.querySelector(".stereo")
pbar = document.getElementById("progress");
let path = {}
let parent = document.querySelector(".songs")
let currentsong = -1
let playbtn = document.getElementById("play")

fetch('/songs').then(res => res.json())
.then(data => {songlist = data; console.log(songlist); songgetter(songlist); playpause(path); console.log(songlist[0]); nextsong(); prevsong()})

function songgetter(songlist){
    // window.path = `songs/${songlist[0]}.mp3`
    songlist.forEach((song, i) => {
        z = document.createElement('div')
        z.classList.add('songbox')
        parent.appendChild(z)
        let pathx = `songs/${song}.mp3`
        path[i] = pathx
        let s = document.createElement('p')
        s.classList.add('Sno')
        let n = document.createElement('p')
        n.classList.add('name')
        let d = document.createElement('p')
        d.classList.add('duration')
        z.append(s, n, d)
        s.innerHTML = i+1
        n.innerHTML = song
        let m = new Audio(pathx)
        m.addEventListener("loadedmetadata", () => {
            const mins = Math.floor(m.duration/60)
            const secs = Math.floor(m.duration % 60).toString().padStart(2, "0")
            d.innerHTML = `${mins}:${secs}`
        })
    });
}
function playpause(path){
    document.querySelectorAll(".songbox").forEach((song, i) => {
        song.addEventListener("dblclick", () => {
        player.src = path[i]
        player.play()
        playbtn.classList.replace('fa-play', 'fa-pause')
        currentsong = i
        console.log(currentsong)
        player.addEventListener("loadedmetadata", () => {
            pbar.max = player.duration
        }) 
                }
            )
        }
    )
    playbtn.addEventListener("click", () => {
    if(player.paused){
        player.play()
        playbtn.classList.replace("fa-play", "fa-pause")
    }
    else{
        player.pause()
        playbtn.classList.replace("fa-pause", "fa-play")
    }
    })
}
player.addEventListener("timeupdate", () => {
    pbar.value = player.currentTime
})
pbar.addEventListener("input", () => {
    player.currentTime = pbar.value
})
function nextsong(){
    nextbtn = document.getElementById("next")
    nextbtn.addEventListener("click", () => {
        player.src = path[currentsong+1]
        player.play()
        currentsong++;
        console.log(currentsong)
        playbtn.classList.replace("fa-play", "fa-pause")
    })
    player.addEventListener("ended", () => {
        player.src = path[currentsong+1]
        player.play()
        currentsong++;
        console.log(currentsong)
    })
}
function prevsong(){
    prevbtn = document.getElementById("prev")
    prevbtn.addEventListener("click", () => {
        player.src = path[currentsong-1]
        player.play()
        currentsong--;
        console.log(currentsong)
    })
}