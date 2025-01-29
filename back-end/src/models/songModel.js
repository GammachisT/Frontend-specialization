import mongoose from 'mongoose';

const songSchema = new mongoose.Schema({
    name: { type: String, required: true },
    desc: { type: String, required: true },
    audio: { type: String, required: true },
    image: { type: String, required: true },
    album: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

const SongModel = mongoose.model('Song', songSchema);
export default SongModel;