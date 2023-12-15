import React, { useState } from 'react'
import trackList from '../assets/trackList'

import Track from '../components/Track/Track'
import PlayBar from '../components/PlayBar/PlayBar'

import './App.css'

const MainPage = () => {

  const [searchInputValue, setSearchInputValue ] = useState('')
  const [tracks, setTracks] = useState(trackList)

  
  const runSearch =(query) =>{
    console.log(query)
    if(!query){
      
      return trackList
    }

    const loverCaseQuery = query.toLowerCase();
    
    return trackList.filter((track) => track.title.toLocaleLowerCase().includes(loverCaseQuery)||
    track.artists.toLocaleLowerCase().includes(loverCaseQuery)) 
   
  }

  const handleChange = (e) =>{
   
   
   setSearchInputValue(e.target.value)
   const foundTracks = runSearch(e.target.value)
   setTracks(foundTracks)
  }

  return (
  <>
    <input value={searchInputValue} onChange={ handleChange } type="text" placeholder='поиск тректов' />
    <div className="tracks__wrapper">   
      {tracks.map((track, index) => (<Track key={index} index={index} {...track} />))}
      <PlayBar/>
    </div>
  </>  
  )
  
  
}

export default MainPage
