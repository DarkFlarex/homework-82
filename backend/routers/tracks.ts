import express from "express";
import mongoose from "mongoose";
import Track from "../models/Track";
import auth from "../middleware/auth";
import permit from "../middleware/permit";

const tracksRouter = express.Router();

tracksRouter.get('/', async (req, res, next) => {
    try {
        const filter: Record<string, unknown> = {};
        if (req.query.album) {
            filter.album = req.query.album;
        }

        const tracks = await Track.find(filter).populate('album', 'nameAlbum').sort({ numberTrack: 1 });

        return res.send(tracks);
    } catch (error) {
        next(error);
    }
});

tracksRouter.delete('/:id', auth,permit('admin'),async (req, res, next) => {
    try {
        const tracks = await Track.findById(req.params.id);

        if (!tracks) {
            return res.status(404).send({ error: 'tracks not found' });
        }
        await Track.deleteOne({_id: req.params.id});

        return res.send(tracks);
    } catch (error) {
        next(error);
    }
});

tracksRouter.post('/', auth,async (req, res ,next) =>{
    try{
        const tracks = await Track.find({ album: req.body.album }).sort({ numberTrack: -1 });
        const numberTrack = tracks.length > 0 ? tracks[0].numberTrack + 1 : 1;

        const trackMutation = await Track.create({
            album: req.body.album,
            artist: req.body.artist,
            nameTrack: req.body.nameTrack,
            duration: req.body.duration,
            numberTrack: numberTrack,
        });

        return res.send(trackMutation);
    } catch (error){
        if (error instanceof mongoose.Error.ValidationError){
            return  res.status(400).send(error);
        }
        return next(error);
    }
});



export default tracksRouter