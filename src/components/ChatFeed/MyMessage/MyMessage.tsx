import { Chip } from "@material-ui/core";

export type MyMessageProps = {
  message: {
    attachments: [{ file: File }] | [{ file: undefined }];
    text: string;
  };
};

const MyMessage = ({ message }: MyMessageProps) => {
  if (message?.attachments?.length > 0) {
    return (
      <img
        src={`${message.attachments[0].file}`}
        alt="message-attachment"
        style={{ float: "right", marginTop: "16px" }}
      />
    );
  }

  return (
    <div style={{ float: "right", marginRight: "18px", marginTop: "16px" }}>
      <Chip label={message.text} color="primary" />
    </div>
  );
};

export default MyMessage;
