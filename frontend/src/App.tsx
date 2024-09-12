import './App.css'
import {Container, Typography} from "@mui/material";
import {Route, Routes} from "react-router-dom";
import Artists from "./features/artists/Artists";

const App =() => {

  return (
    <>
      <header>

      </header>
      <Container maxWidth="xl" component="main">
        <Routes>
            <Route path="/" element={<Artists />} />
            <Route path="*" element={<Typography variant="h1">Not found</Typography>} />
        </Routes>
      </Container>
    </>
  )
}

export default App
