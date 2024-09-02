import express from "express";
import mongoose from "mongoose";
import {imagesUpload} from "../multer";
import {AlbumMutation} from "../types";
import Album from "../models/Album";
const albumsRouter = express.Router();

albumsRouter.get('/', async (req, res, next) => {
    try {
        const artistId = req.query.artist as string;
        let query = {};

        if (artistId) {
            query = { artist: new mongoose.Types.ObjectId(artistId) };
        }

        const albums = await Album.find(query).populate('artist', 'name information');

        return res.send(albums);
    } catch (error) {
        next(error);
    }
});

albumsRouter.get('/:id', async (req, res,next) => {
    try {
        const album = await Album.findById(req.params.id).populate('artist', 'name information');

        if (album === null) {
            return res.status(404).send({error: 'Album not found'});
        }

        return res.send(album)
    } catch (error){
        next(error);
    }
});

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


