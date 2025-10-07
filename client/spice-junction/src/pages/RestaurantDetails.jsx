// // // src/pages/RestaurantDetails.jsx
// // import React, { useEffect, useState } from 'react'
// // import { useParams, Link, useNavigate } from 'react-router-dom'
// // import axios from 'axios'
// // import { Box, Typography, Button, Chip, Grid, Paper } from '@mui/material'
// // import getImageUrl from '../utils/getImageUrl'

// // export default function RestaurantDetails() {
// //   const { id } = useParams()
// //   const navigate = useNavigate()
// //   const [restaurant, setRestaurant] = useState(null)
// //   const [loading, setLoading] = useState(true)
// //   const [error, setError] = useState(null)

// //   useEffect(() => {
// //     if (!id) return
// //     setLoading(true)
// //     setError(null)

// //     axios.get(`https://spice-junction-server.onrender.com/restaurant-details/${id}`)
// //       .then(res => {
// //         // backend returns { status, message, data }
// //         const payload = res.data && (res.data.data || res.data.restaurant || null)
// //         setRestaurant(payload)
// //       })
// //       .catch(err => {
// //         console.error('Failed to fetch restaurant:', err)
// //         setError(err?.response?.data?.message || err.message || 'Failed to load restaurant')
// //       })
// //       .finally(() => setLoading(false))
// //   }, [id])

// //   if (loading) return <div style={{ padding: 40, textAlign: 'center' }}>Loading restaurant...</div>
// //   if (error) return <div style={{ padding: 40, textAlign: 'center', color: 'red' }}>Error: {error}</div>
// //   if (!restaurant) return <div style={{ padding: 40, textAlign: 'center' }}>No restaurant found</div>

// //   const {
// //     name,
// //     phone,
// //     address,
// //     location,
// //     cuisine,
// //     image,
// //     createdAt,
// //     deliveryZone,
// //     isApproved,
// //     isBlocked,
// //     ownerId,
// //     _id,
// //   } = restaurant

// //   return (
// //     <Box sx={{ maxWidth: 1100, margin: '0 auto', px: 2, py: 6 }}>
// //       <Button variant="text" onClick={() => navigate(-1)} sx={{ color: '#c62828', mb: 2 }}>
// //         ← Back
// //       </Button>

// //       <Grid container spacing={4}>
// //         <Grid item xs={12} md={5}>
// //           <Paper elevation={2} sx={{ borderRadius: 2, overflow: 'hidden' }}>
// //             <img
// //               src={getImageUrl(image)}
// //               alt={name}
// //               style={{ width: '100%', height: 360, objectFit: 'cover', display: 'block' }}
// //               onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = 'https://via.placeholder.com/720x480?text=Restaurant' }}
// //             />
// //           </Paper>

// //           <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
// //             {Array.isArray(cuisine) && cuisine.map(c => (
// //               <Chip key={c} label={c} size="small" sx={{ bgcolor: '#f5f5f5', fontWeight: 600 }} />
// //             ))}
// //           </Box>
// //         </Grid>

// //         <Grid item xs={12} md={7}>
// //           <Typography component="h1" sx={{ fontFamily: 'Playfair Display, serif', fontSize: '1.8rem', fontWeight: 700, mb: 1 }}>
// //             {name}
// //           </Typography>

// //           <Typography sx={{ color: '#666', mb: 2 }}>
// //             {restaurant.description || restaurant.about || 'No description available for this restaurant.'}
// //           </Typography>

// //           <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 2 }}>
// //             <Box>
// //               <Typography sx={{ fontSize: 13, color: '#888' }}>Phone</Typography>
// //               <Typography sx={{ fontWeight: 700 }}>{phone || '—'}</Typography>
// //             </Box>

// //             <Box>
// //               <Typography sx={{ fontSize: 13, color: '#888' }}>Delivery Zones</Typography>
// //               <Typography sx={{ fontWeight: 700 }}>{Array.isArray(deliveryZone) ? deliveryZone.join(', ') : (deliveryZone || '—')}</Typography>
// //             </Box>

// //             <Box>
// //               <Typography sx={{ fontSize: 13, color: '#888' }}>Status</Typography>
// //               <Typography sx={{ fontWeight: 700 }}>
// //                 {isBlocked ? 'Blocked' : (isApproved ? 'Approved' : 'Pending')}
// //               </Typography>
// //             </Box>
// //           </Box>

// //           <Box sx={{ mt: 3 }}>
// //             <Typography sx={{ fontSize: 13, color: '#888' }}>Meta</Typography>
// //             <Typography sx={{ fontSize: 13, color: '#444' }}>
// //               Created: {createdAt ? (new Date(createdAt)).toLocaleString() : '—'}
// //             </Typography>
// //             <Typography sx={{ fontSize: 13, color: '#444' }}>
// //               ID: {_id}
// //             </Typography>
// //             <Typography sx={{ fontSize: 13, color: '#444' }}>
// //               Owner ID: {ownerId}
// //             </Typography>
// //           </Box>

// //           <Box sx={{ mt: 4 }}>
// //             <Link to="/" style={{ textDecoration: 'none' }}>
// //               <Button variant="contained" sx={{ backgroundColor: '#c62828', '&:hover': { backgroundColor: '#a81f1f' } }}>
// //                 Back to Home
// //               </Button>
// //             </Link>
// //           </Box>
// //         </Grid>
// //       </Grid>
// //     </Box>
// //   )
// // }


// // src/pages/RestaurantDetails.jsx
// import React, { useEffect, useState } from 'react'
// import { useParams, Link, useNavigate } from 'react-router-dom'
// import { Box, Typography, Button, Chip, Grid, Paper } from '@mui/material'
// import axiosInstance from '../api/axiosInstance'

// export default function RestaurantDetails() {
//   const { id } = useParams()
//   const navigate = useNavigate()
//   const [restaurant, setRestaurant] = useState(null)
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(null)

//   useEffect(() => {
//     if (!id) return
//     setLoading(true)
//     setError(null)

//     axiosInstance.get(`/restaurant-details/${id}`)
//       .then(res => {
//         // backend returns { status, message, data }
//         const payload = res.data?.data || res.data?.restaurant || null
//         setRestaurant(payload)
//       })
//       .catch(err => {
//         console.error('Failed to fetch restaurant:', err)
//         setError(err?.response?.data?.message || err.message || 'Failed to load restaurant')
//       })
//       .finally(() => setLoading(false))
//   }, [id])

//   if (loading) return <div style={{ padding: 40, textAlign: 'center' }}>Loading restaurant...</div>
//   if (error) return <div style={{ padding: 40, textAlign: 'center', color: 'red' }}>Error: {error}</div>
//   if (!restaurant) return <div style={{ padding: 40, textAlign: 'center' }}>No restaurant found</div>

//   const {
//     name,
//     phone,
//     address,
//     cuisine,
//     image,
//     createdAt,
//     deliveryZone,
//     isApproved,
//     isBlocked,
//     ownerId,
//     _id,
//   } = restaurant

//   return (
//     <Box sx={{ maxWidth: 1100, margin: '0 auto', px: 2, py: 6 }}>
//       <Button variant="text" onClick={() => navigate(-1)} sx={{ color: '#c62828', mb: 2 }}>
//         ← Back
//       </Button>

//       <Grid container spacing={4}>
//         <Grid item xs={12} md={5}>
//           <Paper elevation={2} sx={{ borderRadius: 2, overflow: 'hidden' }}>
//             <img
//               src={image}  // ✅ direct Cloudinary URL
//               alt={name}
//               style={{ width: '100%', height: 360, objectFit: 'cover', display: 'block' }}
//               onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = 'https://via.placeholder.com/720x480?text=Restaurant' }}
//             />
//           </Paper>

//           <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
//             {Array.isArray(cuisine) && cuisine.map(c => (
//               <Chip key={c} label={c} size="small" sx={{ bgcolor: '#f5f5f5', fontWeight: 600 }} />
//             ))}
//           </Box>
//         </Grid>

//         <Grid item xs={12} md={7}>
//           <Typography component="h1" sx={{ fontFamily: 'Playfair Display, serif', fontSize: '1.8rem', fontWeight: 700, mb: 1 }}>
//             {name}
//           </Typography>

//           <Typography sx={{ color: '#666', mb: 2 }}>
//             {restaurant.description || restaurant.about || 'No description available for this restaurant.'}
//           </Typography>

//           <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 2 }}>
//             <Box>
//               <Typography sx={{ fontSize: 13, color: '#888' }}>Phone</Typography>
//               <Typography sx={{ fontWeight: 700 }}>{phone || '—'}</Typography>
//             </Box>

//             <Box>
//               <Typography sx={{ fontSize: 13, color: '#888' }}>Delivery Zones</Typography>
//               <Typography sx={{ fontWeight: 700 }}>{Array.isArray(deliveryZone) ? deliveryZone.join(', ') : (deliveryZone || '—')}</Typography>
//             </Box>

//             <Box>
//               <Typography sx={{ fontSize: 13, color: '#888' }}>Status</Typography>
//               <Typography sx={{ fontWeight: 700 }}>
//                 {isBlocked ? 'Blocked' : (isApproved ? 'Approved' : 'Pending')}
//               </Typography>
//             </Box>
//           </Box>

//           <Box sx={{ mt: 3 }}>
//             <Typography sx={{ fontSize: 13, color: '#888' }}>Meta</Typography>
//             <Typography sx={{ fontSize: 13, color: '#444' }}>
//               Created: {createdAt ? (new Date(createdAt)).toLocaleString() : '—'}
//             </Typography>
//             <Typography sx={{ fontSize: 13, color: '#444' }}>
//               ID: {_id}
//             </Typography>
//             <Typography sx={{ fontSize: 13, color: '#444' }}>
//               Owner ID: {ownerId}
//             </Typography>
//           </Box>

//           <Box sx={{ mt: 4 }}>
//             <Link to="/" style={{ textDecoration: 'none' }}>
//               <Button variant="contained" sx={{ backgroundColor: '#c62828', '&:hover': { backgroundColor: '#a81f1f' } }}>
//                 Back to Home
//               </Button>
//             </Link>
//           </Box>
//         </Grid>
//       </Grid>
//     </Box>
//   )
// }


// src/pages/RestaurantDetails.jsx
import React, { useEffect, useMemo, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import axios from '../api/axiosInstance'
import { Chip } from '@mui/material'
import '../styles/RestaurantDetails.css'

export default function RestaurantDetails() {
  const { id } = useParams()
  const navigate = useNavigate()

  // Restaurant state
  const [restaurant, setRestaurant] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Specials state
  const [cats, setCats] = useState([])
  const [menu, setMenu] = useState([])
  const [activeCat, setActiveCat] = useState('all')
  const [menuLoading, setMenuLoading] = useState(false)

  const FALLBACK_MAIN = 'https://placehold.co/720x480?text=Restaurant'
  const FALLBACK_FOOD = 'https://placehold.co/500x350?text=Food'

  /* ---------- Fetch restaurant by id ---------- */
  useEffect(() => {
    if (!id) return
    setLoading(true)
    setError(null)

    axios.get(`/restaurant-details/${id}`)
      .then(res => {
        const payload = res?.data?.data || res?.data?.restaurant || null
        setRestaurant(payload)
      })
      .catch(err => {
        setError(err?.response?.data?.message || err.message || 'Failed to load restaurant')
      })
      .finally(() => setLoading(false))
  }, [id])

  /* ---------- Fetch categories + ALL foods (/all-food-item) ---------- */
  useEffect(() => {
    setMenuLoading(true)
    Promise.all([
      axios.get('/all-category'),
      axios.get('/all-food-item') // ← using the endpoint you requested
    ])
      .then(([cRes, mRes]) => {
        const catData =
          cRes?.data?.data ||
          cRes?.data?.categories ||
          cRes?.data ||
          []

        const menuDataRaw =
          mRes?.data?.data ||   // common
          mRes?.data?.items ||  // sometimes { items: [...] }
          mRes?.data ||         // or just [...]
          []

        const menuArray = Array.isArray(menuDataRaw)
          ? menuDataRaw
          : (Array.isArray(menuDataRaw.data) ? menuDataRaw.data : [])

        setCats(Array.isArray(catData) ? catData : [])
        setMenu(menuArray)
      })
      .catch(() => {})
      .finally(() => setMenuLoading(false))
  }, [])

  /* ---------- Tabs list ---------- */
  const categoriesForTabs = useMemo(
    () => [{ _id: 'all', name: 'All Categories' }, ...cats],
    [cats]
  )

  /* ---------- Filter foods by active category (tolerant to shapes) ---------- */
  const filteredMenu = useMemo(() => {
    if (activeCat === 'all') return menu

    return menu.filter(it => {
      const catRef = it.category || it.categoryId || it.category_id
      const catName =
        it.categoryName ||
        it.category_label ||
        (typeof catRef === 'object' ? catRef?.name : undefined)

      const active = String(activeCat).toLowerCase()

      if (typeof catRef === 'string' && catRef.toLowerCase() === active) return true
      if (typeof catRef === 'object' && String(catRef._id || '').toLowerCase() === active) return true
      if (typeof catName === 'string' && catName.toLowerCase() === active) return true

      return false
    })
  }, [menu, activeCat])

  /* ---------- Loading / error states ---------- */
  if (loading) return <div className="rd-loading">Loading restaurant...</div>
  if (error) return <div className="rd-error">Error: {error}</div>
  if (!restaurant) return <div className="rd-empty">No restaurant found</div>

  const {
    name,
    phone,
    cuisine,
    image,
    createdAt,
    deliveryZone,
    isApproved,
    isBlocked,
    ownerId,
    _id,
    description,
    about
  } = restaurant || {}

  return (
    <div className="rd-wrap">
      
      {/* <div className="rd-top">
        <button className="rd-back" onClick={() => navigate(-1)}>← Back</button>
        <Link to="/" className="rd-home">HOME</Link>
      </div> */}

      {/* details two-column */}
      <div className="rd-grid">
        {/* left */}
        <div className="rd-left">
          <div className="rd-imageWrap">
            <img
              src={image}
              alt={name}
              className="rd-image"
              onError={(e)=>{ e.currentTarget.onerror=null; e.currentTarget.src=FALLBACK_MAIN }}
            />
          </div>

          <div className="rd-chips">
            {Array.isArray(cuisine) && cuisine.map(c => (
              <Chip key={c} label={c} size="small" className="rd-chip" />
            ))}
          </div>
        </div>

        {/* right */}
        <div className="rd-right">
          <h1 className="rd-title">{name}</h1>

          <p className="rd-desc">
            {description || about || 'No description available for this restaurant.'}
          </p>

          <div className="rd-infoGrid">
            <div className="rd-infoItem">
              <div className="rd-label">Phone</div>
              <div className="rd-value">{phone || '—'}</div>
            </div>

            <div className="rd-infoItem">
              <div className="rd-label">Delivery Zones</div>
              <div className="rd-value">
                {Array.isArray(deliveryZone) ? deliveryZone.join(', ') : (deliveryZone || '—')}
              </div>
            </div>

            <div className="rd-infoItem">
              <div className="rd-label">Status</div>
              <div className="rd-value">
                {isBlocked ? 'Blocked' : (isApproved ? 'Approved' : 'Pending')}
              </div>
            </div>
          </div>

          <div className="rd-meta">
            <div className="rd-metaTitle">Meta</div>
            <div className="rd-metaRow">Created: {createdAt ? (new Date(createdAt)).toLocaleString() : '—'}</div>
            <div className="rd-metaRow">ID: {_id}</div>
            <div className="rd-metaRow">Owner ID: {ownerId}</div>
          </div>

          <Link to="/" className="rd-primaryBtn">Back to Home</Link>
        </div>
      </div>

      {/* ===== Special Menu ===== */}
      <div className="sm-wrap">
        <p className="sm-eyebrow">Special Menu</p>
        <h2 className="sm-title">Our Specials Menu</h2>

        {/* Tabs */}
        <div className="sm-tabs" role="tablist" aria-label="Menu categories">
          {categoriesForTabs.map(cat => {
            const key = cat._id || cat.id || cat.name
            const idVal = String(cat._id || cat.name)
            const active = String(activeCat) === idVal
            return (
              <button
                key={key}
                className={`sm-tab ${active ? 'active' : ''}`}
                onClick={() => setActiveCat(idVal)}
                role="tab"
                aria-selected={active}
              >
                {cat.name}
              </button>
            )
          })}
        </div>

        {/* Grid */}
        <div className="sm-grid">
          {menuLoading && (
            <div className="rd-loading" style={{gridColumn:'1/-1'}}>Loading menu...</div>
          )}

          {!menuLoading && (
            filteredMenu.length === 0 ? (
              <div style={{gridColumn:'1/-1', textAlign:'center', padding:'18px 0', color:'#777'}}>
                No dishes in this category.
              </div>
            ) : (
              filteredMenu.slice(0, 8).map(item => {
                // title fallbacks
                const title =
                  item.name ||
                  item.title ||
                  item.foodName ||
                  item.itemName ||
                  item.dishName ||
                  item.menuName ||
                  item.categoryName ||
                  'Dish'

                // image fallbacks
                const img =
                  item.image ||
                  item.imageUrl ||
                  item.img ||
                  item.photo ||
                  item.thumbnail ||
                  item.picture ||
                  (Array.isArray(item.images) ? (item.images[0]?.url || item.images[0]) : undefined) ||
                  (Array.isArray(item.media) ? item.media[0]?.url : undefined)

                // price
                const price = item.price ?? item.cost ?? item.amount ?? item.mrp ?? '—'

                return (
                  <div className="sm-card" key={item._id || item.id || title}>
                    <div className="sm-imgWrap">
                      <img
                        src={img || FALLBACK_FOOD}
                        alt={title}
                        className="sm-img"
                        onError={(e)=>{ e.currentTarget.onerror=null; e.currentTarget.src=FALLBACK_FOOD }}
                      />
                    </div>

                    <div className="sm-body">
                      <div className="sm-name">{title}</div>

                      <div className="sm-metaRow">
                        <div className="sm-stars" aria-label="rating">
                          <span>★</span><span>★</span><span>★</span><span>★</span><span>☆</span>
                        </div>
                        <div className="sm-price">₹{price}</div>
                      </div>

                      <div className="sm-icons">
                        <span title="Like">❤</span>
                        <span title="Add to cart">🛒</span>
                        <span title="More">⋯</span>
                      </div>
                    </div>
                  </div>
                )
              })
            )
          )}
        </div>

        <div className="sm-ctaRow">
          <button className="sm-moreBtn" onClick={() => setActiveCat('all')}>Show More</button>
        </div>
      </div>
    </div>
  )
}
