import React from "react";
import { Box, Grid, Typography, TextField, Link, IconButton } from "@mui/material";
import { Facebook, YouTube, Twitter, Instagram } from "@mui/icons-material";
import "../styles/Footer.css";

export default function Footer() {
  return (
    <Box className="footer">
      <Grid container spacing={4} justifyContent="center">
      
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h6" className="footer-title red-text">
            Spice Junction
          </Typography>
          <Typography variant="body2" className="footer-text">
            Be the first to know about new collections, special events, and what’s going on at our place.
          </Typography>
          <Box className="footer-icons">
            <IconButton size="small" className="icon-btn">
              <Facebook />
            </IconButton>
            <IconButton size="small" className="icon-btn">
              <YouTube />
            </IconButton>
            <IconButton size="small" className="icon-btn">
              <Twitter />
            </IconButton>
            <IconButton size="small" className="icon-btn">
              <Instagram />
            </IconButton>
          </Box>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h6" className="footer-title">
            Contact us
          </Typography>
          <Typography variant="body2" className="footer-text">
            Spice Junction, Building 7, Madison Ave<br />
            Newtown, Malda
          </Typography>
          <Typography variant="body2" className="footer-text">
            (+01) 8900 189 456
          </Typography>
          <Link href="mailto:spicejunction@email.com" className="footer-link red-text">
            spicejunction@email.com
          </Link>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h6" className="footer-title">
            Useful links
          </Typography>
          <Box className="footer-links">
            <Link href="#" className="footer-link white-link">Favorite place</Link>
            <Link href="#" className="footer-link white-link">Our history</Link>
            <Link href="#" className="footer-link white-link">Contact us</Link>
            <Link href="#" className="footer-link white-link">Places to get lost</Link>
            <Link href="#" className="footer-link white-link">Our brand</Link>
          </Box>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h6" className="footer-title">
            Our newsletter
          </Typography>
          <Typography variant="body2" className="footer-text">
            See our privacy policy for more details.
          </Typography>
          <Box className="newsletter-box">
            <TextField
              variant="outlined"
              placeholder="Enter your email"
              size="small"
              className="newsletter-input"
              InputProps={{
                style: { color: "red" },
              }}
            />
          </Box>
        </Grid>
      </Grid>

      <Box className="footer-bottom">
        <Typography variant="caption">© 2025 Spice Junction. All Rights Reserved.</Typography>
      </Box>
    </Box>
  );
}
