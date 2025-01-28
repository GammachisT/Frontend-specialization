import React from 'react';
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import FileUpload from './FileUpload.jsx'

const Sidebar = () => {

    const navigate = useNavigate();

  return (
    <div className='w-[45%] h-full p-1  flex-col gap-2 text-white  lg:flex'>
            <div className='bg-[#121212] h-[15%] rounded flex flex-col justify-around'>
                <div onClick={()=>navigate('/')} className='flex items-center gap-3 pl-8 cursor-pointer'>
                    <img className='w-6 pt-5' src={assets.home_icon} alt="" />
                    <p className='font-bold pt-5'>Home</p>
                </div>

                <div className='flex items-center gap-3 pl-8 cursor-pointer'>
                    <img className='w-6 pt-5' src={assets.search_icon} alt="" />
                    <p className='font-bold pt-5'>search</p>
                </div>
                
            </div>
            <div className='bg-[#121212] h-[85%] rounded'>
                <div className='p-4 flex items-center justify-between'>
                    <div className='flex items-center gap-3'>
                        <img className='w-8' src={assets.stack_icon} alt="" />
                        <p className='font-semibold'>Your Library</p>
                    </div>
                    <div className='flex items-center gap-3'>
                        <img className='w-5' src={assets.arrow_icon} alt="" />
                        <img className='w-5' src={assets.plus_icon} alt="" />
                    </div>
                </div>
                    <div className='h-[87%] p-4 bg-[#242424] m-2 rounded font-semibold flex flex-col items-start justify-start gap-1 pl-4'>
                        <h1>Create your first song playlist</h1>
                        < FileUpload />
                    </div>
                    
            </div>
    </div>
  )
}

export default Sidebar;