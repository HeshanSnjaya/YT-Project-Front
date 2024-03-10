import React, { useEffect, useState } from "react";
import {
  Typography,
  CardMedia,
  Stack,
  CardContent,
  Button,
  Snackbar,
} from "@mui/material";
import axios from "axios";

const Slot = (props) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const fetchNotifications = async () => {
    try {
      const response = await fetch(
        `https://ytbackend-jftb.onrender.com/api/v1/notification/by-slot/${props.slotId}`
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
      await axios
        .put(
          `https://ytbackend-jftb.onrender.com/api/v1/notification/${notificationId}?claimable=${claimable}`
        )
        .then(() => {
          setOpen(true);
          setMessage("claim status updated");
        });
      const updatedNotifications = await fetchNotifications();
      setNotifications(updatedNotifications);
    } catch (error) {
      console.error("Error updating notification:", error);
    }
  };

  const requestVideos = async () => {
    try {
      await axios
        .put(
          `https://ytbackend-jftb.onrender.com/api/v1/notification/request/${props.slotId}`
        )
        .then(() => {
          setOpen(true);
          setMessage("10 Videos are assigned");
        });
      const updatedNotifications = await fetchNotifications();
      setNotifications(updatedNotifications);
    } catch (error) {
      console.error("Error updating notification:", error);
    }
  };

  const clearVideos = async () => {
    try {
      await axios
        .put(
          `https://ytbackend-jftb.onrender.com/api/v1/notification/update-by-slot?slotId=${props.slotId}`
        )
        .then(() => {
          setOpen(true);
          setMessage("Videos are unassigned");
        });
      const updatedNotifications = await fetchNotifications();
      setNotifications(updatedNotifications);
    } catch (error) {
      console.error("Error updating notification:", error);
    }
  };

  const handleArchiveVideos = async (notificationId) => {
    try {
      await axios
        .put(
          `https://ytbackend-jftb.onrender.com/api/v1/notification/archive/${notificationId}`
        )
        .then(() => {
          setOpen(true);
          setMessage("Video is archived");
        });
      console.log(notificationId);
      const updatedNotifications = await fetchNotifications();
      setNotifications(updatedNotifications);
    } catch (error) {
      console.error("Error updating notification:", error);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <div>
      <Stack direction="column" spacing={2}>
        <Stack direction="row" spacing={10}>
          <Button
            variant="contained"
            color="primary"
            onClick={requestVideos}
            style={{ maxWidth: "300px" }}
            sx={{ marginBottom: 2 }}
          >
            Request 10 New Videos
          </Button>
          <Button
            variant="contained"
            style={{
              backgroundColor: "red",
              color: "white",
              maxWidth: "300px",
            }}
            onClick={clearVideos}
            sx={{ marginBottom: 2 }}
          >
            Unassign the Videos
          </Button>
        </Stack>
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
                    <br />
                    <br />
                    <Button
                      variant="contained"
                      style={{
                        backgroundColor: "red",
                        color: "white",
                        maxWidth: "300px",
                        justifyContent: "flex-end",
                      }}
                      onClick={() =>
                        handleArchiveVideos(notification.notificationId)
                      }
                      sx={{ marginBottom: 2 }}
                    >
                      Archive
                    </Button>
                  </Typography>
                </CardContent>
              </Stack>
              <Snackbar
                open={open}
                autoHideDuration={3000}
                onClose={handleClose}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                message={message}
              />
            </div>
          ))
        )}
      </Stack>
    </div>
  );
};

export default Slot;
