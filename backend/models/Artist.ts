import mongoose, {Types} from "mongoose";
import User from "./User";

const Schema = mongoose.Schema;

const ArtistSchema = new Schema({
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
    name:{
        type:String,
        required:true,
    },
    image:String,
    information:String,
    isPublished: {
        type: Boolean,
        default: false,
    },
});

const Artist = mongoose.model('Artist', ArtistSchema);

export default Artist;