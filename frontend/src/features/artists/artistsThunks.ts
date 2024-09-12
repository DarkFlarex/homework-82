import {createAsyncThunk} from "@reduxjs/toolkit";
import {Artist} from "../../types";
import axiosApi from "../../axiosApi";

export const fetchArtists = createAsyncThunk (
    'artists/fetchAll', async ()=>{
    const {data: artists} = await axiosApi.get<Artist[]>('/artists');
    return artists;
});