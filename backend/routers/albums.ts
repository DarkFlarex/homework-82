import express from "express";
import mongoose from "mongoose";
import {imagesUpload} from "../multer";
import Album from "../models/Album";
import auth, {RequestWithUser} from "../middleware/auth";
import permit from "../middleware/permit";
import isPublished from "../middleware/isPublished";
const albumsRouter = express.Router();

albumsRouter.get('/',isPublished, async (req: RequestWithUser, res, next) => {
    try {
        const filter: Record<string, unknown> = {};
        if (req.query.artist) {
            filter.artist = req.query.artist;
        }

        if (!req.user || req.user.role !== 'admin') {
            filter.isPublished = true;
        }

        const albums = await Album.find(filter).populate('artist', 'name').sort({ datetime: -1 });

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

albumsRouter.patch('/:id/togglePublished', auth, permit('admin'), async (req, res, next) => {
    try {
        const album = await Album.findById(req.params.id);

        if (!album) {
            return res.status(404).send({ error: 'Album not found' });
        }

        album.isPublished = !album.isPublished;

        await album.save();

        return res.send(album);
    } catch (error) {
        next(error);
    }
});

albumsRouter.delete('/:id', auth,permit('admin'),async (req, res, next) => {
    try {
        const albums = await Album.findById(req.params.id);

        if (!albums) {
            return res.status(404).send({ error: 'albums not found' });
        }
        await Album.deleteOne({_id: req.params.id});

        return res.send(albums);
    } catch (error) {
        next(error);
    }
});

albumsRouter.post('/', auth, imagesUpload.single('image'), async (req: RequestWithUser, res,next) => {
    try {
        if (!req.user) {
            return res.status(401).send({ error: 'User not found' });
        }

        const albumMutation = await Album.create({
            createUser: req.user._id,
            artist: req.body.artist,
            nameAlbum: req.body.nameAlbum,
            datetime: req.body.datetime,
            image: req.file ? req.file.filename : null,
        });

        return res.send(albumMutation);
    } catch (error){
        if (error instanceof mongoose.Error.ValidationError){
            return res.status(400).send(error);
        }
        return next(error);
    }
});

export default albumsRouter;