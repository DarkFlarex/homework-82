import express from "express";
import Artist from "../models/Artist";
import mongoose from "mongoose";
import {imagesUpload} from "../multer";
import auth, {RequestWithUser} from "../middleware/auth";
import permit from "../middleware/permit";

const artistsRouter = express.Router();

artistsRouter.get('/', async (req, res,next) => {
    try {
        const artists = await Artist.find();
        return res.send(artists);
    } catch (error){
        next(error);
    }
});

artistsRouter.patch('/:id/togglePublished', auth, permit('admin'), async (req, res, next) => {
    try {
        const artist = await Artist.findById(req.params.id);

        if (!artist) {
            return res.status(404).send({ error: 'Artist not found' });
        }

        artist.isPublished = !artist.isPublished;

        await artist.save();

        return res.send(artist);
    } catch (error) {
        next(error);
    }
});

artistsRouter.delete('/:id', auth,permit('admin'),async (req, res, next) => {
    try {
        const artists = await Artist.findById(req.params.id);

        if (!artists) {
            return res.status(404).send({ error: 'artists not found' });
        }
        await Artist.deleteOne({_id: req.params.id});

        return res.send(artists);
    } catch (error) {
        next(error);
    }
});

artistsRouter.post('/', auth, imagesUpload.single('image'),async (req: RequestWithUser, res ,next) =>{
    try{
        if (!req.user) {
            return res.status(401).send({ error: 'User not found' });
        }

        const artistMutation = await Artist.create({
          createUser: req.user._id,
          name: req.body.name,
          image: req.file ? req.file.filename : null,
          information: req.body.information,
        });

        return res.send(artistMutation);
    } catch (error){
        if (error instanceof mongoose.Error.ValidationError){
            return  res.status(400).send(error);
        }
        return next(error);
    }
});

export default artistsRouter