import { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { customIsTyping, customSendMessage } from "../../../utilities/index";
import { ImageOutlined, Send } from "@material-ui/icons";
import { Grid, IconButton } from "@material-ui/core";
import { useStyles } from "./MessageFormStyles";

const MessageForm = (props: any) => {
  const classes = useStyles();

  const { chatId, creds } = props;

  const [value, setValue] = useState("");

  const onSubmitHandler = (
    event: React.FormEvent<HTMLFormElement> | React.FormEvent<HTMLDivElement>
  ) => {
    event.preventDefault();

    const text = value.trim();

    if (text.length > 0) {
      customSendMessage(creds, chatId, { text });
    }
    setValue("");
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const target: any = event.target;
    setValue(target.value);

    customIsTyping(props, chatId);
  };

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target: any = event.target;
    customSendMessage(creds, chatId, { files: target.files, text: "" });
  };

  return (
    <form onSubmit={(event) => onSubmitHandler(event)} className={classes.root}>
      <Grid
        container
        spacing={1}
        justify="center"
        alignItems="center"
        className={classes.containerGrid}
      >
        <Grid item xs={9}>
          <TextField
            className={classes.input}
            label="Send Message"
            variant="outlined"
            value={value}
            onChange={handleChange}
            onSubmit={onSubmitHandler}
          />
        </Grid>
        <Grid item xs={1}>
          <IconButton aria-label="send" color="primary" type="submit">
            <Send />
          </IconButton>
        </Grid>
        <Grid item xs={1}>
          <IconButton>
            <label htmlFor="upload-button">
              <span>
                <ImageOutlined color="primary" />
              </span>
            </label>
            <input
              type="file"
              multiple={false}
              id="upload-button"
              style={{ display: "none" }}
              onChange={handleUpload}
            />
          </IconButton>
        </Grid>
      </Grid>
    </form>
  );
};

export default MessageForm;
