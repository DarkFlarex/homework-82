import React, {useCallback} from 'react';
import imageNotFound from '/src/assets/images/image-not-found.png';
import {API_URL} from "../../../constants";
import {Button, Card, CardHeader, CardMedia, Grid, IconButton, styled} from "@mui/material";
import {Link} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {selectUser} from "../../users/usersSlice";
import {deleteArtist, fetchArtists, fetchTogglePublishedArtist} from "../artistsThunks";
import DeleteIcon from "@mui/icons-material/Delete";

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
    const dispatch = useAppDispatch();
    const user = useAppSelector(selectUser);
    let cardImage = imageNotFound;

    if (image) {
        cardImage = `${API_URL}/${image}`;
    }

    const handlePublishToggleArtist = useCallback(async () => {
        try {
            await dispatch(fetchTogglePublishedArtist(_id)).unwrap();
            await dispatch(fetchArtists()).unwrap();
        } catch (error) {
            console.error('Toggling publish status Artist error:', error);
        }
    }, [dispatch, _id ]);

    const handleDelete = async () => {
        if (window.confirm(`Are you sure you want to delete this "${name}"?`)) {
            try {
                await dispatch(deleteArtist(_id)).unwrap();
                await dispatch(fetchArtists()).unwrap();
            } catch (error) {
                console.error('Delete artist error: ', error);
            }
        }
    };
    return (
        <Grid item sx={{ width: '330px' }}>
            <Card sx={{ height: '100%' }}>
            <StyledLink to={`/albums/${_id}`}>
                <CardHeader title={name} />
                <ImageCardMedia image={cardImage} title={name} />
            </StyledLink>
            {user && user.role === 'admin' && (
            <Grid container spacing={1} alignItems="center" justifyContent="space-between" sx={{ padding: 2 }}>
                <Grid item>
                    <Button
                        sx={{ color: isPublished ? 'green' : 'red' }}
                        onClick={handlePublishToggleArtist}
                    >
                        {isPublished ? "опубликовано" : "неопубликовано"}
                    </Button>
                </Grid>

                <Grid item>
                    <IconButton aria-label="delete" onClick={handleDelete}>
                        <h6 style={{ margin: 0 }}>Delete Artist</h6> <DeleteIcon fontSize="inherit" />
                    </IconButton>
                </Grid>
            </Grid>
                )}
            </Card>
        </Grid>
    );
};

export default ArtistsItem;