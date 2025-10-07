import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllFoodItems } from '../features/menu/menuSlice'
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
} from '@mui/material'
import '../styles/Dishes.css'
import getImageUrl from '../utils/getImageUrl'

export default function Dishes() {
  const dispatch = useDispatch()
  const { items, loading, error } = useSelector((state) => state.menu)

  useEffect(() => {
    if (!items || items.length === 0) dispatch(fetchAllFoodItems())
  }, [dispatch])

  const dishes = Array.isArray(items)
    ? items
    : items?.data && Array.isArray(items.data)
    ? items.data
    : []

  if (loading) return <div style={{ textAlign: 'center', padding: 30 }}>Loading dishes...</div>
  if (error) return <div style={{ color: 'red', textAlign: 'center' }}>Error: {String(error)}</div>
  if (!dishes.length) return <div style={{ textAlign: 'center', padding: 20 }}>No dishes found</div>

  const shown = dishes.slice(0, 6)

  return (
    <section className="dishes-section">
      <div className="container">
        {/* Section header */}
        <div className="section-head">
  <h2>
    <span className="black-text">OUR</span>{' '}
    <span className="red-text">DISHES</span>
  </h2>
  <a href="/menu" className="view-all">
    View all
  </a>
</div>


        {/* Grid of dishes */}
        <Grid container spacing={4}>
          {shown.map((d) => {
            const imgSrc = getImageUrl(
              d.image || d.img || d.photo || d.thumbnail || d.imageUrl
            )
            return (
              <Grid item xs={12} sm={6} md={4} key={d._id || d.id || d.name}>
                <Card
                  className="dish-card"
                  sx={{
                    borderRadius: 2,
                    boxShadow: '0 4px 18px rgba(0,0,0,0.08)',
                    transition: 'transform 0.2s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    height="220"
                    image={imgSrc || 'https://via.placeholder.com/400x300'}
                    alt={d.name || d.title || 'Dish'}
                  />
                  <CardContent sx={{ pb: 0 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 0.5 }}>
                      {d.name || d.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ fontSize: 13, lineHeight: 1.4 }}
                    >
                      {d.description ? d.description.slice(0, 80) : ''}
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
                    <Typography
                      sx={{ color: '#c62828', fontWeight: 700, fontSize: 15 }}
                    >
                      ₹{d.price ?? d.cost ?? d.amount ?? '—'}
                    </Typography>
                    <Button
                      variant="contained"
                      size="small"
                      sx={{
                        backgroundColor: '#c62828',
                        textTransform: 'none',
                        fontWeight: 600,
                        px: 2,
                        '&:hover': { backgroundColor: '#a81f1f' },
                      }}
                    >
                      Add to cart
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            )
          })}
        </Grid>
      </div>
    </section>
  )
}
