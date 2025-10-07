import React from 'react'
import { Box, Typography, TextField, Button } from '@mui/material'
import '../styles/hero.css'

export default function Hero() {
  return (
    <Box className="hero">
      <div className="hero-overlay" />
      <div className="hero-content">
        <Typography variant="h2" className="hero-title">
          Deliciousness Delivered To Your Door
        </Typography>
        <Typography className="hero-sub">
          Food is more than just fuel — it’s an experience that brings people together, 
          tells stories, and captures culture on a plate.
        </Typography>
        <div className="hero-search">
          <TextField 
            placeholder="Find your favourite foods" 
            variant="outlined" 
            className="search-input"
          />
          <Button variant="contained" className="search-btn">Search</Button>
        </div>
      </div>
    </Box>
  )
}
