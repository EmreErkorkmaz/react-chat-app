import { Chip, Avatar, Grid } from "@material-ui/core";

type TheirMessageProps = {
  lastMessage: { sender: { username: string } };
  message: {
    sender: { username: string; avatar: string };
    attachments: [{ file: File }];
    text: string;
  };
};

const TheirMessage = ({ lastMessage, message }: TheirMessageProps) => {
  const isFirstMessageByUser =
    !lastMessage || lastMessage.sender.username !== message.sender.username;
  return (
    <Grid container>
      {isFirstMessageByUser && (
        <div style={{ backgroundImage: `url(${message?.sender?.avatar})` }} />
      )}
      {message?.attachments?.length > 0 ? (
        <img
          src={`${message.attachments[0].file}`}
          alt="message-attachment"
          style={{ marginLeft: isFirstMessageByUser ? "4px" : "48px" }}
        />
      ) : (
        <div style={{ float: "left", marginLeft: "16px", marginTop: "16px" }}>
          <Chip
            avatar={
              <Avatar
                src={message?.sender?.avatar}
                alt={message?.sender?.username}
              />
            }
            color="default"
            label={message.text}
          />
        </div>
      )}
    </Grid>
  );
};

export default TheirMessage;
