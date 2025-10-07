import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../api/axiosInstance'

export const fetchSubCategories = createAsyncThunk(
  'category/fetchSubCategories',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get('/all-sub-category')
      console.log('fetchSubCategories raw response:', res.data)
      // Normalize: prefer res.data.data (backend uses {status, message, data: [...]})
      if (Array.isArray(res.data)) return res.data
      if (res.data && Array.isArray(res.data.data)) return res.data.data
      if (res.data && typeof res.data === 'object') return Object.values(res.data)
      return []
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message)
    }
  }
)

const categorySlice = createSlice({
  name: 'category',
  initialState: { items: [], loading: false, error: null },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchSubCategories.pending, state => { state.loading = true; state.error = null })
      .addCase(fetchSubCategories.fulfilled, (state, action) => { state.loading = false; state.items = action.payload || [] })
      .addCase(fetchSubCategories.rejected, (state, action) => { state.loading = false; state.error = action.payload })
  }
})

export default categorySlice.reducer
