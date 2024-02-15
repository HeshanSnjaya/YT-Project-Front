import React, { useEffect, useState } from "react";
import {
  Typography,
  CardMedia,
  Stack,
  CardContent,
  Button,
} from "@mui/material";

// const VideosPage = () => {
//   const [notifications, setNotifications] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchNotifications = async () => {
//       try {
//         const response = await fetch(
//           "https://ytbackend-jftb.onrender.com/api/v1/notification"
//         );
//         const data = await response.json();
//         console.log(data);
//         setNotifications(data.reverse()); // Assuming the API response is an array of notification objects
//       } catch (error) {
//         console.error("Error fetching notifications:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchNotifications();
//   }, []);

//   const getImageUrl = (videoId) =>
//     `https://i3.ytimg.com/vi/${videoId}/hqdefault.jpg`;

//   const getVideoUrl = (videoId) => `https://www.youtube.com/watch?v=${videoId}`;

//   const handleClaimableClick = async (notificationId, claimable) => {
//     try {
//       await fetch(`https://ytbackend-jftb.onrender.com/api/v1/notification/${notificationId}?claimable=${claimable}`, {
//         method: "PUT",
//       });
//       // Update the state or fetch notifications again after a successful request
//       // Example: refetch notifications
//       const updatedNotifications = await fetchNotifications();
//       setNotifications(updatedNotifications.reverse());
//     } catch (error) {
//       console.error("Error updating notification:", error);
//     }
//   };

//   return (
//     <Stack direction="column" spacing={2}>
//       {loading ? (
//         <Typography variant="body2" color="white">
//           LOADING ....
//         </Typography>
//       ) : (
//         notifications.map((notification) => (
//           <div key={notification.notificationId}>
//             <Stack direction="row" spacing={2}>
//               <CardMedia
//                 component="img"
//                 sx={{ width: 480, height: 360 }}
//                 image={getImageUrl(notification.videoId)}
//                 alt={notification.videoTitle}
//               />
//               <CardContent>
//                 <Typography variant="body2" color="white">
//                   <p>Channel Id: {notification.channelId}</p>
//                   <p>Video Id: {notification.videoId}</p>
//                   <p>Published DateTime : {notification.publishedDateTime}</p>
//                   <p>UpdatedDateTime : {notification.updatedDateTime}</p>
//                   <p>Tracked Time : {notification.trackedTime}</p>
//                   <Button
//                     variant="contained"
//                     style={{ backgroundColor: "red", color: "white" }}
//                     onClick={() =>
//                       window.open(getVideoUrl(notification.videoId), "_blank")
//                     }
//                   >
//                     Watch Video
//                   </Button>
//                 </Typography>
//               </CardContent>
//             </Stack>
//           </div>
//         ))
//       )}
//     </Stack>
//   );
// };

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
        setNotifications(data.reverse());
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
      // Update the state or fetch notifications again after a successful request
      // Example: refetch notifications
      const updatedNotifications = await fetchNotifications();
      setNotifications(updatedNotifications.reverse());
    } catch (error) {
      console.error("Error updating notification:", error);
    }
  };

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

export default VideosPage;
