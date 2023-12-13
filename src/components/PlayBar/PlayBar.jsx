import React, { useContext, useEffect, useState } from 'react'

import { AudioContext } from '../../context/AudioContext'

import secondsToMMSS from '../../utils/secondsToMMSS';

import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa";

import style from './PlayBar.module.scss'


const TimeControls = () => {



   const { audio, currentTrack } = useContext(AudioContext)

   const { duration } = currentTrack

   const [currentTime, setCurrentTime] = useState(0)

   const formatCurrentTime = secondsToMMSS(currentTime)

   const slidercurrentTime = Math.round((currentTime / duration) * 100)

   const handleChangecurrentTime = (e) => {
      const time = Math.round((e.target.value / 100) * duration);
      setCurrentTime(time);
      audio.currentTime = time;
   };



   useEffect(() => {
      const timeInterval = setInterval(() => {
         setCurrentTime(audio.currentTime)
      }, 1000)
      return () => {
         clearInterval(timeInterval)
      }
   }, [])


   return (<>
      <p>{formatCurrentTime}</p>
      <input
         type="range"
         step={1}
         min={0}
         max={100}
         value={slidercurrentTime}
         onChange={handleChangecurrentTime} />

   </>)
}


const PlayBar = () => {

   const { audio, currentTrack, isPlaying, handleToggleAudio } = useContext(AudioContext)


   const { title, artists, preview, duration } = currentTrack;



   const formatDuration = secondsToMMSS(duration)






   return (
      <div className={style.playbar}>
         <img className={style.preview} src={preview} alt="" />
         <div onClick={() => handleToggleAudio(currentTrack)}>
            {isPlaying ? <FaPause /> : <FaPlay />}
         </div>
         <div className={style.credits}>
            <h4>{title}</h4>
            <p>{artists}</p>
         </div>


         <TimeControls />
         <p>{formatDuration}</p>
      </div>
   )
}

export default PlayBar
