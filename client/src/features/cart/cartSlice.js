import { createSlice } from '@reduxjs/toolkit'

const load = () => {
  try {
    const data = JSON.parse(localStorage.getItem('cart_v1'))
    return {
      items: Array.isArray(data?.items) ? data.items : [],
      restaurantId: data?.restaurantId ?? null, 
      error: null, 
    }
  } catch {
    return { items: [], restaurantId: null, error: null }
  }
}

const save = (state) => {

  const toSave = { items: state.items, restaurantId: state.restaurantId }
  localStorage.setItem('cart_v1', JSON.stringify(toSave))
}

const initialState = load()

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
  
    addItem: (state, { payload }) => {
      let incomingRestaurantId =
        payload.restaurantId ||
        payload.restaurant_id ||
        payload.restaurant?.id ||
        payload.restaurant?._id ||
        payload.restaurantIdFk ||
        null

      
      if (state.restaurantId && incomingRestaurantId !== state.restaurantId) {
        state.error = 'You can only add items from one restaurant at a time.'
        return
      }

    
      if (!state.restaurantId) {
        if (!incomingRestaurantId) {
          state.error = 'Unable to add this item: restaurant info is missing.'
          return
        }
        state.restaurantId = incomingRestaurantId
      }

      const { _id, id } = payload
      const key = String(_id || id)
      const found = state.items.find(i => String(i._id || i.id) === key)

      if (found) {
        found.qty += 1
      } else {
        state.items.push({ ...payload, restaurantId: incomingRestaurantId, qty: 1 })
      }

      state.error = null
      save(state)
    },

    removeItem: (state, { payload }) => {
      const key = String(payload._id || payload.id)
      state.items = state.items.filter(i => String(i._id || i.id) !== key)
      if (state.items.length === 0) state.restaurantId = null
      save(state)
    },

    decreaseQty: (state, { payload }) => {
      const key = String(payload._id || payload.id)
      const it = state.items.find(i => String(i._id || i.id) === key)
      if (!it) return
      it.qty -= 1
      if (it.qty <= 0) {
        state.items = state.items.filter(i => String(i._id || i.id) !== key)
      }
      if (state.items.length === 0) state.restaurantId = null
      save(state)
    },

    clearCart: (state) => {
      state.items = []
      state.restaurantId = null
      state.error = null
      save(state)
    },

    clearCartError: (state) => {
      state.error = null
    },
  }
})

export const { addItem, removeItem, decreaseQty, clearCart, clearCartError } = cartSlice.actions

export const selectCartCount = (state) =>
  state.cart.items.reduce((n, i) => n + (i.qty || 0), 0)
export const selectCartItems = (state) => state.cart.items
export const selectCartRestaurantId = (state) => state.cart.restaurantId
export const selectCartError = (state) => state.cart.error

export default cartSlice.reducer
