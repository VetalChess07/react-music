import React, { useContext, useEffect, useState } from 'react'

import { AudioContext } from '../../context/AudioContext'

import secondsToMMSS from '../../utils/secondsToMMSS';

import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa";
import { MdSkipNext } from "react-icons/md";
import { IoArrowRedoCircleOutline } from "react-icons/io5";
import { FaArrowsRotate } from "react-icons/fa6";
import { RiShareBoxLine } from "react-icons/ri";

import style from './PlayBar.module.scss'


const TimeControls = () => {



   const { audio, currentTrack, nextTrack } = useContext(AudioContext)

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

   const { audio, currentTrack, isPlaying, handleToggleAudio, nextTrack, prevTrack, playerIsActive, randomTrack } = useContext(AudioContext)


   const { title, artists, preview, duration, index } = currentTrack;

   console.log(currentTrack)
   

   const formatDuration = secondsToMMSS(duration)



   


   return (
      <div className={style.playbar}>
         {playerIsActive ? 
         <>
         {index}
             <img className={style.preview} src={preview} alt="" />
         <div onClick={() => handleToggleAudio(currentTrack)}>
            {isPlaying ? <FaPause /> : <FaPlay />}
         </div>
         <div className={style.credits}>
            <h4>{title}</h4>
            <p>{artists}</p>
         </div>

         <MdSkipNext className={style.prevTrack} onClick={()=> prevTrack(currentTrack) } />
         <TimeControls />
         <p>{formatDuration}</p>
         <MdSkipNext onClick={()=> nextTrack(currentTrack, index + 1) } />
         <RiShareBoxLine/>
        
         </>
          :<div className={style.startBar}>
            <h1>Включите любую композицию</h1>
            <div className={style.startBar__item}>
               <div onClick={() => handleToggleAudio(currentTrack[0])}  className={style.btn__block}>
               <IoArrowRedoCircleOutline className={style.btn} />
               <p>включить первый трек</p>
               </div>
               <div onClick={() => randomTrack()} className={style.btn__block}>
               <FaArrowsRotate className={style.btn} />
               <p>включить случайный трек</p>
               </div>
             
            </div>
             
          </div> }
        
      </div>
   )
}

export default PlayBar
