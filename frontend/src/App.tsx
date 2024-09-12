import './App.css'
import {Container, Typography} from "@mui/material";
import {Route, Routes} from "react-router-dom";
import Artists from "./features/artists/Artists";
import Albums from "./features/albums/Albums";

const App =() => {

  return (
    <>
      <header>

      </header>
      <Container maxWidth="xl" component="main">
        <Routes>
            <Route path="/albums/:id" element={<Albums />} />
            <Route path="/" element={<Artists />} />
            <Route path="*" element={<Typography variant="h1">Not found</Typography>} />
        </Routes>
      </Container>
    </>
  )
}

export default App
