import { useState } from "react";
import { Button, Grid, TextField, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import axios from "axios";
import { Alert } from "@material-ui/lab";

const useStyles = makeStyles({
  formControl: {
    display: "flex",
    flexDirection: "column",
  },
  formInput: {
    margin: "2rem",
  },
  gridBackground: {
    backgroundColor: "#cfe8fc",
    height: "100vh",
  },
});

const LoginForm = () => {
  const classes = useStyles();

  const [username, setUsername] = useState("guest");
  const [password, setPassword] = useState("123456");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

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
    }
  };

  const handleUsername = (event) => {
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
          <Typography variant="h3" noWrap>
            Chat Application
          </Typography>
        </Grid>
        <Grid item>
          <form onSubmit={handleSubmit} className={classes.formControl}>
            <Grid container justify="center">
              <Grid item xs="auto" sm={12}>
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
              <Grid item xs="auto" sm={12}>
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
              <Grid item xs="auto" sm={12}>
                <Button className={classes.formInput} fullWidth type="submit" variant="contained" color="primary">
                  Login
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
        <Grid item>
        {error && <Alert severity="error">{error}</Alert>}
        </Grid>
      </Grid>
    </>
  );
};

export default LoginForm;
