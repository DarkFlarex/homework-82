import {createAsyncThunk} from "@reduxjs/toolkit";
import { Track} from "../../types";
import axiosApi from "../../axiosApi";

export const fetchTracksOneAlbum = createAsyncThunk<Track[], string>(
    'tracks/fetchAll',
    async (id) => {
        const {data: tracks} = await axiosApi.get<Track[]>(`/tracks?album=${id}`);
        return tracks;
    }
);