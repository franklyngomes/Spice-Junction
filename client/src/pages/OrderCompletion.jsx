import React from "react";
import { Box, Typography, Button, Paper } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useNavigate } from "react-router-dom";

export default function OrderCompletion() {
  const navigate = useNavigate();

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="gray"
    >
      <Paper
        elevation={6}
        sx={{
          border: "1px solid white",
          borderRadius: 3,
          p: 5,
          textAlign: "center",
          maxWidth: 400,
          color: "white",
        }}
      >
      
        <Box display="flex" justifyContent="center" mb={3}>
          <CheckCircleIcon sx={{ fontSize: 64, color: "green" }} />
        </Box>

     
        <Typography variant="h6" sx={{ color: "green" }}>
          Your Order has been placed successfully.
        </Typography>

        
        <Typography variant="body1" sx={{ color: "red", mt: 2 }}>
          Restaurants usually take <b>20-30 mins</b> to prepare your order
        </Typography>

      
        <Box mt={4}>
          <Button
            variant="outlined"
            sx={{ textTransform: "capitalize", width: "auto" }}
            onClick={() => navigate("/")}
          >
            Back to Home
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
