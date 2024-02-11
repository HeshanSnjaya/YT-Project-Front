import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";
import { Navbar, Feed, Videos, Subscribe } from "./components";

const App = () => (
  <BrowserRouter>
    <Box sx={{ backgroundColor: "#000" }}>
      <Navbar />
      <Feed />
      <Routes>
        <Route path="/new%20videos" exact element={<Videos />} />
        <Route path="/subscribe" exact element={<Subscribe />} />
      </Routes>
    </Box>
  </BrowserRouter>
);

export default App;
