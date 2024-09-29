import React, { useEffect, useState } from 'react';
import { TrackMutation } from "../../../types";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { selectAlbums, selectAlbumsFetching } from "../../albums/albumsSlice";
import { CircularProgress, Grid, MenuItem, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import SaveIcon from "@mui/icons-material/Save";
import { fetchAlbums } from "../../albums/albumsThunks";

interface Props {
    onSubmit: (track: TrackMutation) => void;
    isLoading: boolean;
}

const TrackForm: React.FC<Props> = ({ onSubmit, isLoading }) => {
    const dispatch = useAppDispatch();
    const albums = useAppSelector(selectAlbums);
    const albumsFetching = useAppSelector(selectAlbumsFetching);

    const [state, setState] = useState<TrackMutation>({
        album: '',
        nameTrack: '',
        duration: '',
    });

    useEffect(() => {
        dispatch(fetchAlbums());
    }, [dispatch]);

    const submitFormHandler = (event: React.FormEvent) => {
        event.preventDefault();

        onSubmit({ ...state });
    };

    const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    return (
        <Grid container direction="column" spacing={2} component="form" onSubmit={submitFormHandler}>
            <Grid item>
                {albumsFetching ? (
                    <CircularProgress />
                ) : (
                    <TextField
                        required
                        select
                        label="Album"
                        id="album"
                        name="album"
                        value={state.album}
                        onChange={inputChangeHandler}
                    >
                        <MenuItem value="" disabled>
                            Select album
                        </MenuItem>
                        {albums.map((album) => (
                            <MenuItem key={album._id} value={album._id}>
                                {album.nameAlbum}
                            </MenuItem>
                        ))}
                    </TextField>
                )}
            </Grid>
            <Grid item>
                <TextField
                    required
                    label="Track Name"
                    id="nameTrack"
                    name="nameTrack"
                    value={state.nameTrack}
                    onChange={inputChangeHandler}
                />
            </Grid>
            <Grid item>
                <TextField
                    required
                    label="Duration"
                    id="duration"
                    name="duration"
                    value={state.duration}
                    onChange={inputChangeHandler}
                />
            </Grid>
            <Grid item>
                <LoadingButton
                    type="submit"
                    loading={isLoading}
                    loadingPosition="start"
                    startIcon={<SaveIcon />}
                    variant="contained"
                >
                    <span>Save</span>
                </LoadingButton>
            </Grid>
        </Grid>
    );
};

export default TrackForm;