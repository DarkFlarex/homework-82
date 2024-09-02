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