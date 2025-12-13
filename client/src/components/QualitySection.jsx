import React from 'react'
import { Box, Grid, Typography, Button } from '@mui/material'
import '../styles/Quality.css'

export default function QualitySection() {
  const plateImg = '/image/quality-plate.png'
  const accent = '#c62828'

  return (
    <Box className="quality-section">
      <div className="container">
        <Grid container alignItems="center" spacing={4} justifyContent="space-between">
          <Grid item xs={12} md={7}>
            {/* Title */}
            <Typography
              component="h2"
              className="quality-title"
              sx={{
                fontFamily: '"Playfair Display", serif',
                fontSize: { xs: '2rem', md: '2.8rem' },
                lineHeight: 1.2,
                fontWeight: 700,
                color: '#111',
                mb: '24px',
              }}
            >
              We Have Excellent <span className="accent">Quality</span> Of Indian Food
            </Typography>


            <Typography
              className="quality-desc"
              sx={{
                fontSize: '13.5px',
                color: '#555',
                lineHeight: 1.6,
                maxWidth: 420,
                mb: 2,
              }}
            >
              Indian cuisine uses a wide variety of spices, herbs, grains, and fresh ingredients,
              creating dishes that are not only delicious but also deeply connected to history and tradition.
            </Typography>


            <Button
              variant="contained"
              sx={{
                backgroundColor: accent,
                color: '#fff',
                textTransform: 'none',
                padding: '8px 18px',
                borderRadius: '3px',
                fontWeight: 700,
                fontSize: 14,
                boxShadow: 'none',
                '&:hover': { backgroundColor: '#a81f1f', boxShadow: '0 6px 18px rgba(168,31,31,0.12)' },
              }}
            >
              More details
            </Button>
          </Grid>


          <Grid item xs={12} md={4}>
            <div className="quality-plate-wrap">
              <img
                src={plateImg}
                alt="plate"
                className="quality-plate"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = 'https://via.placeholder.com/180?text=Food'
                }}
              />

            </div>
          </Grid>
        </Grid>
      </div>
    </Box>
  )
}
