export interface Artist {
    _id: string;
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

export interface Track {
    album: {
        nameAlbum: string;
    };
    nameTrack:string;
    duration:string;
    numberTrack:number;
}