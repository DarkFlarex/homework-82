import React from 'react';
import imageNotFound from '/src/assets/images/image-not-found.png';
import {API_URL} from "../../../constants";
import {Card, CardContent, CardHeader, CardMedia, Grid, styled, Typography} from "@mui/material";
import {Link} from "react-router-dom";
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
    _id:string;
    name: string;
    image: string |null;
    isPublished: boolean;
}

const ArtistsItem:React.FC<Props> = ({_id, name,image,isPublished}) => {
    const user = useAppSelector(selectUser);
    let cardImage = imageNotFound;

    if (image) {
        cardImage = `${API_URL}/${image}`;
    }
    return (
        <Grid item sx={{ width: '300px' }}>
            <StyledLink to={`/albums/${_id}`}>
                <Card sx={{ height: '100%' }}>
                    <CardHeader title={name} />
                    <ImageCardMedia image={cardImage} title={name} />
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

export default ArtistsItem;