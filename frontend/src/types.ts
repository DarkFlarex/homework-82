export interface Artist {
    _id: string;
    name: string;
    image:string | null;
    information: string;
}

export interface ArtistMutation {
    name: string;
    image:string | null;
    information: string;
}

export interface Album {
    _id: string;
    artist: {
        name: string;
    };
    nameAlbum: string;
    datetime: number;
    image: string | null;
}

export interface AlbumMutation {
    artist: string;
    nameAlbum: string;
    image: string | null;
    datetime: string;
}

export interface Track {
    _id: string;
    album: {
        _id: string;
        nameAlbum: string;
    };
    nameTrack: string;
    duration: string;
    numberTrack: number;
}

export interface User {
    _id: string;
    username: string;
    token: string;
    role: string;
}

export interface RegisterMutation {
    username: string;
    password: string;
}

export interface LoginMutation {
    username: string;
    password: string;
}

export interface ValidationError {
    errors: {
        [key: string]: {
            name: string;
            message: string;
        };
    };
    message: string;
    name: string;
    _message: string;
}

export interface GlobalError {
    error: string;
}

export interface TrackHistory {
    _id: string;
    trackListened: {
        artist: {
            name: string;
        };
        nameTrack: string;
    };
    datetime: string;
}

export interface TrackHistoryMutation {
    track: string;
}