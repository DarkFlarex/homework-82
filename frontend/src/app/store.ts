import { configureStore } from '@reduxjs/toolkit';
import {artistsReducer} from "../features/artists/artistsSlice";
import {AlbumsReducer} from "../features/albums/albumsSlice";

export const store = configureStore({
  reducer: {
    artists:artistsReducer,
    albums:AlbumsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
