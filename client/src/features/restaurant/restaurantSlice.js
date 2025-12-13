import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../api/axiosInstance'

export const fetchAllRestaurants = createAsyncThunk(
  'restaurant/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get('/all-restaurant')
      console.log('fetchAllRestaurants raw response:', res.data)

      const payload = (() => {
        if (Array.isArray(res.data)) return res.data
        if (res.data && Array.isArray(res.data.data)) return res.data.data
        if (res.data && typeof res.data === 'object') return Object.values(res.data)
        return []
      })()

      return payload
    } catch (err) {
  
      return rejectWithValue(err?.response?.data?.message || err?.message || 'Failed to fetch restaurants')
    }
  }
)

const restaurantSlice = createSlice({
  name: 'restaurant',
  initialState: { items: [], loading: false, error: null },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchAllRestaurants.pending, state => { state.loading = true; state.error = null })
      .addCase(fetchAllRestaurants.fulfilled, (state, action) => { state.loading = false; state.items = action.payload || [] })
      .addCase(fetchAllRestaurants.rejected, (state, action) => { state.loading = false; state.error = action.payload })
  }
})

export default restaurantSlice.reducer
