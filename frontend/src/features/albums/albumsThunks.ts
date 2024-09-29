import {createAsyncThunk} from "@reduxjs/toolkit";
import {Album, AlbumMutation, GlobalError} from "../../types";
import axiosApi from "../../axiosApi";
import {RootState} from "../../app/store";
import {isAxiosError} from "axios";

export const fetchAlbumsOneArtist = createAsyncThunk<Album[], string>(
    'albums/fetchAlbumsOne',
    async (id) => {
        const {data: albums} = await axiosApi.get<Album[]>(`/albums?artist=${id}`);
        return albums;
    }
);

export const fetchAlbums = createAsyncThunk (
    'albums/fetchAll', async ()=>{
        const {data: albums} = await axiosApi.get<Album[]>('/albums');
        return albums;
});

export const fetchTogglePublishedAlbums = createAsyncThunk<Album, string, { rejectValue: GlobalError; state: RootState }>(
    'albums/fetchTogglePublished',
    async (id, { rejectWithValue }) => {
        try {
            const { data: album } = await axiosApi.patch<Album>(`/albums/${id}/togglePublished`);
            return album;
        } catch (e) {
            if (isAxiosError(e) && e.response) {
                return rejectWithValue(e.response.data);
            }
            throw e;
        }
    }
);

export const deleteAlbum = createAsyncThunk<Album, string, { rejectValue: GlobalError; state: RootState }>(
    'albums/fetchDelete',
    async (id, { rejectWithValue }) => {
        try {
            const { data: album } = await axiosApi.delete<Album>(`/albums/${id}`);
            return album;
        } catch (e) {
            if (isAxiosError(e) && e.response) {
                return rejectWithValue(e.response.data);
            }
            throw e;
        }
    }
);

export const createAlbum = createAsyncThunk<void, AlbumMutation, { rejectValue: GlobalError; state: RootState }>(
    'albums/create',
    async (albumMutation, { getState, rejectWithValue }) => {

        const token = getState().users.user?.token;

        if (!token) {
            return rejectWithValue({ error: 'User token is missing' });
        }

        const formData = new FormData();
        const keys = Object.keys(albumMutation) as (keyof AlbumMutation)[];
        keys.forEach((key) => {
            const value = albumMutation[key];
            if (value !== null) {
                formData.append(key, value);
            }
        });

        try {
            await axiosApi.post('/albums', formData);
        } catch (e) {
            if (isAxiosError(e) && e.response) {
                return rejectWithValue(e.response.data);
            }
            throw e;
        }
    }
);