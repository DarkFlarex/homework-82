import express from "express";
import Artist from "../models/Artist";
import mongoose from "mongoose";
import {imagesUpload} from "../multer";
import {ArtistMutation} from "../types";

const artistsRouter = express.Router();

artistsRouter.get('/', async (req, res,next) => {
    try {
        const artists = await Artist.find();
        return res.send(artists);
    } catch (error){
        next(error);
    }
});

artistsRouter.post('/', imagesUpload.single('image'),async (req, res ,next) =>{
    try{
        const artistMutation:ArtistMutation = {
          name: req.body.name,
          image: req.file ? req.file.filename : null,
          information: req.body.information,
        };

        const artist = new Artist(artistMutation);
        await artist.save();
        return res.send(artist);
    } catch (error){
        if (error instanceof mongoose.Error.ValidationError){
            return  res.status(400).send(error);
        }
        return next(error);
    }
});

export default artistsRouter