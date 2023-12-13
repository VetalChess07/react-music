import { Children, createContext, useState } from "react";

import trackList from "../assets/trackList";

export const AudioContext = createContext({})

const audio = new Audio()

const AudioProvider = ({children}) =>{
   // (trackLislt[0]
   const [currentTrack, setCurrentTrack] = useState(trackList);
   const [isPlaying, setIsPlaying] = useState(false);

   const handleToggleAudio =(track)=>{

      console.log(track)

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
      }
      else{
         audio.play()
         setIsPlaying(true)
      }
   };

   const value ={audio ,currentTrack, isPlaying, handleToggleAudio}

   return <AudioContext.Provider value={value}>{children}</AudioContext.Provider>

}
export default AudioProvider