// AlbumItem.tsx
import React from "react";
import { Card, CardContent, CardHeader, CardMedia, Grid, styled } from "@mui/material";
import { API_URL } from "../../../constants";
import { Link } from "react-router-dom";
import imageNotFound from '/src/assets/images/image-not-found.png';

const ImageCardMedia = styled(CardMedia)({
    height: 0,
    paddingTop: '56.25%',
});

interface Props {
    _id: string;
    artist: {
        name: string;
    };
    nameAlbum: string;
    image: string | null;
    datetime: number;
}

const AlbumItem: React.FC<Props> = ({ _id, artist, nameAlbum, image, datetime }) => {
    let cardImage = imageNotFound;

    if (image) {
        cardImage = `${API_URL}/${image}`;
    }

    return (
        <Grid item sx={{ width: '300px' }}>
            <Card sx={{ height: '100%' }} component={Link} to={`/tracks/${_id}`}>
                <CardHeader title={artist.name}  />
                <ImageCardMedia image={cardImage} title={nameAlbum} />
                <CardContent>
                    <span>{nameAlbum}</span>
                    <span>: {datetime}.г</span>
                </CardContent>
            </Card>
        </Grid>
    );
};

export default AlbumItem;
