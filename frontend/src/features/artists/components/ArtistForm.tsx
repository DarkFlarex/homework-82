import React, {useState} from 'react';
import { ArtistMutation} from "../../../types";
import {useNavigate} from "react-router-dom";
import {useAppDispatch} from "../../../app/hooks";
import {createArtist} from "../artistsThunks";
import { Grid, TextField} from "@mui/material";
import FileInput from "../../../UI/FileInput/FileInput";
import {LoadingButton} from "@mui/lab";
import SaveIcon from '@mui/icons-material/Save';

interface Props {
    isLoading: boolean;
}

const ArtistForm: React.FC<Props> = ({ isLoading }) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [state, setState] = useState<ArtistMutation>({
        name: '',
        information: '',
        image: null,
    });

    const submitFormHandler = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            await dispatch(createArtist(state)).unwrap();
            navigate('/');
        } catch (err) {
            console.error('Create artist error:', err);
        }
    };

    const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
                <TextField
                    required
                    label="Name"
                    id="name"
                    name="name"
                    value={state.name}
                    onChange={inputChangeHandler}
                />
            </Grid>
            <Grid item>
                <TextField
                    multiline
                    minRows={3}
                    label="Information"
                    id="information"
                    name="information"
                    value={state.information}
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

export default ArtistForm;