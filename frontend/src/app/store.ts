import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {artistsReducer} from "../features/artists/artistsSlice";
import {albumsReducer} from "../features/albums/albumsSlice";
import {tracksReducer} from "../features/tracks/tracksSlice";
import {usersReducer} from "../features/users/usersSlice";
import storage from "redux-persist/lib/storage";
import {TrackHistoriesReducer} from "../features/TrackHistory/trackHistorySlice";
import { persistReducer, FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistStore } from 'redux-persist';

const usersPersistConfig = {
  key: 'music:users',
  storage,
  whitelist: ['user']
};

const trackHistoryPersistConfig = {
  key: 'music:trackHistory',
  storage,
  whitelist: ['items']
};

const rootReducer = combineReducers({
  artists: artistsReducer,
  albums: albumsReducer,
  tracks: tracksReducer,
  trackHistory: persistReducer(trackHistoryPersistConfig, TrackHistoriesReducer),
  users: persistReducer(usersPersistConfig, usersReducer),
});

export const store = configureStore({
  reducer: rootReducer,
  middleware:(getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck:{
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE,REGISTER],
      }
    });
  },
});
export const persistor = persistStore(store);


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
