import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Typography,
  Stack,
  Snackbar,
  Alert,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  signinThunk,
  signupThunk,
  forgotPasswordThunk,
  clearAuthMsg,
} from "../features/auth/authSlice";

export default function AuthSlide({ initialMode = "login" }) {
  const [isSignup, setIsSignup] = useState(initialMode === "signup");
  const [showPwd, setShowPwd] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, token, message } = useSelector((s) => s.auth);

  useEffect(() => {
    dispatch(clearAuthMsg());
  }, [dispatch]);

  useEffect(() => {
    setIsSignup(initialMode === "signup");
  }, [initialMode]);

  useEffect(() => {
    if (token) navigate("/");
  }, [token, navigate]);

  const [snackOpen, setSnackOpen] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const snackText = error || successMsg || message;
  const snackSeverity = error ? "error" : "success";
  useEffect(() => {
    if (snackText) setSnackOpen(true);
  }, [snackText]);

  const closeSnack = () => {
    setSnackOpen(false);
    setSuccessMsg("");
    dispatch(clearAuthMsg());
  };

  const bg = "https://cdn.wallpapersafari.com/42/55/MDzowJ.jpg";
  const foodImg =
    "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  const handleChange = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isSignup) {
        await dispatch(
          signupThunk({
            firstName: form.firstName,
            lastName: form.lastName,
            phone: form.phone,
            email: form.email,
            password: form.password,
          })
        ).unwrap();
        setSuccessMsg("Account created successfully!");
      } else {
        await dispatch(
          signinThunk({ email: form.email, password: form.password })
        ).unwrap();
        setSuccessMsg("Login successful!");
      }

      setSnackOpen(true);
      setTimeout(() => navigate("/"), 300);
    } catch {

    }
  };

  const onForgot = () => {
    const email =
      form.email || prompt("Enter your email to receive a reset link:");
    if (!email) return;
    dispatch(forgotPasswordThunk({ email }));
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Snackbar
        open={snackOpen && !!snackText}
        onClose={closeSnack}
        autoHideDuration={2500}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={closeSnack}
          severity={snackSeverity}
          variant="filled"
          elevation={6}
          sx={{ fontSize: 14 }}
        >
          {snackText}
        </Alert>
      </Snackbar>

      <Box
        sx={{
          width: { xs: "95%", md: 950 },
          height: 600,
          borderRadius: 4,
          overflow: "hidden",
          position: "relative",
          display: "flex",
          boxShadow: "0 25px 70px rgba(0,0,0,0.4)",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            left: 0,
            top: 0,
            width: "50%",
            height: "100%",
            backgroundImage: `url(${foodImg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            zIndex: 1,
          }}
        />

        <Box
          sx={{
            position: "absolute",
            right: 0,
            top: 0,
            width: "50%",
            height: "100%",
            backgroundImage: `url(${foodImg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            zIndex: 1,
          }}
        />

        <Box
          sx={{
            position: "absolute",
            opacity: 0,
            pointerEvents: "none",
            height: 0,
            overflow: "hidden",
            zIndex: 0,
          }}
        >
          <input type="text" autoComplete="username" />
          <input type="password" autoComplete="new-password" />
        </Box>

        <Box
          sx={{
            width: "50%",
            height: "100%",
            position: "absolute",
            top: 0,
            left: isSignup ? "50%" : 0,
            transition: "left 0.6s ease",
            background: "rgba(255,255,255,0.12)",
            backdropFilter: "blur(18px) saturate(120%)",
            WebkitBackdropFilter: "blur(18px) saturate(120%)",
            p: 4,
            boxSizing: "border-box",
            zIndex: 2,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            borderRadius: 2,
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              textAlign: "center",
              mb: 1,
              color: "#d32f2f",
              fontFamily: "'Playfair Display', serif",
            }}
          >
            Spice Junction
          </Typography>
          <Typography
            sx={{ textAlign: "center", color: "rgba(0,0,0,0.6)", mb: 3 }}
          >
            {isSignup
              ? "Please create an account"
              : "Please login to your account"}
          </Typography>

          <Stack direction="row" justifyContent="center" spacing={2} mb={3}>
            <Button
              onClick={() => setIsSignup(false)}
              variant={!isSignup ? "contained" : "text"}
              sx={{
                borderRadius: 20,
                px: 3,
                textTransform: "none",
                background: !isSignup
                  ? "linear-gradient(90deg,#c62828,#b71c1c)"
                  : "transparent",
                color: !isSignup ? "#fff" : "#000",
              }}
            >
              Login
            </Button>
            <Button
              onClick={() => setIsSignup(true)}
              variant={isSignup ? "contained" : "text"}
              sx={{
                borderRadius: 20,
                px: 3,
                textTransform: "none",
                background: isSignup
                  ? "linear-gradient(90deg,#c62828,#b71c1c)"
                  : "transparent",
                color: isSignup ? "#fff" : "#000",
              }}
            >
              Signup
            </Button>
          </Stack>

          <Box component="form" onSubmit={onSubmit} autoComplete="off">
            <Stack spacing={2}>
              {isSignup && (
                <>
                  <Stack direction="row" spacing={2}>
                    <TextField
                      name="firstName"
                      value={form.firstName}
                      onChange={handleChange}
                      placeholder="First name"
                      fullWidth
                      size="small"
                      autoComplete="off"
                      spellCheck={false}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 30,
                          background: "#fff",
                        },
                      }}
                    />
                    <TextField
                      name="lastName"
                      value={form.lastName}
                      onChange={handleChange}
                      placeholder="Last name"
                      fullWidth
                      size="small"
                      autoComplete="off"
                      spellCheck={false}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 30,
                          background: "#fff",
                        },
                      }}
                    />
                  </Stack>

                  <TextField
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="Phone number"
                    fullWidth
                    size="small"
                    autoComplete="off"
                    spellCheck={false}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 30,
                        background: "#fff",
                      },
                    }}
                  />
                </>
              )}

              <TextField
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter email"
                fullWidth
                size="small"
                autoComplete="off"
                spellCheck={false}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 30,
                    background: "#fff",
                  },
                }}
              />

              <TextField
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Password"
                type={showPwd ? "text" : "password"}
                fullWidth
                size="small"
                autoComplete="new-password"
                spellCheck={false}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPwd((s) => !s)}
                        edge="end"
                      >
                        {showPwd ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 30,
                    background: "#fff",
                  },
                }}
              />

              {!isSignup && (
                <Box
                  sx={{ display: "flex", justifyContent: "flex-end", mt: -1 }}
                >
                  {/* <Button
                    onClick={onForgot}
                    sx={{
                      textTransform: "none",
                      fontSize: 14,
                      p: 0,
                      minWidth: 0,
                      color: "#222121ff",
                      fontWeight: 500,
                    }}
                  >
                    Forgot password?
                  </Button> */}
                </Box>
              )}

              <Button
                type="submit"
                fullWidth
                disabled={loading}
                sx={{
                  borderRadius: 30,
                  py: isSignup ? 0.9 : 1.2,
                  fontWeight: 600,
                  textTransform: "none",
                  background: "linear-gradient(90deg,#c62828,#b71c1c)",
                  color: "#fff",
                  opacity: loading ? 0.7 : 1,
                }}
              >
                {loading
                  ? "Please wait..."
                  : isSignup
                    ? "Create account"
                    : "Login"}
              </Button>

              {isSignup && (
                <Typography
                  sx={{
                    textAlign: "center",
                    mt: 1,
                    fontSize: 14,
                    color: "rgba(0,0,0,0.75)",
                  }}
                >
                  Already have an account?{" "}
                  <Button
                    onClick={() => setIsSignup(false)}
                    sx={{
                      textTransform: "none",
                      p: 0,
                      minWidth: 0,
                      fontWeight: 600,
                      color: "#c62828",
                    }}
                  >
                    Login
                  </Button>
                </Typography>
              )}
            </Stack>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
