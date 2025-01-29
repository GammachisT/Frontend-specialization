import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import songModel from './src/models/songModel.js'; // Adjust the path as necessary

const app = express();

// Set up multer for file storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Make sure this directory exists
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname); // You can customize the filename here
    },
});

const upload = multer({ storage });

// Upload route
app.post('/upload', upload.single('file'), async (req, res) => {
    try {
        const newFile = new FileModel({
            fileName: req.body.name || req.file.originalname, // Use the optional name or the original name
            filePath: req.file.path,
            fileType: req.file.mimetype,
        });

        await newFile.save();
        res.status(200).json(newFile);
    } catch (error) {
        res.status(500).json({ error: 'File upload failed' });
    }
});

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(5000, () => console.log('Server running on port 5000')))
    .catch(err => console.error(err));