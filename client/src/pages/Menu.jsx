import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  fetchAllFoodItems,
  fetchFoodsBySubCategory,
  searchFoodItems,
} from '../features/menu/menuSlice'
import { addItem, clearCartError } from '../features/cart/cartSlice'
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Snackbar,
  Alert,
} from '@mui/material'
import '../styles/Dishes.css'
import getImageUrl from '../utils/getImageUrl'


const getRestaurantId = (d, restaurants) => {
  const direct =
    d?.restaurantId ||
    d?.restaurant_id ||
    d?.restaurant?.id ||
    d?.restaurant?._id ||
    d?.restaurantIdFk ||
    null
  if (direct) return direct

  const nameLike =
    d?.restaurantName ||
    d?.restaurant?.name ||
    d?.brand ||
    d?.vendorName ||
    d?.outletName ||
    null

  if (!nameLike || !Array.isArray(restaurants) || restaurants.length === 0) {
    return null
  }

  const norm = String(nameLike).trim().toLowerCase()
  const found =
    restaurants.find(r => String(r?.name || '').trim().toLowerCase() === norm) ||
    restaurants.find(r => String(r?.title || '').trim().toLowerCase() === norm) ||
    restaurants.find(r => String(r?.brand || '').trim().toLowerCase() === norm)

  return found?._id || null
}

export default function Menu() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const q = new URLSearchParams(location.search).get('q')?.trim() || ''

  const {
    items,
    loading,
    error,
    bySubCategory,
    loadingBySubCategory,
    errorBySubCategory,

 
    searchResults = [],
    searchStatus = 'idle',
    searchError = null,

   
    lastSearchTerm,
    searchHistory,
  } = useSelector((state) => state.menu)

  const { activeSubCategoryId } = useSelector((state) => state.category)
  const { error: cartError } = useSelector((state) => state.cart)

  const restaurants = useSelector((state) => state.restaurant?.items || [])

  useEffect(() => {

    if (q) {
      dispatch(searchFoodItems(q))
      return
    }
    if (activeSubCategoryId) {
      dispatch(fetchFoodsBySubCategory(activeSubCategoryId))
    } else if (!items || items.length === 0) {
      dispatch(fetchAllFoodItems())
    }
  }, [dispatch, q, activeSubCategoryId])

  const rawList = q
    ? searchResults
    : activeSubCategoryId
    ? bySubCategory
    : items

  const isLoading = q
    ? searchStatus === 'loading'
    : activeSubCategoryId
    ? loadingBySubCategory
    : loading

  const err = q
    ? searchError
    : activeSubCategoryId
    ? errorBySubCategory
    : error

  const dishes = Array.isArray(rawList)
    ? rawList
    : rawList?.data && Array.isArray(rawList.data)
    ? rawList.data
    : []

  if (isLoading) return <div style={{ textAlign: 'center', padding: 30 }}>Loading dishes...</div>
  if (err) return <div style={{ color: 'red', textAlign: 'center' }}>Error: {String(err)}</div>


  if (!dishes.length) {
    return (
      <div style={{ textAlign: 'center', padding: 20 }}>
        {q ? `No dishes found for “${q}”.` : 'No dishes found'}
      </div>
    )
  }

  const handleAdd = (d) => {
    const payload = {
      _id: d._id || d.id || d.slug || d.name,
      id:  d._id || d.id || d.slug || d.name,
      name: d.name || d.title,
      price: d.price ?? d.cost ?? d.amount ?? 0,
      image: d.image || d.img || d.photo || d.thumbnail || d.imageUrl,
      qty: 1,
      restaurantId: getRestaurantId(d, restaurants),
    }
    dispatch(addItem(payload))
  }

  return (
    <>
      <section className="dishes-section">
        <div className="container">
          <div
            className="section-head"
            style={{
              gap: 12,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <h2>
              <span className="black-text">OUR</span>{' '}
              <span className="red-text">DISHES</span>
            </h2>

            <button
              onClick={() => navigate(-1)}
              style={{
                cursor: 'pointer',
                border: '1px solid #ddd',
                background: '#fff',
                color: '#333',
                fontWeight: 600,
                padding: '6px 12px',
                borderRadius: 6,
              }}
            >
              ← Back
            </button>
          </div>

          <Grid container spacing={4}>
            {dishes.map((d) => {
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
                      <Typography sx={{ color: '#c62828', fontWeight: 700, fontSize: 15 }}>
                        ₹{d.price ?? d.cost ?? d.amount ?? '—'}
                      </Typography>
                      <Button
                        variant="contained"
                        size="small"
                        onClick={() => handleAdd(d)}
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

      <Snackbar
        open={!!cartError}
        autoHideDuration={3000}
        onClose={() => dispatch(clearCartError())}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={() => dispatch(clearCartError())} severity="error" sx={{ width: '100%' }}>
          {cartError}
        </Alert>
      </Snackbar>
    </>
  )
}
