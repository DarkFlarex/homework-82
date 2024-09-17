import User from "../models/User";
import Track from "../models/Track";
import TrackHistory from "../models/TrackHistory";
import express from "express";

const trackHistoryRouter = express.Router();

trackHistoryRouter.get('/', async (req, res, next) => {
    try {
        const filter: Record<string, unknown> = {};
        if (req.query.track) {
            filter.track = req.query.track;
        }

        const albums = await TrackHistory.find(filter)
            .populate({path: 'trackListened', populate: {path: 'artist', select: 'name'}
            }).sort({ datetime: -1 });

        return res.send(albums);
    } catch (error) {
        next(error);
    }
});

trackHistoryRouter.post('/', async (req, res, next) => {
    const headerValue = req.get('Authorization');

    if(!headerValue){
        return res.status(401).send({error: 'Header "Authorization" not found!'});
    }

    const [_bearer, token] = headerValue.split(' ');

    if (!token) {
        return res.status(401).send({error: 'Token not found!'});
    }

    const user = await User.findOne({token});

    if(!user) {
        return res.status(401).send({error: 'Wrong Token!'});
    }

    const trackId = req.body.track;

    if (!trackId) {
        return res.status(400).send({ error: 'Track ID not found!' });
    }

    const track = await Track.findById(trackId).populate('artist');

    if (!track) {
        return res.status(400).send({ error: 'Track not found!' });
    }

    if (!track.artist) {
        return res.status(400).send({ error: 'Artist not found!' });
    }

    try {
        const trackHistory = new TrackHistory({
            userListened: user._id,
            artist: track.artist._id,
            trackListened: track._id,
            datetime: new Date(),
        });

        await trackHistory.save();
        return res.send(trackHistory);
    } catch (error) {
        return next(error);
    }
});

export default trackHistoryRouter;