import React, { useContext, useEffect, useState } from 'react'
import classNames from 'classnames';

import { AudioContext } from '../../context/AudioContext'

import secondsToMMSS from '../../utils/secondsToMMSS';

import style from './style.module.scss'
import  './style.css'

import trackList from '../../assets/trackList';
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa";
import { MdSkipNext } from "react-icons/md";
import { IoArrowRedoCircleOutline } from "react-icons/io5";
import { FaArrowsRotate } from "react-icons/fa6";
import { RiShareBoxLine } from "react-icons/ri";
import { AiFillSound } from "react-icons/ai";
import { IoIosVolumeOff } from "react-icons/io";

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


const TrackPageFull = () => {
   
   // const[prevTreckTitle, setPrevTreckTitle] = useState('')
   

   const trackListLength = trackList.length

   const { audio, currentTrack, isPlaying, handleToggleAudio, nextTrack, prevTrack, playerIsActive, randomTrack, setStopAudio, stopAudio,setIsSoundOff, isSoundOff } = useContext(AudioContext)
   const { id,title, artists, preview, duration, index } = currentTrack;
const formatDuration = secondsToMMSS(duration)

useEffect(()=>{
   setIsSoundOff(false)
   console.log('ffff')
}, [currentTrack])

const soundOff = ()=>{
   console.log(isSoundOff)
  if(audio.volume !== false){
   audio.volume = false
   setIsSoundOff(true)
  } else{
   audio.volume = true
   setIsSoundOff(false)
  }
}
   
  

  return (
    <div className={style.TrackPageFull}>
      <div className={style.inner}>
         <div  className={style.item}>
            <img src={preview} className={stopAudio ? "fullPreview":"fullPreview stopRotate" }   alt="" />
         </div>
         <div className={style.item}>
         <p>{id === 1? `"${trackList[trackList.length -1].title}" <<<`  :  `"${trackList[id - 1].title}" <<<` }</p> 
            <h2>{title} </h2>
         <p> {trackList.length === id ?`>>> "${trackList[0].title}" `  : `>>> "${trackList[id].title}"`  }</p>
         </div>
         
         <div className={style.item}>
            <p>{artists}</p>
         </div>
         <div className={style.item}>
            <TimeControls />
            <p>{formatDuration}</p>
         </div>
         <div className={style.item}>
            <button className={style.btnSoundOff} onClick={() => soundOff()}>
               {isSoundOff ? <IoIosVolumeOff className={style.btnSoundOff__item_off} /> : <AiFillSound className={style.btnSoundOff__item} />}

        
            </button>
         
         
        
         </div>
         <div className={style.item}>
          <button  className={style.btnPrev} onClick={()=> prevTrack(currentTrack) }>
             <MdSkipNext className={style.prevTrack}  />
          </button>
      
         <button className={style.btnPause} onClick={() => handleToggleAudio(currentTrack)}>
            {isPlaying ? <FaPause /> : <FaPlay />}
         </button>
         <button className={style.btnNext} onClick={()=> nextTrack(currentTrack) }>
            <MdSkipNext  />
         </button>
         
         </div>
         
      </div>
    </div>
  )
}

export default TrackPageFull
