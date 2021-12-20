var indexNumber=4; 


const Videoplayer             = document.querySelector('#VidoPlayer'),
    backword                  = document.querySelector('.backword'),
    play                      = document.querySelector('.play'),
    forward                   = document.querySelector('.forward'),
    volume                    = document.querySelector('.volume'),
    volumeSeekbar             = document.querySelector('#volumePanel_Seekbar'),
    seekBar                   = document.querySelector('#seekbar'),
    VideotimeDuration         = document.querySelector('.timeDuration p'),
    setting                   = document.querySelector('.settings'),
    exitFullScreen            = document.querySelector('.exit-fullScreen'),
    fullScreen                = document.querySelector('.fullScreen'),
    videoTitle                = document.querySelector('.title .videoName'),
    videochannel              = document.querySelector('.title .chennelName'),
    PlayListVideos_Container  = document.querySelector('.videos_List')

VIDEO_SETUP(indexNumber);
PLAY_PAUSE();
PLAYLIST_VIDEOS_SUGGEST();
BACKWORD_FORWARD_BEHAVIOR();
FUNCTIONLITY_BUTTONS()
CLICK_ON_THE_VIDEO_TO_GET_PLAY();
VOLUME_BEHAVIOR();

function VIDEO_SETUP(index){
    seekBar.value = 0;

    var videosListImport = videosList[index];
    VIDEO_SEEKBAR_BEHAVIOR();
    Videoplayer.onloadedmetadata=function(){
        VideotimeDuration.textContent = TIME_FORMAT(Videoplayer.duration)

    }
    videoTitle.textContent = videosListImport.videoName;
    videochannel.textContent = videosListImport.channelName;
    Videoplayer.src=videosListImport.videoPath
    
}

function TIME_FORMAT(num){
    var min= Math.floor(num / 60);
    var sec= Math.floor(num % 60);

    if(min <=9)
    {
        min = `0${min}`
    }
    if(sec <=9)
    {
        sec = `0${sec}`
    }

    return `${min} : ${sec}`
}
function CONVERT_TO_FOLUT(num){

    var flot ;
        if(num <= 99){
            flot =`0.${num}`
        }else{
            flot = 1;
        }
    return Number(flot)
}

function PLAY_PAUSE(){
    play.addEventListener("click",()=>{
        // pause-outline
        if(play.getAttribute('name') === 'caret-forward-outline')
        {
            play.setAttribute('name','pause-outline');
            Videoplayer.play();
        }else{
            play.setAttribute('name','caret-forward-outline');
            Videoplayer.pause();
        }
    })

    if(play.getAttribute('name') == 'caret-forward-outline'){
        // Dont do anything
    }else{
        play.setAttribute('name','pause-outline');
    }

    Videoplayer.onclick =()=>{
        if (play.getAttribute('name') == 'caret-forward-outline' ){

            play.setAttribute('name','pause-outline');
            Videoplayer.play();
        }else{
            play.setAttribute('name','caret-forward-outline');
            Videoplayer.pause();
        }
       
    }
}

function BACKWORD_FORWARD_BEHAVIOR(){

    backword.addEventListener('click',()=>{
        if(indexNumber <= 0)
        {
            backword.style.opacity=0.3;
        }else{
            indexNumber--
            backword.style.opacity=1;
            forward.style.opacity=1;
            VIDEO_SETUP(indexNumber);
        }
    })
    forward.addEventListener('click',()=>{
        if(indexNumber >= videosList.length -1)
        {
            forward.style.opacity=0.3;
        }else{
            indexNumber++
            forward.style.opacity=1;
            backword.style.opacity=1;
            VIDEO_SETUP(indexNumber);
        }
    })

}

function FUNCTIONLITY_BUTTONS(){

    fullScreen.addEventListener('click',()=> {


        if(Videoplayer.webkitRequestFullScreen != null){
            Videoplayer.webkitRequestFullScreen(); //with Chrome prefixes
        }else if(Videoplayer.mozRequestFullScreen != null){
            Videoplayer.mozRequestFullScreen(); //with Firefox prefixes
        }else if(Videoplayer.msRequestFullScreen != null){
            Videoplayer.msRequestFullScreen();  //with Microsoft IE prefixes
        }
        
    }) 

}

function  VOLUME_BEHAVIOR(){
    volumeSeekbar.addEventListener('change',()=>{
        Videoplayer.volume = CONVERT_TO_FOLUT(volumeSeekbar.value)
    })
}

function VIDEO_SEEKBAR_BEHAVIOR(){

        setInterval(()=>{
            seekBar.max=Videoplayer.duration;
            seekBar.value = Videoplayer.currentTime;
            if(Videoplayer.currentTime === Videoplayer.duration)
            {
                play.setAttribute('name','caret-forward-outline')
            }

            Videoplayer.onloadedmetadata=function(){
        

            }

        },500)
    
        seekBar.addEventListener('change',()=>{
            Videoplayer.currentTime = seekBar.value
        })
}

function CLICK_ON_THE_VIDEO_TO_GET_PLAY(){
    PlayListVideos_Container.addEventListener('click',(e)=>{
        if (e.target.tagName = "video") {
            Videoplayer.src = e.target.src
            videoTitle.textContent   = e.target.getAttribute("data-videoTitle");
            videochannel.textContent = e.target.getAttribute("data-channelTitle");
            videochannel.parentElement.firstElementChild.src = e.target.getAttribute("data-channelLogo");
            Videoplayer.onloadedmetadata=function(){
                VideotimeDuration.textContent = TIME_FORMAT(Videoplayer.duration)
        
            }


        }else{
            // 
        }
        if( e.target.className = 'video-name'){


            Videoplayer.src          = e.target.getAttribute("data-path");
            videoTitle.textContent   = e.target.getAttribute("data-videoTitle");
            videochannel.textContent = e.target.getAttribute("data-channelTitle");
            videochannel.parentElement.firstElementChild.src = e.target.getAttribute("data-channelLogo");
            Videoplayer.onloadedmetadata=function(){
                VideotimeDuration.textContent = TIME_FORMAT(Videoplayer.duration)
        
            }
        }

    })
}

function PLAYLIST_VIDEOS_SUGGEST(){
    PlayListVideos_Container.textContent= ''

    for(var i =0; i < videosList.length ;i++)
        {
            var video = document.createElement('figure'),
                imgContainer = document.createElement('div'),
                videoPreview = document.createElement('video'),
                videoCaption = document.createElement('div'),
                videoTitle = document.createElement('h3'),
                channelContainer = document.createElement('span'),
                channeLogo = document.createElement('img'),
                channelNametxt = document.createElement('h3');

                // append child parent elements 
                
                video.appendChild(imgContainer);
                imgContainer.appendChild(videoPreview);
                video.appendChild(videoCaption);
                videoCaption.appendChild(videoTitle)
                videoCaption.appendChild(channelContainer)
                channelContainer.appendChild(channeLogo)
                channelContainer.appendChild(channelNametxt)

                // Set and append content inside elements
                videoPreview.setAttribute('src',videosList[i].videoPath)
                videoTitle.appendChild(document.createTextNode(videosList[i].videoName))
                channeLogo.setAttribute('src',videosList[i].channelLogo)
                channelNametxt.appendChild(document.createTextNode(videosList[i].channelName))

                // For Click To get infos
                videoPreview.setAttribute('data-videoTitle',videosList[i].videoName)
                videoPreview.setAttribute('data-channelTitle',videosList[i].channelName)
                videoPreview.setAttribute('data-channelLogo',videosList[i].channelLogo)
                videoPreview.setAttribute('data-path',videosList[i].videoPath)
                
                videoTitle.setAttribute('data-videoTitle',videosList[i].videoName)
                videoTitle.setAttribute('data-channelTitle',videosList[i].channelName)
                videoTitle.setAttribute('data-channelLogo',videosList[i].channelLogo)
                videoTitle.setAttribute('data-path',videosList[i].videoPath)
                
                // videoTitle.parentElement.setAttribute('data-videoTitle',videosList[i].videoName)
                // videoTitle.parentElement.setAttribute('data-channelTitle',videosList[i].channelName)
                // videoTitle.parentElement.setAttribute('data-channelLogo',videosList[i].channelLogo)
                // videoTitle.parentElement.setAttribute('data-path',videosList[i].videoPath)

                // set Attributes and classes

                video.className = 'video';
                imgContainer.className = 'img-container'
                videoCaption.className = 'video_caption'
                videoTitle.className   = 'video-name'
                channelContainer.className = 'channelname_logo'
                channelNametxt.className   = 'channel-name'

                // append to div container
                PlayListVideos_Container.appendChild(video)
        }
}


document.querySelector('.Menu').addEventListener('click',()=>{
    document.querySelector('nav.links').classList.toggle("active")
})

document.querySelector('.expand').addEventListener('click',()=>{
    if ((document.querySelector('.expand').getAttribute('name')) === 'arrow-down-outline') {
        
        document.querySelector('.expand').setAttribute('name','arrow-up-outline')
    }else{
        
        document.querySelector('.expand').setAttribute('name','arrow-down-outline')
    }
    document.querySelector('.description_box').classList.toggle('active')
})