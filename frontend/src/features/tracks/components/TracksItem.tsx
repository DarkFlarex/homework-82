import React from 'react';
import {Card, CardContent, CardHeader, Grid} from "@mui/material";

export interface Props {
    nameTrack:string;
    duration:string;
    numberTrack:number;
}

const TracksItem: React.FC<Props> = ({nameTrack,duration,numberTrack}) => {
    return (
        <Grid item sx={{ width: '300px' }}>
            <Card sx={{ height: '100%' }}>
                <CardHeader title={nameTrack}  />
                <CardContent>
                    <span>{numberTrack}:number</span>
                </CardContent>
                <CardContent>
                    <span>{duration}:duration</span>
                </CardContent>
            </Card>
        </Grid>
    );
};

export default TracksItem;