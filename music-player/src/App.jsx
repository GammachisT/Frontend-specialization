import React, { useContext }  from 'react'
import { ToastContainer } from 'react-toastify';
import { Routes, Route } from 'react-router-dom';
import Sidebar from "./components/sidebar";
import Player from './components/player';
import Display from './components/Display';
import { PlayerContext } from './context/PlayerContext';
import FileUpload from './components/FileUpload.jsx'


import AddSong from './pages/AddSong';
import AddAlbum from './pages/AddAlbum';
import ListAlbum from './pages/ListAlbum';
import ListSong from './pages/ListSong';
import sidebar from './pages/Sidebar';
import Navbar from './pages/Navbar';

export const url = "http://localhost:5000";

const App = () => {

  const {audioRef, track} = useContext(PlayerContext);

  return (
    <div className='h-screen bg-black'>
      <div className='h-[90%] flex'>
        
      <ToastContainer />
      <Sidebar />
        <Display />

      </div>
      
      <Player />
      
      <audio ref={audioRef} src={track.file} preload='auto'></audio>
    </div>
  )
}

export default App
