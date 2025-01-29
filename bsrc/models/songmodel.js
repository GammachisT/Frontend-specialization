import mongoose from "mongoose";

const songSchema = new mongoose.Schema({
    url: { type: String, required: true },
    public_id: { type: String, required: true },
    type: { type: String, required: true },
    name: { type: String, required: true},
    desc: { type: String, required: true},
    album: { type: String, required: true},
    image: { type: String,  required: true},
    file: { type: String, required: true},
    duration: {type: String, required: true}
})

const songModel = mongoose.models.song || mongoose.model("song", songSchema);

export default songModel;