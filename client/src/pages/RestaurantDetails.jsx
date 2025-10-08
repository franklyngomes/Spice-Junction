import React, { useEffect, useMemo, useState, useCallback } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import axios from '../api/axiosInstance'
import { Chip, Snackbar, Alert } from '@mui/material'   
import '../styles/RestaurantDetails.css'


import { useDispatch, useSelector } from 'react-redux'  
import { addItem, clearCartError } from '../features/cart/cartSlice'  

export default function RestaurantDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()

 
  useEffect(() => {
    if (id) sessionStorage.setItem('lastRestaurantId', id)
  }, [id])


  const cartError = useSelector((s) => s.cart.error)


  const [restaurant, setRestaurant] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

 
  const [menu, setMenu] = useState([])
  const [menuLoading, setMenuLoading] = useState(false)


  const [menuGroups, setMenuGroups] = useState([])
  const [activeGroupIdx, setActiveGroupIdx] = useState(0)

  const FALLBACK_MAIN = 'https://placehold.co/720x480?text=Restaurant'
  const FALLBACK_FOOD = 'https://placehold.co/500x350?text=Food'


  const getCart = useCallback(() => {
    try {
      const raw = sessionStorage.getItem('cartItems')
      return Array.isArray(JSON.parse(raw)) ? JSON.parse(raw) : []
    } catch {
      return []
    }
  }, [])

  const setCart = useCallback((items) => {
    try {
      sessionStorage.setItem('cartItems', JSON.stringify(items))
      window.dispatchEvent(
        new CustomEvent('cart:update', {
          detail: { count: items.reduce((a, c) => a + (c.quantity || 0), 0) }
        })
      )
    } catch {}
  }, [])

  const toPriceNumber = (v) => {
    if (v === null || v === undefined || v === '—') return 0
    const n = Number(String(v).replace(/[^\d.]/g, ''))
    return Number.isFinite(n) ? n : 0
  }

  
  const handleAddToCart = useCallback((item) => {
    const idKey = item._id || item.id || item.name
    if (!idKey) return

    
    const dbId =
      item._id ??
      item?.foodItem?._id ??
      item?.foodItemId ??
      (typeof item?.foodItem === 'string' ? item.foodItem : undefined) ??
      item.id

    const cart = getCart()
    const idx = cart.findIndex(ci => (ci._id || ci.id || ci.name) === idKey)

    const cartItem = {
      _id: dbId, 
      id: item.id,
      name: item.name || 'Dish',
      price: toPriceNumber(item.price),
      image: item.image || item.imageUrl || item.foodImage || item.photo || '',
      quantity: 1,
      restaurantId: (restaurant && (restaurant._id || restaurant.id)) || null,
      restaurantName: restaurant?.name || null,
      _categoryName: item._categoryName || null,
    }

    if (idx > -1) {
      const next = [...cart]
      next[idx] = { ...next[idx], quantity: (next[idx].quantity || 0) + 1 }
      setCart(next)
    } else {
      setCart([...cart, cartItem])
    }

   
    dispatch(addItem({
      _id: cartItem._id,
      id: cartItem.id,
      name: cartItem.name,
      price: cartItem.price,
      image: cartItem.image,
      quantity: 1,
      restaurantId: cartItem.restaurantId,
      restaurantName: cartItem.restaurantName,
      _categoryName: cartItem._categoryName,
    }))

    try { console.log(`Added to cart: ${cartItem.name}`) } catch {}
  }, [getCart, setCart, restaurant, dispatch])

 
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


  useEffect(() => {
    if (!id) return
    setMenuLoading(true)

    axios.get(`/restaurant-food-menu/${id}`)
      .then(res => {
        const buckets = res?.data?.data
        if (!Array.isArray(buckets)) {
          setMenuGroups([])
          setMenu([])
          return
        }

        setMenuGroups(buckets)
        setActiveGroupIdx(0)

        const items = buckets.flatMap(b =>
          Array.isArray(b.items)
            ? b.items.map(it => ({ ...it, _categoryName: b.name }))
            : []
        )
        setMenu(items)
      })
      .catch(err => {
        console.error('menu fetch failed:', err)
        setMenuGroups([])
        setMenu([])
      })
      .finally(() => setMenuLoading(false))
  }, [id])

  const showGroup = (idx) => {
    setActiveGroupIdx(idx)
    const g = menuGroups[idx]
    const items = Array.isArray(g?.items)
      ? g.items.map(it => ({ ...it, _categoryName: g.name }))
      : []
    setMenu(items)
  }


  if (loading) return <div className="rd-loading">Loading restaurant...</div>
  if (error) return <div className="rd-error">Error: {error}</div>
  if (!restaurant) return <div className="rd-empty">No restaurant found</div>

  const {
    name,
    phone,
    cuisine,
    image,
    description,
    about,
    address
  } = restaurant || {}

  return (
    <div className="rd-wrap">
      
      <button className="rd-back" onClick={() => navigate('/')}>← Back to Home</button>

      <div className="rd-grid">
        
        <div className="rd-left">
          <div className="rd-imageWrap">
            <img
              src={image}
              alt={name}
              className="rd-image"
              onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = FALLBACK_MAIN }}
            />
          </div>

          <div className="rd-chips">
            {Array.isArray(cuisine) && cuisine.map(c => (
              <Chip key={c} label={c} size="small" className="rd-chip" />
            ))}
          </div>
        </div>

       
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

            {address && (
              <div className="rd-infoItem">
                <div className="rd-label">Address</div>
                <div className="rd-value">
                  {typeof address === 'object'
                    ? `${address.buildingNo || ''}, ${address.street || ''}, ${address.city || ''}, ${address.pinCode || ''}`
                    : address}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

     
      <div className="sm-wrap">
        <p className="sm-eyebrow">Special Menu</p>
        <h2 className="sm-title">Our Specials Menu</h2>

        {menuGroups.length > 0 && (
          <div className="sm-menuTabs" role="tablist" aria-label="Menu sections">
            {menuGroups.map((g, idx) => {
              const active = idx === activeGroupIdx
              return (
                <button
                  key={g._id || g.name || idx}
                  className={`sm-menuTab ${active ? 'active' : ''}`}
                  onClick={() => showGroup(idx)}
                  role="tab"
                  aria-selected={active}
                >
                  {g.name}
                </button>
              )
            })}
          </div>
        )}

        <div className="sm-grid">
          {menuLoading && (
            <div className="rd-loading" style={{ gridColumn: '1/-1' }}>Loading menu...</div>
          )}

          {!menuLoading && (
            menu.length === 0 ? (
              <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '18px 0', color: '#777' }}>
                No dishes available.
              </div>
            ) : (
              menu.slice(0, 12).map(item => {
                const title = item.name || 'Dish'
                const price = item.price ?? '—'
                const img =
                  item.image ||
                  item.imageUrl ||
                  item.foodImage ||
                  item.photo ||
                  FALLBACK_FOOD

                return (
                  <div className="sm-card" key={item._id || item.id || title}>
                    <div className="sm-imgWrap">
                      <img
                        src={img}
                        alt={title}
                        className="sm-img"
                        onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = FALLBACK_FOOD }}
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
                        <span
                          title="Add to cart"
                          role="button"
                          tabIndex={0}
                          onClick={(e) => { e.stopPropagation(); handleAddToCart(item) }}
                          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleAddToCart(item) } }}
                          aria-label={`Add ${title} to cart`}
                        >
                          🛒
                        </span>
                        <span title="More">⋯</span>
                      </div>
                    </div>
                  </div>
                )
              })
            )
          )}
        </div>
      </div>

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
    </div>
  )
}
