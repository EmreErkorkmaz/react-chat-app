import {
  Typography,
  Grid,
  Divider,
  Chip,
  Avatar,
  Button,
  CircularProgress,
} from "@material-ui/core";
import React from "react";
import MessageForm from "./MessageForm/MessageForm";
import MyMessage from "./MyMessage/MyMessage";
import TheirMessage from "./TheirMessage/TheirMessage";
import { useStyles } from "./ChatFeedStyles";

export default function ChatFeed(props: any) {
  const classes = useStyles();
  const { chats, activeChat, userName, messages } = props;

  const chat = chats && chats[activeChat];

  const renderReadReceipts = (
    message: { id: number },
    isMyMessage: boolean
  ) => {
    return chat.people.map(
      (
        person: { last_read: number; person: { avatar: string } },
        index: number
      ) =>
        person.last_read === message.id && (
          <div
            key={`read_${index}`}
            style={{
              float: isMyMessage ? "right" : "left",
              backgroundImage: `url(${person?.person?.avatar})`,
            }}
          />
        )
    );
  };

  const renderMessages = () => {
    const keys = Object.keys(messages);

    return keys.map((key, index) => {
      const message = messages[key];
      const lastMessageKey: any = index === 0 ? null : keys[index - 1];
      const isMyMessage = userName === message.sender.username;

      return (
        <div
          key={`msg_${index}`}
          style={{ width: "100%", display: "flex", flexDirection: "column" }}
        >
          <div>
            {isMyMessage ? (
              <MyMessage message={message} />
            ) : (
              <TheirMessage
                message={message}
                lastMessage={messages[lastMessageKey]}
              />
            )}
          </div>
          <div
            style={{
              marginRight: isMyMessage ? "18px" : "0px",
              marginLeft: isMyMessage ? "0" : "68px",
            }}
          >
            {renderReadReceipts(message, isMyMessage)}
          </div>
        </div>
      );
    });
  };

  const logoutHandler = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("password");
    window.location.reload();
  };

  if (!chat) {
    return (
      <Grid
        container
        justify="center"
        alignItems="center"
        style={{ height: "100vh" }}
      >
        <CircularProgress />
      </Grid>
    );
  }

  return (
    <React.Fragment data-testid="chatFeed">
      <Grid
        container
        justify="flex-start"
        direction="column"
        alignItems="center"
      >
        <Typography className={classes.root} variant="overline">
          {chat?.title}
        </Typography>
        <div>
          <Grid container style={{ marginBottom: "16px" }}>
            <Grid item>
              {chat.people.map(
                (
                  person: {
                    last_read: number;
                    person: { avatar: string; username: string };
                  },
                  index: number
                ) => (
                  <Chip
                    key={index}
                    avatar={
                      <Avatar
                        src={person?.person?.avatar}
                        alt={person.person.username[0]}
                      />
                    }
                    label={person.person.username}
                    color="primary"
                    style={{ marginRight: "5px" }}
                  />
                )
              )}
            </Grid>
            <Grid item>
              <Button
                variant="text"
                color="secondary"
                style={{ float: "right" }}
                onClick={logoutHandler}
              >
                Logout
              </Button>
            </Grid>
          </Grid>
        </div>
      </Grid>
      <Divider style={{ marginBottom: "20px" }} />
      <div
        style={{ height: "60vh", overflowY: "auto", scrollBehavior: "revert" }}
      >
        {renderMessages()}
      </div>
      <div style={{ height: "100px" }} />
      <div>
        <MessageForm {...props} chatId={activeChat} />
      </div>
    </React.Fragment>
  );
}
