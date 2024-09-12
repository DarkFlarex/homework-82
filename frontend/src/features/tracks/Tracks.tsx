import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectAlbumName, selectTracks, selectTracksFetching} from "./tracksSlice";
import React, {useEffect} from "react";
import {fetchTracksOneAlbum} from "./tracksThunks";
import {Alert, CircularProgress, Grid, Typography} from "@mui/material";
import TracksItem from "./components/TracksItem";
import {useParams} from "react-router-dom";
import {selectArtistName} from "../albums/albumsSlice";

const Tracks = () => {
    const { id } = useParams() as { id: string };
    const dispatch = useAppDispatch();
    const tracks = useAppSelector(selectTracks);
    const isFetching = useAppSelector(selectTracksFetching);
    const artistName = useAppSelector(selectArtistName);
    const albumName = useAppSelector(selectAlbumName)

    useEffect(() => {
        dispatch(fetchTracksOneAlbum(id));
    }, [dispatch,id]);

    let content:React.ReactNode = <Alert severity="info" sx={{width: '100%'}}>There are no Tracks here!</Alert>;

    if(isFetching) {
        content = <CircularProgress/>;
    } else if (tracks.length > 0) {
        content = tracks.map((track) => (
            <TracksItem
                key={track.nameTrack}
                nameTrack={track.nameTrack}
                numberTrack={track.numberTrack}
                duration={track.duration}
            />
        ));
    }
    return (
        <Grid container spacing={2}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="h4" component="h1">
                        {artistName}
                    </Typography>
                    <Typography variant="h4" component="h1">
                        {albumName}
                    </Typography>
                </Grid>
                <Grid item container spacing={2} xs={12}>
                    {content}
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Tracks;