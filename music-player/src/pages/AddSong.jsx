import React, { useState } from 'react';
import { assets } from '../suport/assets';
import axios from 'axios';
import { url } from '../App';
import { toast } from 'react-toastify';

const AddSong = () => {
    const [image, setImage] = useState(null);
    const [song, setSong] = useState(null);
    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
    const [album, setAlbum] = useState("none");
    const [loading, setLoading] = useState(false);

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
        formData.append('name', name);
        formData.append('desc', desc);
        formData.append('audio', song);
        formData.append('image', image);
        formData.append('album', album);

        try {
            const response = await axios.post(`${url}/api/song/add`, formData);
            console.log("Response from server:", response.data);

            if (response.data.success) {
                toast.success("Song added");
                setName("");
                setDesc("");
                setAlbum("none");
                setImage(null);
                setSong(null);
            } else {
                console.error("Error details:", response.data);
                toast.error("Something went wrong");
            }
        } catch (error) {
            console.error("Error details:", error.response ? error.response.data : error.message);
            toast.error("Error occurred");
        } finally {
            setLoading(false);
        }
    }

    return loading ? (
        <div className='grid place-items-center min-h-[80vh]'>
            <div className='w-16 h-16 border-4 border-gray-400 border-t-green-700 rounded-full animate-spin'></div>
        </div>
    ) : (
        <form onSubmit={onSubmitHandler} className='flex flex-col items-start gap-8 text-white'>
            <div className='flex gap-8'>
                <div className='flex flex-col gap-4'>
                    <p>Upload Song</p>
                    <input onChange={(e) => setSong(e.target.files[0])} type="file" id='song' accept='audio/*' hidden />
                    <label htmlFor="song">
                        <img src={song ? assets.upload_added : assets.upload_song} className='w-24 cursor-pointer' alt="" />
                    </label>
                </div>
                <div className='flex flex-col gap-4'>
                    <p>Upload Image</p>
                    <input onChange={(e) => setImage(e.target.files[0])} type="file" id='image' accept='image/*' hidden />
                    <label htmlFor="image">
                        <img src={image ? assets.upload_added : assets.upload_area} className='w-24 cursor-pointer' alt="" />
                    </label>
                </div>
            </div>
            <div className='flex flex-col gap-2.5'>
                <p>Song Name</p>
                <input onChange={(e) => setName(e.target.value)} value={name} className='bg-transparent outline-green-700 border-2 border-gray-400 p-2.5 w-[max(40vw,250px)]' placeholder="Type Here" type="text" required />
            </div>
            <div className='flex flex-col gap-2.5'>
                <p>Song Description</p>
                <input onChange={(e) => setDesc(e.target.value)} value={desc} className='bg-transparent outline-green-700 border-2 border-gray-400 p-2.5 w-[max(40vw,250px)]' placeholder="Type Here" type="text" required />
            </div>
            <div className='flex flex-col gap-2.5'>
                <p>Album</p>
                <select onChange={(e) => setAlbum(e.target.value)} value={album} className='bg-transparent outline-green-700 border-2 border-gray-400 p-2.5 w-[150px] '>
                    <option value="none">None</option>
                </select>
            </div>
            <button type="submit" className='text-base bg-black text-white py-2.5 px-14 cursor-pointer'>ADD</button>
        </form>
    );
}

export default AddSong;