
import { configureStore } from '@reduxjs/toolkit'
import menuReducer from '../features/menu/menuSlice'
import restaurantReducer from '../features/restaurant/restaurantSlice'
import categoryReducer from '../features/category/categorySlice'
import cartReducer from '../features/cart/cartSlice' 
import authReducer from '../features/auth/authSlice';
import blogReducer from '../features/blog/blogSlice'


const store = configureStore({
  reducer: {
    menu: menuReducer,
    restaurant: restaurantReducer,
    category: categoryReducer,
       cart: cartReducer, 
         auth: authReducer,
          blogs:blogReducer,
    
  }
})

export default store
