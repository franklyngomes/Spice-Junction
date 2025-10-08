import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Snackbar, Alert } from "@mui/material";
import { clearAuthMsg } from "../features/auth/authSlice";

export default function AuthGlobalSnackbar() {
  const dispatch = useDispatch();
  const { error, message } = useSelector(s => s.auth);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (error || message) setOpen(true);
  }, [error, message]);

  const handleClose = () => {
    setOpen(false);
    dispatch(clearAuthMsg());
  };
  const severity = error ? "error" : "success";
  const text = error || message || "";

  return (
    <Snackbar
      open={open && !!text}
      onClose={handleClose}
      autoHideDuration={2500}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert onClose={handleClose} severity={severity} variant="filled" elevation={6} sx={{ fontSize: 14 }}>
        {text}
      </Alert>
    </Snackbar>
  );
}
