import mongoose, {Types} from "mongoose";
import Album from "./Album";
import Artist from "./Artist";
import User from "./User";

const Schema = mongoose.Schema;

const TrackSchema = new mongoose.Schema({
    album:{
        type:Schema.Types.ObjectId,
        ref: 'Album',
        required:true,
        validate:{
            validator: async (value: Types.ObjectId) =>{
                const album = await Album.findById(value);
                return Boolean(album);
            },
            message: 'Album does not exist',
        }
    },
    createUser:{
        type:Schema.Types.ObjectId,
        ref: 'User',
        required:true,
        validate:{
            validator: async (value: Types.ObjectId) =>{
                const createUser = await User.findById(value);
                return Boolean(createUser);
            },
            message: 'createUser does not exist',
        }
    },
    artist:{
        type: Schema.Types.ObjectId,
        ref:'Artist',
        required:true,
        validate: {
            validator: async (value: Types.ObjectId) => {
                const artist = await Artist.findById(value);
                return Boolean(artist);
            },
            message: 'Artist does not exist'
        },
    },
    nameTrack:{
        type:String,
        required:true,
    },
    duration:{
        type:String,
        required:true,
    },
    numberTrack: {
        type: Number,
        required: true,
    },
    isPublished: {
        type: Boolean,
        default: false,
    },
});

const Track = mongoose.model('Track', TrackSchema);

export default Track;