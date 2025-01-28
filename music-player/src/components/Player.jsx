import React, { useContext } from 'react';
import { assets } from "../assets/assets";
import { PlayerContext } from '../context/PlayerContext';

const Player = () => {
    const { track, seekBar, seekBg, playStatus, play, pause, time, previous, next, seekSong, toggleShuffle, toggleRepeat, shuffle, repeat } = useContext(PlayerContext);

    return (
        <div className='h-[10%] bg-black flex justify-between items-center text-white px-4'>
            <div className='hidden lg:flex items-center gap-4'>
                <img className='w-12' src={track.image} alt="" />
                <div>
                    <p>{track.name}</p>
                    <p>{track.desc.slice(0, 12)}</p>
                </div>
            </div>
            <div className='flex flex-col items-center gap-1 m-auto'>
                <div className='flex gap-4'>
                    <img 
                        onClick={toggleShuffle} 
                        className={`w-4 cursor-pointer ${shuffle ? 'text-green-500' : 'text-white'}`} 
                        src={assets.shuffle_icon} 
                        alt="" 
                    />
                    <img onClick={previous} className='w-4 cursor-pointer' src={assets.prev_icon} alt="" />
                    {playStatus
                        ? <img onClick={pause} className='w-4 cursor-pointer' src={assets.pause_icon} alt="" />
                        : <img onClick={play} className='w-4 cursor-pointer' src={assets.play_icon} alt="" />
                    }
                    <img onClick={next} className='w-4 cursor-pointer' src={assets.next_icon} alt="" />
                    <img 
                        onClick={toggleRepeat} 
                        className={`w-4 cursor-pointer ${repeat ? 'text-green-500' : 'text-white'}`} 
                        src={assets.loop_icon} 
                        alt="" 
                    />
                </div>
                <div className='flex items-center gap-5'>
                    <p>{time.currentTime.minute}:{time.currentTime.second < 10 ? `0${time.currentTime.second}` : time.currentTime.second}</p>
                    <div ref={seekBg} onClick={seekSong} className='w-[60vw] max-w-[500px] bg-gray-300 rounded-full cursor-pointer'>
                        <hr ref={seekBar} className='h-1 border-none w-0 bg-green-800 rounded-full'/>
                    </div>
                    <p>{time.totalTime.minute}:{time.totalTime.second < 10 ? `0${time.totalTime.second}` : time.totalTime.second}</p>
                </div>
            </div>
            <div className='hidden lg:flex items-center gap-2 opacity-75'>
                {/* Other icons */}
            </div>
        </div>
    );
}

export default Player;