import React from 'react';
import { Card, CardContent, CardHeader, Grid } from '@mui/material';
import dayjs from 'dayjs';

interface Props {
    trackListened: {
        artist: {
            name:string;
        };
        nameTrack: string;
    };
    datetime: string;
}

const TrackHistoryItems: React.FC<Props> = ({ trackListened, datetime }) => {
    return (
        <Grid item xs={12} sm={6} md={4} lg={3}>
            <Card sx={{ height: '100%' }}>
                <CardHeader title={trackListened.nameTrack} />
                <CardContent>
                    <span>{trackListened.artist.name}</span>
                    {dayjs(datetime).format('DD.MM.YYYY HH:mm:ss')}
                </CardContent>
            </Card>
        </Grid>
    );
};

export default TrackHistoryItems;