import React from 'react';
import {Button, Card, CardContent, CardHeader, Grid} from "@mui/material";
import {addTrackToHistory} from "../../TrackHistory/trackHistoryThunks";
import {useAppDispatch} from "../../../app/hooks";

export interface Props {
    nameTrack:string;
    duration:string;
    numberTrack:number;
    trackId: string;
}

const TracksItem: React.FC<Props> = ({nameTrack,duration,numberTrack,trackId }) => {
    const dispatch = useAppDispatch();

    const handlePlayClick = () => {
        dispatch(addTrackToHistory({ track: trackId }));
    };

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
                <Grid item>
                    <Button onClick={handlePlayClick}>
                        Play
                    </Button>
                </Grid>
            </Card>
        </Grid>
    );
};

export default TracksItem;