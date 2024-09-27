import {createAsyncThunk} from "@reduxjs/toolkit";
import { GlobalError, Track, TrackMutation} from "../../types";
import axiosApi from "../../axiosApi";
import {RootState} from "../../app/store";
import {isAxiosError} from "axios";

export const fetchTracksOneAlbum = createAsyncThunk<Track[], string>(
    'tracks/fetchAll',
    async (id) => {
        const {data: tracks} = await axiosApi.get<Track[]>(`/tracks?album=${id}`);
        return tracks;
    }
);

export const createTrack = createAsyncThunk<Track, TrackMutation, { rejectValue: GlobalError; state: RootState }>(
    'tracks/create',
    async (trackMutation, { getState, rejectWithValue }) => {
        const token = getState().users.user?.token;

        if (!token) {
            return rejectWithValue({ error: 'Токен пользователя отсутствует' });
        }

        try {
            const { data:track } = await axiosApi.post('/tracks', trackMutation);
            return track;
        } catch (e) {
            if (isAxiosError(e) && e.response) {
                return rejectWithValue(e.response.data);
            }
            throw e;
        }
    }
);