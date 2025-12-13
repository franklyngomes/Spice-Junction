
// src/components/Hero.jsx
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Typography, TextField, Button } from '@mui/material'
import '../styles/Hero.css'

export default function Hero() {
  const [term, setTerm] = useState('')
  const navigate = useNavigate()

  const onSubmit = (e) => {
    e.preventDefault()
    const q = term.trim()
    if (!q) return
    navigate(`/menu?q=${encodeURIComponent(q)}`)
  }

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

        <form className="hero-search" onSubmit={onSubmit}>
          <TextField
            placeholder="Find your favourite foods"
            variant="outlined"
            className="search-input"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            inputProps={{ 'aria-label': 'Search dishes' }}
          />
          <Button variant="contained" className="search-btn" type="submit">
            Search
          </Button>
        </form>
      </div>
    </Box>
  )
}

