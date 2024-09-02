import express from "express";
import {TrackMutation} from "../types";
import mongoose from "mongoose";
import Track from "../models/Track";

const tracksRouter = express.Router();

tracksRouter.get('/', async (req, res, next) => {
    try {
        const albumId = req.query.album as string;
        let query = {};

        if (albumId) {
            query = { album: new mongoose.Types.ObjectId(albumId) };
        }

        const tracks = await Track.find(query).populate('album', 'nameAlbum');

        return res.send(tracks);
    } catch (error) {
        next(error);
    }
});

tracksRouter.post('/',async (req, res ,next) =>{
    try{
        const trackMutation:TrackMutation = {
            album: req.body.album,
            nameTrack: req.body.nameTrack,
            duration: req.body.duration,
        };

        const track = new Track(trackMutation);
        await track.save();
        return res.send(track);
    } catch (error){
        if (error instanceof mongoose.Error.ValidationError){
            return  res.status(400).send(error);
        }
        return next(error);
    }
});



export default tracksRouter