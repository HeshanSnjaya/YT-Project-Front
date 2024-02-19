import { useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { SideBar, Videos, Subscribe } from "./";
import Slot1 from "./Slot1";
import Slot2 from "./Slot2";
import Slot3 from "./Slot3";
import Slot4 from "./Slot4";
import Archived from "./Archived";

const Feed = () => {
  const [selectedCategory, setSelectedCategory] = useState("New Videos");

  return (
    <Stack sx={{ flexDirection: { sx: "column", md: "row" } }}>
      <Box
        sx={{
          height: { sx: "auto", md: "92vh" },
          borderRight: "1px solid #3d3d3d",
          px: { sx: 0, md: 2 },
        }}
      >
        <SideBar
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <Typography
          className="copyright"
          variant="body2"
          sx={{ mt: 1.5, color: "#fff" }}
        >
          Copyright © 2024 YouTube Demo
        </Typography>
      </Box>

      <Box p={2} sx={{ overflowY: "auto", height: "90vh", flex: 2 }}>
        <Typography
          variant="h4"
          fontWeight="bold"
          mb={2}
          sx={{ color: "white" }}
        >
          {selectedCategory}
        </Typography>
        {/* <div>
          {selectedCategory === "New Videos" ? (
            <Videos />
          ) : (
            selectedCategory === "Subscribe" && <Subscribe />
          )}
        </div> */}
        <div>
          {selectedCategory === "New Videos" && <Videos />}
          {selectedCategory === "Subscribe" && <Subscribe />}
          {selectedCategory === "Slot 1" && <Slot1 />}
          {selectedCategory === "Slot 2" && <Slot2 />}
          {selectedCategory === "Slot 3" && <Slot3 />}
          {selectedCategory === "Slot 4" && <Slot4 />}
          {selectedCategory === "Archived Videos" && <Archived />}
        </div>
      </Box>
    </Stack>
  );
};

export default Feed;
