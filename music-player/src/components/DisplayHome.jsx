import React from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import { albumsData, songsData } from "../assets/assets";
import AlbumItem from './AlbumItem';
import SongItem from './SongItem';

const DisplayHome = () => {
  return (
    <>
    
    <Navbar />
    <div className='mb-4'>
        <h1 className='my-5 font-bold text-2xl'>Featured Charts</h1>
        <div className='flex overflow-auto'>
            {albumsData.map((item, index) => (<AlbumItem key={index} name={item.name} desc={item.desc} id={item.id} image={item.image}/>))}
        </div>
    </div>
    
    <div className='mb-4'>
        <h1 className='my-5 font-bold text-2xl'>Hottest Songs</h1>
        <div className='flex overflow-auto'>
            {songsData.map((item, index) =>(<SongItem key={index} name={item.name} desc={item.desc} id={item.id} image={item.image} />))}
        </div>
    </div>
    </>
  )
}


export default DisplayHome