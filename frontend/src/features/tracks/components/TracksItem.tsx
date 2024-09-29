import React, {useCallback} from 'react';
import {Button, Card, CardContent, CardHeader, Grid, IconButton, Typography} from "@mui/material";
import {addTrackToHistory} from "../../TrackHistory/trackHistoryThunks";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {selectUser} from "../../users/usersSlice";
import {deleteTrack, fetchTogglePublishedTrack, fetchTracksOneAlbum} from "../tracksThunks";
import DeleteIcon from "@mui/icons-material/Delete";
import {useParams} from "react-router-dom";

export interface Props {
    nameTrack:string;
    duration:string;
    numberTrack:number;
    trackId: string;
    isPublished: boolean;
}

const TracksItem: React.FC<Props> = ({nameTrack,duration,numberTrack,trackId,isPublished }) => {
    const dispatch = useAppDispatch();
    const { id } = useParams() as { id: string };
    const user = useAppSelector(selectUser);

    const handlePlayClick = () => {
        dispatch(addTrackToHistory({ track: trackId }));
    };

    const handlePublishToggle = useCallback(async () => {
        try {
            await dispatch(fetchTogglePublishedTrack(trackId)).unwrap();
            await dispatch(fetchTracksOneAlbum(id)).unwrap();
        } catch (error) {
            console.error('Toggling publish status error:', error);
        }
    }, [dispatch, trackId, id ]);

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this Item?')) {
            try {
                await dispatch(deleteTrack(trackId)).unwrap();
                await dispatch(fetchTracksOneAlbum(id)).unwrap();
            } catch (error) {
                console.error('Delete track error: ', error);
            }
        }
    };

    return (
        <Grid item sx={{ width: '300px' }}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <CardHeader title={nameTrack} />
                <CardContent>
                    <Typography variant="body1">
                        Номер трека: {numberTrack}
                    </Typography>
                    <Typography variant="body2">
                        Продолжительность: {duration}
                    </Typography>
                    {user && user.role === 'admin' && (
                        <Button
                            sx={{ color: isPublished ? 'green' : 'red' }}
                            onClick={handlePublishToggle}
                        >
                            {isPublished ? "опубликовано" : "неопубликовано"}
                        </Button>
                    )}
                </CardContent>
                <Grid container spacing={1} justifyContent="space-between" sx={{ padding: 2 }}>
                    {user && (
                        <Grid item>
                            <Button variant="contained" color="primary" onClick={handlePlayClick}>
                                Play
                            </Button>
                        </Grid>
                    )}
                    {user && user.role === 'admin' && (
                        <Grid item>
                            <IconButton aria-label="delete" onClick={handleDelete}>
                                <h6 style={{ margin: 0 }}>Delete Track</h6> <DeleteIcon fontSize="inherit" />
                            </IconButton>
                        </Grid>
                    )}
                </Grid>
            </Card>
        </Grid>
    );
};

export default TracksItem;