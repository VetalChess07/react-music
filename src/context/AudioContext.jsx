import { Children, createContext, useState } from "react";

import trackList from "../assets/trackList";

export const AudioContext = createContext({})

const audio = new Audio()

const AudioProvider = ({children}) =>{
   // (trackLislt[0]
   const [playerIsActive, setPlayerIsActive]= useState(false)
   const [currentTrack, setCurrentTrack] = useState(trackList);
   const [isPlaying, setIsPlaying] = useState(false);

   const [countTrackIndex, setCountTrackIndex] = useState()

   const [stopAudio, setStopAudio] = useState(true)
   const [isSoundOff,  setIsSoundOff] = useState(false)
   
   const nextTrack = (track) =>{
     
      setStopAudio(true)
      setIsSoundOff(false)
    
      if(trackList.length !== track.id){
         handleToggleAudio(trackList[ track.id])
      } else{
         handleToggleAudio(trackList[0])
      }
    
        
     
   }

   const prevTrack =( track) =>{
      setStopAudio(true)
      setIsSoundOff(false)
  
      let activeTrackId = track.id - 1
      console.log(activeTrackId)
      if(activeTrackId !== 0){
         handleToggleAudio(trackList[activeTrackId - 1])
      } else{
         handleToggleAudio(trackList[trackList.length - 1])
      }
   }

   const randomTrack =() =>{
      let min = 0
      let max = trackList.length - 2
      let rand = min + Math.random() * (max + 1 - min);
      
     alert( Math.floor(rand))
    return  handleToggleAudio(trackList[Math.floor(rand)])
   }

   audio.onended = function(){
     if(currentTrack.id  === trackList.length) {
    
     audio.pause()
     alert(`Вы прослушали все ${trackList.length} композиций `)
       // тут ещё код вывода названия песни, оно находится в tracklist[index].name
    } else{
      handleToggleAudio(trackList[currentTrack.id]);
    } 
   }
   audio.volume =1
   const handleToggleAudio =(track)=>{
      // включение плеера
     console.log(track)
      
      setPlayerIsActive(true)
      
     
     
         if(currentTrack.id !== track.id){
         setCurrentTrack(track)
         setIsPlaying(true)

         audio.src = track.src
         audio.currentTime = 0
         audio.play()
         return
      }

      if(isPlaying){
         audio.pause()
         setIsPlaying(false)
         setStopAudio(false)
      }
      else{
         audio.play()
         setIsPlaying(true)
         setStopAudio(true)
      }
      
       
      
      

   };

   const value ={audio ,currentTrack, isPlaying, handleToggleAudio, nextTrack, prevTrack, playerIsActive, randomTrack, setStopAudio, stopAudio, setIsSoundOff,isSoundOff}

   return <AudioContext.Provider value={value}>{children}</AudioContext.Provider>

}
export default AudioProvider