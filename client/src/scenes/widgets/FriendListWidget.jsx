import { Box, Typography, useTheme } from "@mui/material";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "state";
import WidgetCloseButton from "./WidgetCloseButton";

export default function FriendListWidget({ userId, toggleFriendListWidget, showWidgets }) {
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);

  const getFriends = async () => {
    const response = await fetch(
      `http://localhost:3001/users/${userId}/friends`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setFriends({ friends: data }));
  };

  useEffect(() => {
    getFriends();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <WidgetWrapper className="friend-list-container widget-radius" 
    style={{ display: showWidgets.showFriendListWidget ? '': 'none'}}
    >
      <WidgetCloseButton
        closeWidgetFunction={toggleFriendListWidget}
      ></WidgetCloseButton>
      <Typography
        className="friend-list-header"
        color={palette.neutral.dark}
        backgroundColor={palette.background.alt}
        variant="h5"
        fontWeight="500"
        sx={{ mb: "1.5rem" }}
      >
        Friends List
      </Typography>

      {friends.length === 0 ? 
        <Box className="no-friends-container">
          <Typography>
            Add some friends from your feed!
          </Typography>
        </Box>
        :
        <Box 
        className="friends-container"
        display="flex" 
        flexDirection="column" 
        gap="1.5rem"
      >
        {friends.map((friend) => (
          <Friend
            key={friend._id}
            friendId={friend._id}
            name={`${friend.firstName} ${friend.lastName}`}
            subtitle={friend.occupation}
            userPicturePath={friend.picturePath}
          />
        ))}
      </Box>
      }
     
    </WidgetWrapper>
  );
};

