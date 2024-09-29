import React from "react";
import {Card, CardContent, CardHeader, CardMedia, Grid, styled, Typography} from "@mui/material";
import { API_URL } from "../../../constants";
import { Link } from "react-router-dom";
import imageNotFound from '/src/assets/images/image-not-found.png';
import {useAppSelector} from "../../../app/hooks";
import {selectUser} from "../../users/usersSlice";

const ImageCardMedia = styled(CardMedia)({
    height: 0,
    paddingTop: '56.25%',
});

const StyledLink = styled(Link)({
    color: 'inherit',
    textDecoration: 'none',
});

interface Props {
    _id: string;
    artist: {
        name: string;
    };
    nameAlbum: string;
    image: string | null;
    datetime: number;
    isPublished: boolean;
}

const AlbumItem: React.FC<Props> = ({ _id, artist, nameAlbum, image, datetime,isPublished }) => {
    const user = useAppSelector(selectUser);
    let cardImage = imageNotFound;

    if (image) {
        cardImage = `${API_URL}/${image}`;
    }
    return (
        <Grid item sx={{ width: '300px' }}>
            <StyledLink to={`/tracks/${_id}`}>
                <Card sx={{ height: '100%' }}>
                    <CardHeader title={artist.name}  />
                    <ImageCardMedia image={cardImage} title={nameAlbum} />
                    <CardContent>
                        <span>{nameAlbum}</span>
                        <span>: {datetime}.г</span>
                    </CardContent>
                    {user && user.role ==='admin' &&(
                        <CardContent>
                            <Typography
                                variant="caption"
                                sx={{color: isPublished ? 'green' : 'red' }}
                            >
                                {isPublished ? "опубликовано" : "неопубликовано"}
                            </Typography>
                        </CardContent>
                    )}
                </Card>
            </StyledLink>
        </Grid>
    );
};

export default AlbumItem;
