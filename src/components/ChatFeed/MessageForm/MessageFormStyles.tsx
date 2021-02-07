import { createStyles, makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      "& > *": {
        margin: theme.spacing(1),
      },
      marginRight: "1rem",
    },
    input: {
      width: "80%",
      float: "right",
    },
    containerGrid: {
      marginTop: "3rem",
    },
  })
);
