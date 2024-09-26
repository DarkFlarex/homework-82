import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectAlbumCreating} from "./albumsSlice";
import {AlbumMutation} from "../../types";
import {createAlbum} from "./albumsThunks";
import {Typography} from "@mui/material";
import AlbumForm from "./components/AlbumForm";

const NewAlbum = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const isCreating = useAppSelector(selectAlbumCreating);

    const onFormSubmit = async (albumMutation: AlbumMutation) => {
        try {
            await dispatch(createAlbum(albumMutation));
            navigate('/');
        } catch (error) {
            console.error('Create albums error:', error);
        }
    };
    return (
        <>
            <Typography variant="h4" sx={{ mb: 2 }}>
                New Albums
            </Typography>
            <AlbumForm onSubmit={onFormSubmit} isLoading={isCreating}/>
        </>
    );
};

export default NewAlbum;