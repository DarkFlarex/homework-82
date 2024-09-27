import React, {useEffect, useState} from 'react';
import {AlbumMutation} from "../../../types";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {selectArtists, selectArtistsFetching} from "../../artists/artistsSlice";
import {fetchArtists} from "../../artists/artistsThunks";
import {CircularProgress, Grid, MenuItem, TextField} from "@mui/material";
import FileInput from "../../../UI/FileInput/FileInput";
import {LoadingButton} from "@mui/lab";
import SaveIcon from "@mui/icons-material/Save";

interface Props {
    onSubmit: (album: AlbumMutation) => void;
    isLoading: boolean;
}

const AlbumForm: React.FC<Props> = ({onSubmit,isLoading}) => {
    const dispatch = useAppDispatch();
    const artists = useAppSelector(selectArtists);
    const artistsFetching = useAppSelector(selectArtistsFetching);

    const [state, setState] = useState<AlbumMutation>({
        artist: '',
        nameAlbum: '',
        datetime: '',
        image:  null,
    });

    useEffect(() => {
        dispatch(fetchArtists());
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

    const fileInputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, files } = event.target;
        const value = files && files[0] ? files[0] : null;

        setState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    return (
        <Grid container direction="column" spacing={2} component="form" onSubmit={submitFormHandler}>
            <Grid item>
                {artistsFetching ? (
                    <CircularProgress />
                ) : (
                    <TextField
                        required
                        select
                        label="Artist"
                        id="artist"
                        name="artist"
                        value={state.artist}
                        onChange={inputChangeHandler}
                    >
                        <MenuItem value="" disabled>
                            Select artist
                        </MenuItem>
                        {artists.map((artist) => (
                            <MenuItem key={artist._id} value={artist._id}>
                                {artist.name}
                            </MenuItem>
                        ))}
                    </TextField>
                )}
            </Grid>
            <Grid item>
                <TextField
                    required
                    label="NameAlbum"
                    id="nameAlbum"
                    name="nameAlbum"
                    value={state.nameAlbum}
                    onChange={inputChangeHandler}
                />
            </Grid>
            <Grid item>
                <TextField
                    required
                    label="Date"
                    id="datetime"
                    name="datetime"
                    value={state.datetime}
                    onChange={inputChangeHandler}
                />
            </Grid>
            <Grid item>
                <FileInput
                    label="Image"
                    name="image"
                    onChange={fileInputChangeHandler}
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

export default AlbumForm;