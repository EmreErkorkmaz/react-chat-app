import { useState } from "react";
import {
  Button,
  CircularProgress,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import axios from "axios";
import { Alert } from "@material-ui/lab";
import { useStyles } from "./LoginFormStyles";

const LoginForm = () => {
  const classes = useStyles();

  const [username, setUsername] = useState("guest");
  const [password, setPassword] = useState("123456");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsLoading(true);

    const authObject = {
      "Project-Id": "280b36f4-441c-4697-a7fe-c5e224ba9540",
      "User-Name": username,
      "User-Secret": password,
    };

    try {
      await axios.get("https://api.chatengine.io/chats", {
        headers: authObject,
      });

      localStorage.setItem("username", username);
      localStorage.setItem("password", password);

      window.location.reload();
    } catch (error) {
      setError("Incorrect username/password");
      setIsLoading(false);
    }
  };

  const handleUsername = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setUsername(event.target.value);
  };

  return (
    <>
      <Grid
        className={classes.gridBackground}
        container
        direction="column"
        spacing={8}
        alignItems="center"
      >
        <Grid item>
          <Typography variant="h4" noWrap>
            Chat Application
          </Typography>
        </Grid>
        <Grid item>
          <form onSubmit={handleSubmit} className={classes.formControl}>
            <Grid container justify="center">
              <Grid item xs={12} sm={12}>
                <TextField
                  fullWidth
                  className={classes.formInput}
                  label="Username"
                  variant="outlined"
                  type="text"
                  value={username}
                  onChange={handleUsername}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  fullWidth
                  className={classes.formInput}
                  label="Password"
                  variant="outlined"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <Button
                  className={classes.formInput}
                  disabled={isLoading}
                  fullWidth
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                  {isLoading ? <CircularProgress /> : "Login"}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
        <Grid item>{error && <Alert severity="error">{error}</Alert>}</Grid>
      </Grid>
    </>
  );
};

export default LoginForm;
