import React, { useEffect } from 'react';
import {Alert, CircularProgress, Grid, Typography} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectTrackHistories, selectTrackHistoriesFetching } from './trackHistorySlice';
import { fetchTrackHistories } from './trackHistoryThunks';
import TrackHistoryItems from './components/TrackHistoryItems';

const TrackHistories = () => {
    const dispatch = useAppDispatch();
    const trackHistories = useAppSelector(selectTrackHistories);
    const isFetching = useAppSelector(selectTrackHistoriesFetching);

    useEffect(() => {
        dispatch(fetchTrackHistories());
    }, [dispatch]);

    let content: React.ReactNode = <Alert severity="info" sx={{ width: '100%' }}>There are no Track Histories here!</Alert>;

    if (isFetching) {
        content = <CircularProgress />;
    } else if (trackHistories.length > 0) {
        content = trackHistories.map((trackHistory) => (
            <TrackHistoryItems
                key={trackHistory._id}
                trackListened={trackHistory.trackListened}
                datetime={trackHistory.datetime}
            />
        ));
    }

    return (
        <Grid container spacing={2}>
            <Grid container spacing={2}>
                <Grid item xs={12} sx={{ textAlign: 'center' }}>
                    <Typography variant="h4" component="h1">
                        Track History
                    </Typography>
                </Grid>
                <Grid item container spacing={2} xs={12}>
                    {content}
                </Grid>
            </Grid>
        </Grid>
    );
};

export default TrackHistories;