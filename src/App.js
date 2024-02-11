import { BrowserRouter } from "react-router-dom";
import { Box } from "@mui/material";
import { Navbar, Feed } from "./components";

const App = () => (
  <BrowserRouter>
    <Box sx={{ backgroundColor: "#000" }}>
      <Navbar />
      <Feed />
    </Box>
  </BrowserRouter>
);

export default App;
