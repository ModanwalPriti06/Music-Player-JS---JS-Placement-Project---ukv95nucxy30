
let songs=[];
let playlist=[];
let names=[];
let playlistArray = [];
let index=0;

const audio = new Audio('http://commondatastorage.googleapis.com/codeskulptor-assets/Epoq-Lepidoptera.ogg');

fetch('https://api.napster.com/v2.1/tracks/top?apikey=ZTk2YjY4MjMtMDAzYy00MTg4LWE2MjYtZDIzNjJmMmM0YTdm')
         .then((response) => response.json())
         .then((data) => { 
             songs=data.tracks;
             playlist=songs;
             console.log(playlist)
            // console.log(songs);
           for(let i=0;i<playlist.length;i++){
                names=playlist[i].albumName;  
            }
//-----------------------Searchbar-----------------------
        document.getElementById('mySearch').addEventListener('input',(e)=>{
                let filter1 = e.target.value.toLowerCase();
                    let divs =  Array.from(document.getElementsByClassName('songItem'));
                    divs.forEach((div) => {
                      if (div.textContent.toLowerCase().indexOf(filter1) > -1) {
                        div.style.display = '';
                      } else {
                        div.style.display = 'none';
                      }
                    });      
             })
 //-----------------Display All Music------------------
           let root= document.getElementById("root");
           let songInfo=document.getElementById('songInform') ;
            for(let i=0;i<songs.length;i++){
               let Html=`<div class="songItem">
               <img src='http://direct.rhapsody.com/imageserver/v2/albums/${songs[i].albumId}/images/300x300.jpg' alt="1">
               <span class="songName">${songs[i].name}</span>
               <span class="songListPlay">
              <span id="b"> <button class="playlist" id=${i}>Add PlayList</button></span>
               <i class="far songItemPlay fa-2x fa-play-circle" id=${i}></i></span>
               </div>`;
              
               root.insertAdjacentHTML("beforeend", Html);              
           }

//PlayList-------------------------------------
            Array.from(document.getElementsByClassName('playlist')).forEach((element)=>{
                element.addEventListener('click',(e)=>{
                let idx=parseInt(e.target.id);
                console.log(idx)  
                localStorage.setItem(idx, JSON.stringify(songs[idx]));
                let data = JSON.parse(localStorage.getItem(idx));
                console.log(data);

                })
            })

//add all local storage data into one single array----------------------
      
        for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        let value = JSON.parse(localStorage.getItem(key));
        playlistArray.push(value);
        
        }
 //Display playlist song ---------------------------------------
        console.log(playlistArray);
        let root1= document.getElementById("root1");
        let flag=true;
        document.getElementById('myPlaylist').addEventListener('click',()=>{
            if(flag===true){
                for(let i=0;i<playlistArray.length;i++){   
                    let htm=`
                    <div class="row">
                        <div class="column">
                            <div class="card">
                            <h3>Song ${i+1}</h3>
                            <img src='http://direct.rhapsody.com/imageserver/v2/albums/${playlistArray[i].albumId}/images/300x300.jpg' alt="1" id="plylistImg">
                            <p id="pname">${playlistArray[i].name}</p>
                            <p id="aname">${playlistArray[i].artistName}</p>
                        </div>
                    </div>`; 
                    root1.insertAdjacentHTML("beforeend", htm);              
                }
                flag=false;  
                return;
            }
            else{
                root1.innerHTML="";
                flag=true;
                return;
            }

        })

 //footer------------------------------

           let footer=` <div>
           <img src='http://direct.rhapsody.com/imageserver/v2/albums/${songs[0].albumId}/images/300x300.jpg' alt="1" id="footerImg">
           <span id="footerName">${songs[0].name} - ${songs[0].albumName}</span>
        </div>`;
           songInfo.insertAdjacentHTML("beforeend", footer); 
           let footerImage=document.getElementById("footerImg"); 
           let footerName=document.getElementById("footerName"); 
           let duration=document.getElementsByClassName("timestamp");

//play button-------------------------------
           function makeAllPlay() {
                 Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
                     element.classList.remove('fa-pause-circle');
                     element.classList.add('fa-play-circle');
                 });
             } 
             
            Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
                element.addEventListener('click',(e)=>{
                   console.log(e.target);
                   makeAllPlay();
                    index=parseInt(e.target.id);
                   //  console.log(index)
                    e.target.classList.remove('fa-play-circle')
                    e.target.classList.add('fa-pause-circle')   
                    audio.src=`${songs[index].previewURL}`;                 
                    audio.currentTime=0;
                    footerImage.src=`http://direct.rhapsody.com/imageserver/v2/albums/${songs[index].albumId}/images/300x300.jpg`
                    footerName.innerText=`${songs[index].name}`+" - "+`${songs[index].albumName}`
                    duration.innerText=`progress`
                    audio.play();
                    mp.classList.remove('fa-play-circle');
                    mp.classList.add('fa-pause-circle');  

                })  
            }); 

//previous Song play---------------------------------

            document.getElementById("prev").addEventListener('click',()=>{
                if(index<=0){
                   index=0;   
               }
               else{
                   index-=1;
               }
              audio.src=`${songs[index].previewURL}`;                 
              audio.currentTime=0;
              footerImage.src=`http://direct.rhapsody.com/imageserver/v2/albums/${songs[index].albumId}/images/300x300.jpg`
              footerName.innerText=`${songs[index].name}`+" - "+`${songs[index].albumName}`
              duration.innerText=`progress`
              audio.play();
              mp.classList.remove('fa-play-circle');
              mp.classList.add('fa-pause-circle');   
            });

//next song play------------------------------

            document.getElementById("next").addEventListener('click',()=>{
                if(index>=9){
                   index=0;   
               }
               else{
                   index+=1;
               }
              audio.src=`${songs[index].previewURL}`;                 
              audio.currentTime=0;
              footerImage.src=`http://direct.rhapsody.com/imageserver/v2/albums/${songs[index].albumId}/images/300x300.jpg`
              footerName.innerText=`${songs[index].name}`+" - "+`${songs[index].albumName}`
              duration.innerText=`progress`
              audio.play();
              mp.classList.remove('fa-play-circle');
              mp.classList.add('fa-pause-circle');
            });

//Random Play---------------------

            document.getElementById("random").addEventListener('click',()=>{
                if(index<=9){
                   index=Math.floor(Math.random()*10);    
               }  
              audio.src=`${songs[index].previewURL}`;                 
              audio.currentTime=0;
              footerImage.src=`http://direct.rhapsody.com/imageserver/v2/albums/${songs[index].albumId}/images/300x300.jpg`
              footerName.innerText=`${songs[index].name}`+" - "+`${songs[index].albumName}`
              duration.innerText=`progress`
              audio.play();
              mp.classList.remove('fa-play-circle');
              mp.classList.add('fa-pause-circle');
            });

//Repeat Song Again and again-------------------
    
             document.getElementById("repeat").addEventListener('click',()=>{
                if(index<=9){
                   index=index;    
               }
              audio.src=`${songs[index].previewURL}`;                 
              audio.currentTime=0;
              footerImage.src=`http://direct.rhapsody.com/imageserver/v2/albums/${songs[index].albumId}/images/300x300.jpg`
              footerName.innerText=`${songs[index].name}`+" - "+`${songs[index].albumName}`
              duration.innerText=`progress`
              audio.play();
              mp.classList.remove('fa-play-circle');
              mp.classList.add('fa-pause-circle');
            });

 //masterplay-----------
       
            let mpb=document.getElementById("myProgressBar");
            let mp=document.getElementById("masterPlay");  
            let songItemPlay=document.getElementsByClassName('songItemPlay');
            console.log(songItemPlay);
            let dur=0.00;
//<Master play song---------------------------------
            mp.addEventListener('click',()=>{ 
                if(audio.paused || audio.currentTime<=0){
                    audio.play();
                    mp.classList.remove('fa-play-circle');
                    mp.classList.add('fa-pause-circle');
                 }
                else{
                   audio.pause();
                   mp.classList.add('fa-play-circle');
                   mp.classList.remove('fa-pause-circle');

                }
            })        
//listen to duration event-------------------------------
            audio.addEventListener('timeupdate',()=>{
                let progress=parseInt((audio.currentTime/audio.duration)*100);
                mpb.value=progress;
                dur=audio.currentTime/100;
                let res=dur.toFixed(2);
               document.getElementById('dur').innerText=`${res}`;
                //console.log(progress)
            })
            mpb.addEventListener('change',()=>{
                audio.currentTime=mpb.value * audio.duration/100;
           })

 }); 

       
           
             
