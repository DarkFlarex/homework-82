import express from "express";
import mongoose from "mongoose";
import Track from "../models/Track";
import auth, {RequestWithUser} from "../middleware/auth";
import permit from "../middleware/permit";
import Album from "../models/Album";

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

tracksRouter.patch('/:id/togglePublished', auth, permit('admin'), async (req, res, next) => {
    try {
        const track = await Track.findById(req.params.id);

        if (!track) {
            return res.status(404).send({ error: 'Track not found' });
        }

        track.isPublished = !track.isPublished;

        await track.save();

        return res.send(track);
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

tracksRouter.post('/', auth, async (req: RequestWithUser, res, next) => {
    try {
        if (!req.user) {
            return res.status(401).send({ error: 'User not found' });
        }

        const album = await Album.findById(req.body.album);

        if (!album) {
            return res.status(404).send({ error: 'Album not found' });
        }

        const tracks = await Track.find({ album: req.body.album }).sort({ numberTrack: -1 });

        const numberTrack = tracks.length > 0 ? tracks[0].numberTrack + 1 : 1;

        const trackMutation = await Track.create({
            createUser: req.user._id,
            album: req.body.album,
            artist: album.artist._id,
            nameTrack: req.body.nameTrack,
            duration: req.body.duration,
            numberTrack: numberTrack,
        });

        return res.send(trackMutation);
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            return res.status(400).send(error);
        }
        return next(error);
    }
});

export default tracksRouter