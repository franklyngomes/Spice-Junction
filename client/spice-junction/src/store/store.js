// src/store/store.js
import { configureStore } from '@reduxjs/toolkit'
import menuReducer from '../features/menu/menuSlice'
import restaurantReducer from '../features/restaurant/restaurantSlice' // if you have it
import categoryReducer from '../features/category/categorySlice'
// import authReducer from '../features/auth/authSlice' // if present
 import blogReducer from '../features/blog/blogSlice'
const store = configureStore({
  reducer: {
    menu: menuReducer,
    restaurant: restaurantReducer,
    category: categoryReducer,
    // auth: authReducer
    blogs:blogReducer,
  }
})

export default store
