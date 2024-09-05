import mongoose from "mongoose";
import express from "express";
import User from "../models/User";
import TrackHistory from "../models/TrackHistory";
import Track from "../models/Track";

const usersRouter = express.Router();


usersRouter.post("/", async (req, res, next) => {
    try {
        const user = new User({
            username: req.body.username,
            password: req.body.password,
        });
        user.generateToken();

        await user.save();
        return res.send(user);
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError){
            return res.status(400).send(error);
        }

        return next(error);
    }
});

usersRouter.post('/sessions', async (req, res, next) => {
    try{
        const user = await User.findOne({username: req.body.username});

        if(!user){
            return res.status(400).send({error: 'Username not found!'});
        }

        const isMatch = await user.checkPassword(req.body.password);

        if(!isMatch) {
            return res.status(400).send({error: 'Password is wrong!'});
        }

        user.generateToken();
        await user.save();

        return res.send(user);
    } catch (error) {
        return next(error);
    }
});

usersRouter.post('/track_history', async (req, res, next) => {
    const headerValue = req.get('Authorization');
    console.log(headerValue);
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

export default usersRouter;