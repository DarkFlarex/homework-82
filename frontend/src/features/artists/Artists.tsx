import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectArtists, selectArtistsFetching} from "./artistsSlice";
import {fetchArtists} from "./artistsThunks";
import {Alert, CircularProgress, Grid, Typography} from "@mui/material";
import ArtistsItem from "./components/ArtistsItem";

const Artists = () => {
    const dispatch = useAppDispatch();
    const artists = useAppSelector(selectArtists);
    const isFetching = useAppSelector(selectArtistsFetching);

    useEffect(() => {
        dispatch(fetchArtists());
    }, [dispatch]);

    let content:React.ReactNode = <Alert severity="info" sx={{width: '100%'}}>There are no Artists here!</Alert>;
    if(isFetching) {
        content = <CircularProgress/>;
    } else if (artists.length > 0) {
        content = artists.map((artist) => (
            <ArtistsItem
                key={artist._id}
                _id={artist._id}
                name={artist.name}
                image={artist.image}
                isPublished={artist.isPublished}
            />
        ));
    }
    return (
        <Grid container spacing={2}>
            <Grid container spacing={2}>
                <Grid item xs={12} sx={{ textAlign: 'center' }}>
                    <Typography variant="h4" component="h1">
                        Artists
                    </Typography>
                </Grid>
                <Grid item container spacing={2} xs={12}>
                    {content}
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Artists;