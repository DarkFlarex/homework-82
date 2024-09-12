import User from "../models/User";
import Track from "../models/Track";
import TrackHistory from "../models/TrackHistory";
import express from "express";

const tackHistoryRouter = express.Router();

tackHistoryRouter.post('/track_history', async (req, res, next) => {
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

    const track = await Track.findById(trackId);

    if (!track) {
        return res.status(400).send({ error: 'Track not found!' });
    }

    try {
        const trackHistory = new TrackHistory({
            userListened: user._id,
            trackListened: track._id,
            datetime: new Date(),
        });

        await trackHistory.save();
        return res.send(trackHistory);
    } catch (error) {
        return next(error);
    }
});

export default tackHistoryRouter;