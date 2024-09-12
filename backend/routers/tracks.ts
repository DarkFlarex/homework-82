import express from "express";
import {TrackMutation} from "../types";
import mongoose from "mongoose";
import Track from "../models/Track";

const tracksRouter = express.Router();

tracksRouter.get('/', async (req, res, next) => {
    try {
        const filter: Record<string, unknown> = {};
        if (req.query.album) {
            filter.album = req.query.album;
        }

        const tracks = await Track.find(filter).sort({ numberTrack: 1 });

        return res.send(tracks);
    } catch (error) {
        next(error);
    }
});

tracksRouter.post('/',async (req, res ,next) =>{
    try{
        const tracks = await Track.find({ album: req.body.album }).sort({ numberTrack: -1 });
        const numberTrack = tracks.length > 0 ? tracks[0].numberTrack + 1 : 1;

        const trackMutation:TrackMutation = {
            album: req.body.album,
            nameTrack: req.body.nameTrack,
            duration: req.body.duration,
            numberTrack: numberTrack,
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