import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import cors from 'cors'; // Import CORS
import cloudinary from './src/config/cloudinary.js'; // Ensure this is the correct path
import SongModel from './src/models/songModel.js'; // Adjust the path as necessary

const app = express();

// Use CORS middleware
app.use(cors({
    origin: 'http://localhost:5173', // Allow requests from your frontend
    methods: ['GET', 'POST'], // Specify allowed HTTP methods
    credentials: true // Allow credentials if needed
}));

// Use memory storage to handle file uploads
const storage = multer.memoryStorage(); // Store files in memory
const upload = multer({ storage });

// Upload route
app.post('/api/song/add', upload.fields([{ name: 'audio' }, { name: 'image' }]), async (req, res) => {
    const { name, desc, album } = req.body;
    
    try {
        // Upload audio to Cloudinary
        const audioFile = req.files['audio'][0];
        const audioResult = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                { resource_type: 'auto', timeout: 60000 }, // Extend timeout to 60 seconds
                (error, result) => {
                    if (error) return reject(new Error("Audio upload failed: " + error.message));
                    resolve(result);
                }
            );
            audioFile.stream.pipe(uploadStream);
        });

        // Upload image to Cloudinary
        const imageFile = req.files['image'][0];
        const imageResult = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                { resource_type: 'image', timeout: 60000 }, // Extend timeout to 60 seconds
                (error, result) => {
                    if (error) return reject(new Error("Image upload failed: " + error.message));
                    resolve(result);
                }
            );
            imageFile.stream.pipe(uploadStream);
        });

        // Create a new song entry in the database
        const newSong = new SongModel({
            name,
            desc,
            audio: audioResult.secure_url, // Cloudinary URL for audio
            image: imageResult.secure_url,  // Cloudinary URL for image
            album,
        });

        await newSong.save();
        res.status(200).json({ success: true, message: "Song added", song: newSong });
    } catch (error) {
        res.status(500).json({ error: 'File upload failed: ' + error.message });
    }
});

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true })
    .then(() => app.listen(5000, () => console.log('Server running on port 5000')))
    .catch(err => console.error(err));