import Track from "../models/Track";
import TrackHistory from "../models/TrackHistory";
import express from "express";
import mongoose from "mongoose";
import auth, {RequestWithUser} from "../middleware/auth";

const trackHistoryRouter = express.Router();

trackHistoryRouter.get('/',auth , async (req:RequestWithUser, res, next) => {
    try {
        if (!req.user) {
            return res.status(401).send({ error: 'User not found' });
        }
        const filter: Record<string, unknown> = {
            userListened: req.user._id,
        }

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

trackHistoryRouter.post('/',auth , async (req:RequestWithUser, res, next) => {
  try {
    if (!req.user) {
        return res.status(401).send({ error: 'User not found' });
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

    const trackHistory = new TrackHistory({
        userListened: req.user._id,
        artist: track.artist._id,
        trackListened: track._id,
        datetime: new Date(),
    });

        await trackHistory.save();
        return res.send(trackHistory);
    } catch (error) {
      if (error instanceof mongoose.Error.ValidationError){
          return  res.status(400).send(error);
      }
        return next(error);
    }
});

export default trackHistoryRouter;