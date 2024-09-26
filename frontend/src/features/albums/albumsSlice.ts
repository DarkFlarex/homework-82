import {Album, GlobalError} from "../../types";
import {createSlice} from "@reduxjs/toolkit";
import {createAlbum, fetchAlbumsOneArtist} from "./albumsThunks";

export interface AlbumsState {
    items: Album[];
    itemsFetching: boolean;
    artistName: string | null;
    isCreating: boolean;
    isCreatingError: GlobalError | null;
}

const initialState: AlbumsState = {
    items: [],
    artistName: null,
    itemsFetching: false,
    isCreating: false,
    isCreatingError: null,
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
                state.artistName = albums.length > 0 ? albums[0].artist.name : null;
            })
            .addCase(fetchAlbumsOneArtist.rejected, (state) => {
                state.itemsFetching = false;
            });
        builder
            .addCase(createAlbum.pending, (state) => {
                state.isCreating = true;
                state.isCreatingError = null;
            })
            .addCase(createAlbum.fulfilled, (state) => {
                state.isCreating = false;
            })
            .addCase(createAlbum.rejected, (state, { payload: error }) => {
                state.isCreating = false;
                state.isCreatingError = error || null;
            });
    },
    selectors:{
        selectAlbums:(state) => state.items,
        selectAlbumsFetching:(state) =>state.itemsFetching,
        selectArtistName:(state) => state.artistName,
        selectAlbumCreating:(state) => state.isCreating,
        selectAlbumCreateError:(state) => state.isCreatingError,
    }
});

export const albumsReducer = albumsSlice.reducer;

export const {
    selectAlbums,
    selectAlbumsFetching,
    selectArtistName,
    selectAlbumCreating,
} = albumsSlice.selectors;
