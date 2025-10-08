import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllRestaurants } from '../features/restaurant/restaurantSlice'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper'
import { Card, CardMedia, CardContent, Typography } from '@mui/material'
import '../styles/restaurantSlider.css'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import getImageUrl from '../utils/getImageUrl'
import { Link } from 'react-router-dom'

function formatAddress(addr, fallback) {
  if (!addr) return fallback || ''
  if (typeof addr === 'string') return addr
  if (typeof addr === 'object') {
    return `${addr.buildingNo || ''} ${addr.street || ''}, ${addr.city || ''} ${addr.pinCode || ''}`
  }
  return fallback || ''
}

export default function RestaurantSlider() {
  const dispatch = useDispatch()
  const { items, loading, error } = useSelector(state => state.restaurant)

  useEffect(() => {
    if (!items || items.length === 0) dispatch(fetchAllRestaurants())
  }, [dispatch])

  const restaurants = Array.isArray(items) ? items : (items?.data && Array.isArray(items.data) ? items.data : [])

  if (loading) return <div style={{ textAlign: 'center', padding: 20 }}>Loading restaurants...</div>
  if (error) return <div style={{ color: 'red', textAlign: 'center' }}>Error loading restaurants: {String(error)}</div>
  if (!restaurants.length) return <div style={{ textAlign: 'center', padding: 20 }}>No restaurants available</div>

  return (
    <section className="restaurant-section">
      <div className="container">
        <div className="section-head">
          <h2>
            <span className="black-text">Popular</span>{' '}
            <span className="red-text">Restaurants</span>
          </h2>
        </div>
      </div>

      <div className="restaurant-slider">
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={20}
          slidesPerView={3}
          navigation
          pagination={{ clickable: true }}
          breakpoints={{
            320: { slidesPerView: 1 },
            600: { slidesPerView: 2 },
            900: { slidesPerView: 3 }
          }}
        >
          {restaurants.map(r => {
            const img = getImageUrl(r.image || r.photo || r.logo || r.thumbnail)
            return (
              <SwiperSlide key={r._id || r.id || r.name || Math.random()}>
                <Link
                  to={`/restaurant-details/${r._id || r.id}`}
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <Card className="restaurant-card">
                    <CardMedia
                      component="img"
                      height="160"
                      image={img || 'https://via.placeholder.com/600x400'}
                      alt={r.name || r.title}
                    />
                    <CardContent>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                        {r.name || r.title || 'Restaurant'}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {formatAddress(r.address, r.location)}
                      </Typography>
                    </CardContent>
                  </Card>
                </Link>
              </SwiperSlide>
            )
          })}
        </Swiper>
      </div>
    </section>
  )
}
