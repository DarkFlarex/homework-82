import React, {useEffect} from "react";
import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectAlbums, selectAlbumsFetching} from "./albumsSlice";
import {fetchAlbumsOneArtist} from "./albumsThunks";
import {Alert, CircularProgress, Grid} from "@mui/material";
import AlbumsItem from "./components/AlbumsItem";

const Albums = () => {
    const { id } = useParams() as { id: string };
    const dispatch = useAppDispatch();
    const albums = useAppSelector(selectAlbums);
    const isFetching = useAppSelector(selectAlbumsFetching);

    useEffect(() => {
        dispatch(fetchAlbumsOneArtist(id));
    }, [dispatch,id]);

    let content:React.ReactNode = <Alert severity="info" sx={{width: '100%'}}>There are no Albums here!</Alert>;

    if(isFetching) {
        content = <CircularProgress/>;
    } else if (albums.length > 0) {
        content = albums.map((album) => (
            <AlbumsItem
                key={album._id}
                _id={album._id}
                artist={album.artist}
                nameAlbum={album.nameAlbum}
                image={album.image}
                datetime={album.datetime}
            />
        ));
    }
    return (
        <Grid item container spacing={1}>
            {content}
        </Grid>
    );
};

export default Albums;