import React, { useState } from "react";
import { Button, TextField, Snackbar } from "@mui/material";
import axios from "axios";

const Subscribe = () => {
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = useState("");

  const [channelId, setChannelId] = useState("");

  const handleSubscribe = async () => {
    try {
      const response = await axios
        .post(
          `https://ytbackend-jftb.onrender.com/api/v1/subscribe?channelId=${channelId}&mode=subscribe`
        )
        .then(() => {
          setOpen(true);
          setMessage("Channel is subscribed !");
        });

      console.log("Subscribe request successful:", response.data);
    } catch (error) {
      console.error("Error Subscribing:", error);
    }
  };

  const handleUnsubscribe = async () => {
    try {
      const response = await axios
        .post(
          `https://ytbackend-jftb.onrender.com/api/v1/subscribe?channelId=${channelId}&mode=unsubscribe`
        )
        .then(() => {
          setOpen(true);
          setMessage("Channel is Unsubscribed !");
        });

      console.log("Unsubscribe request successful:", response.data);
    } catch (error) {
      console.error("Error Unsubscribing:", error);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "15px",
      }}
    >
      <TextField
        sx={{ backgroundColor: "#fff" }}
        id="filled-basic"
        variant="filled"
        style={{ maxWidth: "500px" }}
        onChange={(e) => setChannelId(e.target.value)}
      />
      <Button
        variant="contained"
        color="error"
        onClick={handleSubscribe}
        style={{ maxWidth: "9rem" }}
      >
        Subscribe
      </Button>
      <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        message={message}
      />
      <Button
        variant="contained"
        color="secondary"
        onClick={handleUnsubscribe}
        style={{ maxWidth: "9rem" }}
      >
        Unsubscribe
      </Button>
      <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        message={message}
      />
    </div>
  );
};

export default Subscribe;
