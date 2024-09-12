import {Album} from "../../types";
import {createSlice} from "@reduxjs/toolkit";
import {fetchAlbumsOneArtist} from "./albumsThunks";

export interface AlbumsState {
    items: Album[];
    itemsFetching: boolean;
}

const initialState: AlbumsState = {
    items: [],
    itemsFetching: false,
};

export const albumsSlice = createSlice({
    name: "albums",
    initialState,
    reducers:{},
    extraReducers:(builder) => {
        builder
            .addCase(fetchAlbumsOneArtist.pending,(state)=>{
                state.itemsFetching = true;
            })
            .addCase(fetchAlbumsOneArtist.fulfilled,(state,{payload:albums})=>{
                state.itemsFetching = false;
                state.items = albums;
            })
            .addCase(fetchAlbumsOneArtist.rejected, (state) => {
                state.itemsFetching = false;
            });
    },
    selectors:{
        selectAlbums:(state) => state.items,
        selectAlbumsFetching:(state) =>state.itemsFetching,
    }
});

export const AlbumsReducer = albumsSlice.reducer;

export const {
    selectAlbums,
    selectAlbumsFetching,
} = albumsSlice.selectors;
