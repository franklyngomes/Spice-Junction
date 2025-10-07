
import React from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import getImageUrl from '../utils/getImageUrl'

export default function Discover() {
  const img = 'https://i.pinimg.com/originals/0a/95/7d/0a957d62b92a336c0f06f9cae218ef40.jpg'
  const accent = '#c62828' 

  return (
    <Box component="section" sx={{ my: { xs: 6, md: 8 } }}>
      <Box className="container" sx={{ py: 2 }}>
        <Grid container spacing={{ xs: 4, md: 8 }} alignItems="center">
          {/* IMAGE */}
          <Grid item xs={12} md={5} sx={{ display: 'flex', justifyContent: { xs: 'center', md: 'flex-start' } }}>
            <Box
              sx={{
                width: { xs: 320, sm: 360, md: 420 },
                borderRadius: 2,
                overflow: 'hidden',
                boxShadow: '0 25px 50px rgba(0,0,0,0.12)',
                backgroundColor: '#fff',
              }}
            >
              <img
                src={getImageUrl(img)}
                alt="Discover"
                style={{
                  display: 'block',
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  aspectRatio: '3 / 4',
                }}
                onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = 'https://via.placeholder.com/420x560?text=Food' }}
              />
            </Box>
          </Grid>

    
          <Grid item xs={12} md={7}>
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', pl: { md: 6, xs: 0 } }}>
            <Typography
  component="h3"
  sx={{
    fontFamily: "Playfair Display, serif",
    fontSize: { xs: '2rem', md: '2.4rem' }, 
    lineHeight: 1.2,
    fontWeight: 700,
    color: '#000',
    mb: 2.5, 
  }}
>
  Discover the Bold & Spicy <br />Tastes Of Indian Cuisine
</Typography>

<Typography
  sx={{
    color: '#444',
    fontSize: 16,
    lineHeight: 1.7,
    maxWidth: 560,
    mb: 3, 
  }}
>
  Indian cuisine is a fiery celebration of flavors, where every dish tells a story of spice,
  tradition, and passion. Our chefs blend fresh ingredients and time-honored techniques to bring
  authentic taste to your table.
</Typography>

<Button
  variant="contained"
  sx={{
    backgroundColor: '#c62828',
    color: '#fff',
    px: 3,
    py: 1.2,
    borderRadius: 1,
    fontWeight: 700,
    fontSize: 15,
    textTransform: 'none',
    alignSelf: 'flex-start',
    boxShadow: '0 8px 18px rgba(198,40,40,0.18)',
    '&:hover': { backgroundColor: '#a81f1f' },
    mb: 3, 
  }}
>
  Read more
</Button>

              <List disablePadding sx={{ maxWidth: 360 }}>
                {['NORTH INDIAN DISHES', 'SOUTH INDIAN DISHES', 'THALI'].map((text) => (
                  <ListItem key={text} disableGutters sx={{ pl: 0, mb: 1.5 }}>
                    <ListItemIcon sx={{ minWidth: 28 }}>
                      <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: accent }} />
                    </ListItemIcon>
                    <ListItemText
                      primary={text}
                      primaryTypographyProps={{
                        fontWeight: 700,
                        fontSize: 14,
                        letterSpacing: 0.3,
                      }}
                    />
                  </ListItem>
                ))}
              </List>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}
