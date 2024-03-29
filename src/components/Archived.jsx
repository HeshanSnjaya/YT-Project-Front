import React, { useEffect, useState } from "react";
import {
  Typography,
  CardMedia,
  Stack,
  CardContent,
  Button,
} from "@mui/material";

const Archived = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNotifications = async () => {
    try {
      const response = await fetch(
        `https://ytbackend-jftb.onrender.com/api/v1/notification/archived`
      );
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.error("Error fetching notifications:", error);
      throw error;
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

  const handleClaimableClick = async (notificationId, claimable) => {
    try {
      await fetch(
        `https://ytbackend-jftb.onrender.com/api/v1/notification/${notificationId}?claimable=${claimable}`,
        {
          method: "PUT",
        }
      );
      const updatedNotifications = await fetchNotifications();
      setNotifications(updatedNotifications);
    } catch (error) {
      console.error("Error updating notification:", error);
    }
  };

  return (
    <Stack direction="column" spacing={2}>
      <br />
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
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() =>
                      handleClaimableClick(notification.notificationId, true)
                    }
                    sx={{ marginRight: 2 }}
                  >
                    Claimable
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() =>
                      handleClaimableClick(notification.notificationId, false)
                    }
                  >
                    Not Claimable
                  </Button>
                </Typography>
              </CardContent>
            </Stack>
          </div>
        ))
      )}
    </Stack>
  );
};

export default Archived;
