import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectTrackCreating} from "./tracksSlice";
import {TrackMutation} from "../../types";
import {createTrack} from "./tracksThunks";
import {Typography} from "@mui/material";
import TrackForm from "./components/TrackForm";

const NewTrack = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const isCreating = useAppSelector(selectTrackCreating);

    const onFormSubmit = async (trackMutation: TrackMutation) => {
        try{
            await dispatch(createTrack(trackMutation));
            navigate('/');
        } catch (error){
            console.error('Create tracks error:', error);
        }
    };
    return (
        <>
            <Typography variant="h4" sx={{ mb: 2 }}>
                New Tracks
            </Typography>
            <TrackForm onSubmit={onFormSubmit} isLoading={isCreating}/>
        </>
    );
};

export default NewTrack;