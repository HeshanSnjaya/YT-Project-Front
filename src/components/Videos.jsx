import React, { useEffect, useState } from "react";
import {
  Typography,
  CardMedia,
  Stack,
  CardContent,
  Button,
} from "@mui/material";

// export default VideosPage;
const VideosPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNotifications = async () => {
    try {
      const response = await fetch(
        "https://ytbackend-jftb.onrender.com/api/v1/notification"
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching notifications:", error);
      throw error; // rethrow the error to propagate it further if needed
    }
  };

  useEffect(() => {
    const loadNotifications = async () => {
      try {
        const data = await fetchNotifications();
        setNotifications(data);
      } finally {
        setLoading(false);
      }
    };

    loadNotifications();
  }, []);

  const getImageUrl = (videoId) =>
    `https://i3.ytimg.com/vi/${videoId}/hqdefault.jpg`;

  const getVideoUrl = (videoId) => `https://www.youtube.com/watch?v=${videoId}`;

  return (
    <Stack direction="column" spacing={2}>
      {loading ? (
        <Typography variant="body2" color="white">
          Loading...
        </Typography>
      ) : (
        notifications.map((notification) => (
          <div key={notification.notificationId}>
            <Stack direction="row" spacing={2}>
              <CardMedia
                component="img"
                sx={{ width: 480, height: 360 }}
                image={getImageUrl(notification.videoId)}
                alt={notification.videoTitle}
              />
              <CardContent>
                <br />
                <br />
                <Typography variant="body2" color="white">
                  Channel Id: {notification.channelId}
                  <br />
                  Video Id: {notification.videoId}
                  <br />
                  Published DateTime : {notification.publishedDateTime}
                  <br />
                  UpdatedDateTime : {notification.updatedDateTime}
                  <br />
                  Tracked Time : {notification.trackedTime}
                  <br />
                  <br />
                  <Button
                    variant="contained"
                    style={{ backgroundColor: "red", color: "white" }}
                    onClick={() =>
                      window.open(getVideoUrl(notification.videoId), "_blank")
                    }
                  >
                    Watch Video
                  </Button>
                  <br />
                  <br />
                </Typography>
              </CardContent>
            </Stack>
          </div>
        ))
      )}
    </Stack>
  );
};

export default VideosPage;
