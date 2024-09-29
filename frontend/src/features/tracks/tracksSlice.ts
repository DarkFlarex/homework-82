import {GlobalError, Track} from "../../types";
import {createSlice} from "@reduxjs/toolkit";
import {createTrack, deleteTrack, fetchTracksOneAlbum} from "./tracksThunks";

export interface ArtistsState {
    items: Track[];
    itemsFetching: boolean;
    albumName: string | null;
    isCreating: boolean;
    isCreatingError: GlobalError | null;
    deleteLoading: string | false;
}

const initialState: ArtistsState = {
    items: [],
    itemsFetching: false,
    albumName: null,
    isCreating: false,
    isCreatingError: null,
    deleteLoading:false,
};

export const tracksSlice = createSlice({
    name: 'tracks',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
            .addCase(fetchTracksOneAlbum.pending, (state) => {
                state.itemsFetching = true;
            })
            .addCase(fetchTracksOneAlbum.fulfilled, (state, { payload: tracks }) => {
                state.itemsFetching = false;
                state.items = tracks;
                state.albumName = tracks.length > 0 ? tracks[0].album.nameAlbum : null;
            })
            .addCase(fetchTracksOneAlbum.rejected, (state) => {
                state.itemsFetching = false;
            });
        builder
            .addCase(createTrack.pending, (state) => {
                state.isCreating = true;
                state.isCreatingError = null;
            })
            .addCase(createTrack.fulfilled, (state) => {
                state.isCreating = false;
            })
            .addCase(createTrack.rejected, (state, { payload: error }) => {
                state.isCreating = false;
                state.isCreatingError = error || null;
            });
        builder
            .addCase(deleteTrack.pending, (state, { meta: { arg: trackId } }) => {
                state.deleteLoading = trackId;
            })
            .addCase(deleteTrack.fulfilled, (state) => {
                state.deleteLoading = false;
            })
            .addCase(deleteTrack.rejected, (state) => {
                state.deleteLoading = false;
            });
    },
    selectors:{
        selectTracks:(state) => state.items,
        selectTracksFetching:(state) => state.itemsFetching,
        selectAlbumName:(state) => state.albumName,
        selectTrackCreating:(state) => state.isCreating,
        selectTrackCreateError:(state) => state.isCreatingError,
        selectDeleteTrackLoading: (state) => state.deleteLoading,
    }
});

export const tracksReducer = tracksSlice.reducer;

export const {
    selectTracks,
    selectTracksFetching,
    selectAlbumName,
    selectTrackCreating,
} = tracksSlice.selectors;