import mongoose, {Types} from "mongoose";
import Artist from "./Artist";
import User from "./User";

const Schema = mongoose.Schema;

const AlbumSchema = new Schema ({
    artist:{
        type:Schema.Types.ObjectId,
        ref: 'Artist',
        required:true,
        validate:{
            validator: async (value: Types.ObjectId) =>{
                const artist = await Artist.findById(value);
                return Boolean(artist);
            },
            message: 'Artist does not exist',
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
    nameAlbum:{
        type:String,
        required:true,
    },
    datetime:{
        type:Number,
        required:true,
    },
    image: String,
    isPublished: {
        type: Boolean,
        default: false,
    },
});

const Album = mongoose.model('Album', AlbumSchema);

export default Album;