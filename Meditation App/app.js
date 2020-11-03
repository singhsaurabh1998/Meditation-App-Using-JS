const app = () =>{
    const song = document.querySelector('.song');
    const play = document.querySelector('.play');
    const outline = document.querySelector('.moving-outline circle');
    const video = document.querySelector('.vid-container video');
    const timeSelect = document.querySelectorAll('.time-select button');
    ///loading the sounds
    const sounds = document.querySelectorAll('.sound-picker button');

    ///time display
    const timeDisplay = document.querySelector('.time-display');

    //length of the circle
    const outlineLen = outline.getTotalLength();
    let fakeDuration = 600;

    outline.style.strokeDasharray = outlineLen;
    outline.style.strokeDashoffset = outlineLen;

    ///select diff sounds
    sounds.forEach(sound =>{
        sound.addEventListener('click',function(){
            song.src = this.getAttribute('data-sound');
            video.src = this.getAttribute('data-video');
            checkPlay(song);
        });
    });
    //lets play song
    play.addEventListener('click',function(){
        checkPlay(song);
    });

    

    ///select timer
    timeSelect.forEach(option =>{
        option.addEventListener('click',function(){
            fakeDuration = this.getAttribute("data-time");
            timeDisplay.textContent = `${Math.floor(fakeDuration/60)} :${Math.floor(fakeDuration % 60)}`
        })
    })

    const checkPlay = function(song){
        if(song.paused)
        {
            song.play();
            video.play();
            play.src = "./svg/pause.svg";
        }
        else
        {
            song.pause();
            video.pause();
            play.src = "./svg/play.svg";
        }
    };

    //lets progres the circle
    song.ontimeupdate = ()=> {
        let currentime = song.currentTime;
        let elapsed = fakeDuration - currentime;
        let seconds = Math.floor(elapsed%60);
        let min = Math.floor(elapsed/60);

        //animate the circle
        let progress = outlineLen - (currentime/fakeDuration)*outlineLen;
        outline.style.strokeDashoffset = progress;

        ///get the countdown
        timeDisplay.textContent = `${min}:${seconds}`;

        if(currentime>=fakeDuration)
        {
            song.pause();
            video.pause();
            play.src = "./svg/play.svg";
            song.currentTime = 0;
        }
    }

}
app();