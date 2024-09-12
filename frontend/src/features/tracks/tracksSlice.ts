import { Track} from "../../types";
import {createSlice} from "@reduxjs/toolkit";
import {fetchTracksOneAlbum} from "./tracksThunks";

export interface ArtistsState {
    items: Track[];
    itemsFetching: boolean;
    albumName: string | null;
}

const initialState: ArtistsState = {
    items: [],
    itemsFetching: false,
    albumName: null,
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
                state.albumName = tracks[0].album.nameAlbum;
            })
            .addCase(fetchTracksOneAlbum.rejected, (state) => {
                state.itemsFetching = false;
            });
    },
    selectors:{
        selectTracks:(state) => state.items,
        selectTracksFetching:(state) => state.itemsFetching,
        selectAlbumName:(state) => state.albumName,
    }
});

export const tracksReducer = tracksSlice.reducer;

export const {
    selectTracks,
    selectTracksFetching,
    selectAlbumName,
} = tracksSlice.selectors;