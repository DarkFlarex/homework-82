import {Container, Typography} from "@mui/material";
import {Route, Routes} from "react-router-dom";
import Artists from "./features/artists/Artists";
import Albums from "./features/albums/Albums";
import Tracks from "./features/tracks/Tracks";
import AppToolbar from "./UI/AppToolbar/AppToolbar";
import Register from "./features/users/Register";
import Login from "./features/users/login";
import TrackHistories from "./features/TrackHistory/TrackHistories";
import ProtectedRoute from "./UI/ProtectedRoute/ProtectedRoute";
import {useAppSelector} from "./app/hooks";
import {selectUser} from "./features/users/usersSlice";

const App =() => {
    const user = useAppSelector(selectUser);
  return (
    <>
      <header>
        <AppToolbar/>
      </header>
      <Container maxWidth="xl" component="main">
        <Routes>
            <Route path="/" element={<Artists />} />
            <Route path="/tracks/:id" element={<Tracks />} />
            <Route path="/albums/:id" element={<Albums />} />
            <Route path="/register" element={<Register/>} />
            <Route path="/login" element={<Login/>} />
            <Route
                path="/track_history"
                element={
                    <ProtectedRoute isAllowed={user && user.role === 'admin'}>
                        <TrackHistories />
                    </ProtectedRoute>
            }
            />
            <Route path="*" element={<Typography variant="h1">Not found</Typography>} />
        </Routes>
      </Container>
    </>
  )
}

export default App
