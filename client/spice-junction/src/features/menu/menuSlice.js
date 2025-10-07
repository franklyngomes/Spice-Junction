// // src/features/menu/menuSlice.js
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
// import axios from '../../api/axiosInstance'

// export const fetchAllFoodItems = createAsyncThunk(
//   'menu/fetchAllFoodItems',
//   async (_, { rejectWithValue }) => {
//     try {
//       const res = await axios.get('/all-food-item')
//       return res.data
//     } catch (err) {
//       return rejectWithValue(err.response?.data || err.message)
//     }
//   }
// )

// const menuSlice = createSlice({
//   name: 'menu',
//   initialState: { items: [], loading: false, error: null },
//   reducers: {},
//   extraReducers: builder => {
//     builder
//       .addCase(fetchAllFoodItems.pending, state => { state.loading = true; state.error = null })
//       .addCase(fetchAllFoodItems.fulfilled, (state, action) => { state.loading = false; state.items = action.payload || [] })
//       .addCase(fetchAllFoodItems.rejected, (state, action) => { state.loading = false; state.error = action.payload })
//   }
// })

// export default menuSlice.reducer


// src/features/menu/menuSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../api/axiosInstance'

export const fetchAllFoodItems = createAsyncThunk(
  'menu/fetchAllFoodItems',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get('/all-food-item')
      // ✅ backend returns { status, message, data: [] }
      return res.data.data || []
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message)
    }
  }
)

const menuSlice = createSlice({
  name: 'menu',
  initialState: { items: [], loading: false, error: null },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchAllFoodItems.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchAllFoodItems.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload
      })
      .addCase(fetchAllFoodItems.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  }
})

export default menuSlice.reducer
