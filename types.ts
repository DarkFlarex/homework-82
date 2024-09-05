import {Model} from "mongoose";

export type ArtistMutation = {
    name:string;
    image:string | null ;
    information: string;
}

export type AlbumMutation = {
    artist: string;
    nameAlbum: string;
    datetime: string;
    image: string | null;
};

export type TrackMutation = {
    album:string;
    nameTrack:string;
    duration:string;
};

export interface UserFields {
    username: string;
    password: string;
    token:string;
}

export interface UserMethods {
    checkPassword(password: string): Promise<boolean>;
    generateToken(): void;
}

export type UserModel = Model<UserFields, {}, UserMethods>;