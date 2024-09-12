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