import './App.css'
import {Container, Typography} from "@mui/material";
import {Route, Routes} from "react-router-dom";
import Artists from "./features/artists/Artists";
import Albums from "./features/albums/Albums";
import Tracks from "./features/tracks/Tracks";

const App =() => {

  return (
    <>
      <header>

      </header>
      <Container maxWidth="xl" component="main">
        <Routes>
            <Route path="/" element={<Artists />} />
            <Route path="/tracks/:id" element={<Tracks />} />
            <Route path="/albums/:id" element={<Albums />} />
            <Route path="*" element={<Typography variant="h1">Not found</Typography>} />
        </Routes>
      </Container>
    </>
  )
}

export default App
