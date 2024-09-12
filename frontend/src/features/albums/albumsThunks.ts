import {createAsyncThunk} from "@reduxjs/toolkit";
import {Album} from "../../types";
import axiosApi from "../../axiosApi";


export const fetchAlbumsOneArtist = createAsyncThunk<Album[], string>(
    'albums/fetchAll',
    async (id) => {
        const {data: albums} = await axiosApi.get<Album[]>(`/albums?artist=${id}`);
        return albums;
    }
);
