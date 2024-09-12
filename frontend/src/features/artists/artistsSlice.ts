import {Artist} from "../../types";
import {createSlice} from "@reduxjs/toolkit";
import {fetchArtists} from "./artistsThunks";


export interface ArtistsState {
    items: Artist[];
    itemsFetching: boolean;
}

const initialState: ArtistsState = {
    items: [],
    itemsFetching: false,
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
    },
    selectors:{
        selectArtists:(state)=>state.items,
        selectArtistsFetching:(state) =>state.itemsFetching,
    }
});

export const artistsReducer = artistsSlice.reducer;

export const {
    selectArtists,
    selectArtistsFetching,
} = artistsSlice.selectors;

