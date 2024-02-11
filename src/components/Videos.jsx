import React, { useEffect, useState } from "react";
import {
  Typography,
  CardMedia,
  Stack,
  CardContent,
  Button,
} from "@mui/material";

const VideosPage = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch(
          "https://ytbackend-jftb.onrender.com/api/v1/notification"
        );
        const data = await response.json();
        console.log(data);
        setNotifications(data.reverse()); // Assuming the API response is an array of notification objects
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, []);

  const getImageUrl = (videoId) =>
    `https://i3.ytimg.com/vi/${videoId}/hqdefault.jpg`;

  const getVideoUrl = (videoId) => `https://www.youtube.com/watch?v=${videoId}`;

  return (
    <Stack direction="column" spacing={2}>
      {notifications.map((notification) => (
        <div key={notification.notificationId}>
          <Stack direction="row" spacing={2}>
            <CardMedia
              component="img"
              sx={{ width: 480, height: 360 }}
              image={getImageUrl(notification.videoId)}
              alt={notification.videoTitle}
            />
            <CardContent>
              <Typography variant="body2" color="white">
                {/* Title :{notification.videoTitle} */}
                <p>Channel Id: {notification.channelId}</p>
                <p>Video Id: {notification.videoId}</p>
                <p>Published DateTime : {notification.publishedDateTime}</p>
                <p>UpdatedDateTime : {notification.updatedDateTime}</p>
                <p>Tracked Time : {notification.trackedTime}</p>
                <Button
                  variant="contained"
                  style={{ backgroundColor: "red", color: "white" }}
                  onClick={() =>
                    window.open(getVideoUrl(notification.videoId), "_blank")
                  }
                >
                  Watch Video
                </Button>
              </Typography>
            </CardContent>
          </Stack>
        </div>
      ))}
    </Stack>
  );
};

export default VideosPage;
