import { useContext, useState } from 'react';
import { AudioContext } from '../../context/AudioContext';
import React from 'react'
import secondsToMMSS from '../../utils/secondsToMMSS';

import style from './track.module.scss'

import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa";
import classNames from 'classnames';


const Track = (track) => {
 
  
  const {id,src,preview,duration,artists,title, index} = track

  const {handleToggleAudio, currentTrack, isPlaying} = useContext(AudioContext)
 
  const formatDuration = secondsToMMSS(duration)

 

  const [isActiveTrack, setIsActiveTrack] = useState(false)
 
 
    
    const isCurrentTrack =  currentTrack.id === track.id
   
  
  return (
    <div className={style.track}>
      <h2>{index}</h2>
       
       <div className={classNames(isCurrentTrack && style.activeTrack)} onClick={() => handleToggleAudio(track)} >
      {isCurrentTrack && isPlaying ? <FaPause/>: <FaPlay /> }  
 
       </div>
      
      <img className={style.preview} src={preview} alt="" />
      
      <div className={style.credits}>
         <b>{title}</b>
        <p>{artists}</p>
      </div>
       <p>{formatDuration}</p>
      
      
     
    </div>
  )
}

export default Track
