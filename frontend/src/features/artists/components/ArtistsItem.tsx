import React from 'react';
import imageNotFound from '/src/assets/images/image-not-found.png';
import {API_URL} from "../../../constants";
import {Card, CardContent, CardHeader, CardMedia, Grid, styled} from "@mui/material";
import {Link} from "react-router-dom";

const ImageCardMedia = styled(CardMedia)({
    height: 0,
    paddingTop: '56.25%',
});

interface Props {
    _id:string;
    name: string;
    image: string |null;
    information: string;
}

const ArtistsItem:React.FC<Props> = ({_id, name,image,information}) => {
    let cardImage = imageNotFound;

    if (image) {
        cardImage = `${API_URL}/${image}`;
    }
    return (
        <Grid item sx={{ width: '300px' }} component={Link} to={`/products/${_id}`}>
            <Card sx={{ height: '100%' }}>
                <CardHeader title={name} />
                <ImageCardMedia image={cardImage} title={name} />
                <CardContent>
                    <p>{information}</p>
                </CardContent>
            </Card>
        </Grid>
    );
};

export default ArtistsItem;