import {createAsyncThunk} from "@reduxjs/toolkit";
import {Artist, ArtistMutation, GlobalError} from "../../types";
import axiosApi from "../../axiosApi";
import {RootState} from "../../app/store";
import {isAxiosError} from "axios";

export const fetchArtists = createAsyncThunk (
    'artists/fetchAll', async ()=>{
    const {data: artists} = await axiosApi.get<Artist[]>('/artists');
    return artists;
});

export const createArtist = createAsyncThunk<void, ArtistMutation, { rejectValue: GlobalError; state: RootState }>(
    'artists/create',
    async (artistMutation, { getState, rejectWithValue }) => {
        const token = getState().users.user?.token;

        if (!token) {
            return rejectWithValue({ error: 'User token is missing' });
        }

        const formData = new FormData();
        const keys = Object.keys(artistMutation) as (keyof ArtistMutation)[];
        keys.forEach((key) => {
            const value = artistMutation[key];
            if (value !== null) {
                formData.append(key, value);
            }
        });

        try {
            await axiosApi.post('/artists', formData);
        } catch (e) {
            if (isAxiosError(e) && e.response) {
                return rejectWithValue(e.response.data);
            }
            throw e;
        }
    }
);