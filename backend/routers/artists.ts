import express from "express";
import Artist from "../models/Artist";
import mongoose from "mongoose";
import {imagesUpload} from "../multer";
import auth from "../middleware/auth";
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

artistsRouter.post('/', auth, imagesUpload.single('image'),async (req, res ,next) =>{
    try{
        const artistMutation = await Artist.create({
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