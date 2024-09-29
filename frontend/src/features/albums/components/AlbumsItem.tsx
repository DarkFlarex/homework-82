import React, {useCallback} from "react";
import {Button, Card, CardContent, CardHeader, CardMedia, Grid, IconButton, styled} from "@mui/material";
import { API_URL } from "../../../constants";
import {Link, useParams} from "react-router-dom";
import imageNotFound from '/src/assets/images/image-not-found.png';
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {selectUser} from "../../users/usersSlice";
import {deleteAlbum, fetchAlbumsOneArtist, fetchTogglePublishedAlbums} from "../albumsThunks";
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
    const dispatch = useAppDispatch();
    const { id } = useParams() as { id: string };
    const user = useAppSelector(selectUser);
    let cardImage = imageNotFound;

    if (image) {
        cardImage = `${API_URL}/${image}`;
    }

    const handlePublishToggleAlbum = useCallback(async () => {
        try {
            await dispatch(fetchTogglePublishedAlbums(_id)).unwrap();
            await dispatch(fetchAlbumsOneArtist(id)).unwrap();
        } catch (error) {
            console.error('Toggling publish status Album error:', error);
        }
    }, [dispatch, _id, id ]);

    const handleDelete = async () => {
        if (window.confirm(`Are you sure you want to delete this "${nameAlbum}"?`)) {
            try {
                await dispatch(deleteAlbum(_id)).unwrap();
                await dispatch(fetchAlbumsOneArtist(id)).unwrap();
            } catch (error) {
                console.error('Delete album error: ', error);
            }
        }
    };

    return (
        <Grid item sx={{ width: '300px' }}>
            <Card sx={{ height: '100%' }}>
                <StyledLink to={`/tracks/${_id}`}>
                        <CardHeader title={artist.name}  />
                        <ImageCardMedia image={cardImage} title={nameAlbum} />
                        <CardContent>
                            <span>{nameAlbum}</span>
                            <span>: {datetime}.г</span>
                        </CardContent>
                </StyledLink>
                {user && user.role === 'admin' && (
                    <Grid container spacing={1} alignItems="center" justifyContent="space-between" sx={{ padding: 2 }}>
                        <Grid item>
                            <Button
                                sx={{ color: isPublished ? 'green' : 'red' }}
                                onClick={handlePublishToggleAlbum}
                            >
                                {isPublished ? "опубликовано" : "неопубликовано"}
                            </Button>
                        </Grid>

                        <Grid item>
                            <IconButton aria-label="delete" onClick={handleDelete}>
                                <h6 style={{ margin: 0 }}>Delete Album</h6> <DeleteIcon fontSize="inherit" />
                            </IconButton>
                        </Grid>
                    </Grid>
                )}
            </Card>
        </Grid>
    );
};

export default AlbumItem;
