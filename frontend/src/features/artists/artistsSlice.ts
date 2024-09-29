import {Artist, GlobalError} from "../../types";
import {createSlice} from "@reduxjs/toolkit";
import {createArtist, deleteArtist, fetchArtists} from "./artistsThunks";

export interface ArtistsState {
    items: Artist[];
    itemsFetching: boolean;
    isCreating: boolean;
    isCreatingError: GlobalError | null;
    deleteLoading: string | false;
}

const initialState: ArtistsState = {
    items: [],
    itemsFetching: false,
    isCreating: false,
    isCreatingError: null,
    deleteLoading:false,
};

export const artistsSlice = createSlice({
    name: "artists",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchArtists.pending,(state) =>{
                state.itemsFetching = true;
            })
            .addCase(fetchArtists.fulfilled,(state,{payload: artists}) =>{
                state.itemsFetching = false;
                state.items = artists;
            })
            .addCase(fetchArtists.rejected, (state) => {
                state.itemsFetching = false;
            });
        builder
            .addCase(createArtist.pending, (state) => {
                state.isCreating = true;
                state.isCreatingError = null;
            })
            .addCase(createArtist.fulfilled, (state) => {
                state.isCreating = false;
            })
            .addCase(createArtist.rejected, (state, { payload: error }) => {
                state.isCreating = false;
                state.isCreatingError = error || null;
            });
        builder
            .addCase(deleteArtist.pending, (state, { meta: { arg: trackId } }) => {
                state.deleteLoading = trackId;
            })
            .addCase(deleteArtist.fulfilled, (state) => {
                state.deleteLoading = false;
            })
            .addCase(deleteArtist.rejected, (state) => {
                state.deleteLoading = false;
            });
    },
    selectors:{
        selectArtists:(state)=>state.items,
        selectArtistsFetching:(state) =>state.itemsFetching,
        selectArtistCreate:(state) => state.isCreating,
        selectArtistCreateError:(state) => state.isCreatingError,
        selectDeleteArtistLoading: (state) => state.deleteLoading,
    },
});

export const artistsReducer = artistsSlice.reducer;

export const {
    selectArtists,
    selectArtistsFetching,
    selectArtistCreate,
} = artistsSlice.selectors;

