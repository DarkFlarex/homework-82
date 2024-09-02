import express from "express";
import mongoose from "mongoose";
import {imagesUpload} from "../multer";
import {AlbumMutation} from "../types";
import Album from "../models/Album";
const albumsRouter = express.Router();



albumsRouter.post('/', imagesUpload.single('image'), async (req, res,next) => {
    try {
        const albumMutation: AlbumMutation = {
            artist: req.body.artist,
            nameAlbum: req.body.nameAlbum,
            datetime: req.body.datetime,
            image: req.file ? req.file.filename : null,
        };

        const album = new Album (albumMutation);
        await album.save();

        return res.send(album);
    } catch (error){
        if (error instanceof mongoose.Error.ValidationError){
            return res.status(400).send(error);
        }
        return next(error);
    }
});

export default albumsRouter;


