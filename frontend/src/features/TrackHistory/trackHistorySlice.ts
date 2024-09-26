import {GlobalError, TrackHistory} from "../../types";
import {createSlice} from "@reduxjs/toolkit";
import {addTrackToHistory, fetchTrackHistories} from "./trackHistoryThunks";

interface TrackHistoryState {
    items: TrackHistory[];
    itemsFetching: boolean;
    trackHistoryLoading: boolean;
    trackHistoryError: GlobalError | null;
}

const initialState: TrackHistoryState = {
    items: [],
    itemsFetching: false,
    trackHistoryLoading: false,
    trackHistoryError: null,
};

export const trackHistorySlice = createSlice({
    name: "trackHistory",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTrackHistories.pending, (state) => {
                state.itemsFetching = true;
            })
            .addCase(fetchTrackHistories.fulfilled, (state, { payload: trackHistory }) => {
                state.itemsFetching = false;
                state.items = trackHistory;
            })
            .addCase(fetchTrackHistories.rejected, (state) => {
                state.itemsFetching = false;
            })
            .addCase(addTrackToHistory.pending, (state) => {
                state.trackHistoryLoading = true;
                state.trackHistoryError = null;
            })
            .addCase(addTrackToHistory.fulfilled, (state) => {
                state.trackHistoryLoading = false;
            })
            .addCase(addTrackToHistory.rejected, (state, { payload: error }) => {
                state.trackHistoryLoading = false;
                state.trackHistoryError = error || null;
            });
    },
    selectors: {
        selectTrackHistories: (state) => state.items,
        selectTrackHistoriesFetching: (state) => state.itemsFetching,
        selectAddTrackHistoriesLoading: (state) => state.trackHistoryLoading,
        selectAddTrackHistoriesError: (state) => state.trackHistoryError,
    },
});

export const TrackHistoriesReducer = trackHistorySlice.reducer;

export const {
    selectTrackHistories,
    selectTrackHistoriesFetching,
}=trackHistorySlice.selectors;