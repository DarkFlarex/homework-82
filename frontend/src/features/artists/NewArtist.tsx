import {useAppSelector} from "../../app/hooks";
import {selectArtistCreate} from "./artistsSlice";
import {Typography} from "@mui/material";
import ArtistForm from "./components/ArtistForm";

const NewArtist = () => {
    const isCreating = useAppSelector(selectArtistCreate);
    return (
        <>
            <Typography variant="h4" sx={{ mb: 2 }}>
                New Artist
            </Typography>
            <ArtistForm isLoading={isCreating}/>
        </>
    );
};

export default NewArtist;