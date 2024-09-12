import {Album} from "../../types";
import {createSlice} from "@reduxjs/toolkit";
import {fetchAlbumsOneArtist} from "./albumsThunks";

export interface AlbumsState {
    items: Album[];
    itemsFetching: boolean;
    artistName: string | null;
}

const initialState: AlbumsState = {
    items: [],
    artistName: null,
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
                state.artistName = albums[0].artist.name;
            })
            .addCase(fetchAlbumsOneArtist.rejected, (state) => {
                state.itemsFetching = false;
            });
    },
    selectors:{
        selectAlbums:(state) => state.items,
        selectAlbumsFetching:(state) =>state.itemsFetching,
        selectArtistName:(state) => state.artistName,

    }
});

export const albumsReducer = albumsSlice.reducer;

export const {
    selectAlbums,
    selectAlbumsFetching,
    selectArtistName,
} = albumsSlice.selectors;
