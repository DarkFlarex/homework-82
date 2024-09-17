import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi";
import { RootState } from "../../app/store";
import { GlobalError, TrackHistory, TrackHistoryMutation } from "../../types";
import { isAxiosError } from "axios";

export const addTrackToHistory = createAsyncThunk<TrackHistory, TrackHistoryMutation, { rejectValue: GlobalError, state: RootState }>(
    'track_history/addTrackToHistory',
    async (trackHistoryMutation, { getState, rejectWithValue }) => {
        const token = getState().users.user?.token;

        if (!token) {
            return rejectWithValue({ error: 'User token is missing' });
        }

        try {
            const { data: trackHistory } = await axiosApi.post<TrackHistory>(
                '/track_history',trackHistoryMutation,{ headers: { 'Authorization': `Bearer ${token}` } }
            );
            return trackHistory;
        } catch (e) {
            if (isAxiosError(e) && e.response) {
                return rejectWithValue(e.response.data);
            }
            throw e;
        }
    }
);





