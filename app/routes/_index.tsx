import type { MetaFunction } from "@remix-run/node";
import {
  Container,
  Typography,
  TextField,
  Button,
  Snackbar,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";

/**
 * Meta data for the page.
 * @type {MetaFunction}
 */
export const meta: MetaFunction = () => {
  return [{ title: "Weather App" }, { name: "Weather App", content: "Login" }];
};

/**
 * Login page component.
 * @param {Object} props - The component's props.
 * @returns {JSX.Element} The rendered component.
 */
export default function Index(props: any) {
  // Navigation
  const navigate = useNavigate();

  // Hooks
  const [error, setError] = useState("");
  const [cookies, setCookie] = useCookies(["loggedIn", "username"]);

  /**
   * Redirects to home page if user is already logged in.
   */
  useEffect(() => {
    if (cookies.loggedIn === true) {
      navigate("/HomePage");
    }
  }, [cookies, navigate]);

  /**
   * Handles the submission of the login form.
   * @param {Event} event - The form submission event.
   */
  const handleSubmit = (event: any) => {
    event.preventDefault();
    if (
      event.target.username.value === "ipgautomotive" &&
      event.target.password.value === "carmaker"
    ) {
      setCookie("loggedIn", "true", { path: "/" });
      setCookie("username", event.target.username.value, { path: "/" });
      navigate("/HomePage");
    } else {
      setError("Invalid username or password. Please try again.");
    }
  };

  /**
   * Closes the error message.
   */
  const handleCloseError = () => {
    setError("");
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" align="center" gutterBottom>
        Weather App
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          id="username"
          name="username"
          label="Username"
          variant="outlined"
          margin="normal"
          fullWidth
        />
        <TextField
          id="password"
          name="password"
          label="Password"
          type="password"
          variant="outlined"
          margin="normal"
          fullWidth
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Login
        </Button>
      </form>
      <Snackbar
        open={error !== ""}
        autoHideDuration={5000}
        onClose={handleCloseError}
      >
        <div>
          <Typography color="error">{error}</Typography>
        </div>
      </Snackbar>
    </Container>
  );
}
