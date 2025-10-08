import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../api/axiosInstance'

export const fetchAllFoodItems = createAsyncThunk(
  'menu/fetchAllFoodItems',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get('/all-food-item')
      return res.data?.data || []
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message)
    }
  }
)

export const fetchFoodsBySubCategory = createAsyncThunk(
  'menu/fetchFoodsBySubCategory',
  async (subCategoryId, { rejectWithValue }) => {
    try {
      const res = await axios.get(`/sub-category-details/${subCategoryId}`)
      const root = res.data?.data ?? res.data
      if (Array.isArray(root)) return root
      if (Array.isArray(root?.foods)) return root.foods
      if (Array.isArray(root?.items)) return root.items
      if (Array.isArray(root?.products)) return root.products
      if (root && typeof root === 'object') return Object.values(root)
      return []
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message)
    }
  }
)

export const searchFoodItems = createAsyncThunk(
  'menu/searchFoodItems',
  async (term, { rejectWithValue }) => {
    const q = String(term || '').trim()
    if (!q) return []

    // ---- deep extractor that can handle ANY nested shape ----
    const collectItemArrays = (node, depth = 0, out = []) => {
      if (!node || depth > 7) return out

      if (Array.isArray(node)) {
        const arr = node
          .map((x) => x?.food ?? x?.item ?? x?.product ?? x)
          .filter((x) => x && typeof x === 'object')
        // looks like items if at least one has common fields
        const looksLikeItems = arr.some(
          (x) =>
            'name' in x ||
            'title' in x ||
            'price' in x ||
            'image' in x ||
            'thumbnail' in x ||
            'description' in x
        )
        if (arr.length && looksLikeItems) out.push(arr)
        return out
      }

      if (typeof node === 'object') {
        
        const likely = [
          node?.data,
          node?.results,
          node?.items,
          node?.foods,
          node?.products,
          node?.list,
          node?.rows,
          node?.docs,
          node?.payload,
          node?.content,
          node?.searchResult,
          node?.searchResults,
        ].filter(Boolean)
        for (const c of likely) collectItemArrays(c, depth + 1, out)

        for (const k of Object.keys(node)) collectItemArrays(node[k], depth + 1, out)
      }
      return out
    }

    const normalize = (raw) => {
      let root =
        raw?.data?.results ??
        raw?.data?.items ??
        raw?.data?.foods ??
        raw?.data?.data ??
        raw?.data?.docs ??
        raw?.data ??
        raw ??
        []

      let arr
      if (Array.isArray(root)) {
        arr = root
      } else if (Array.isArray(root?.data)) {
        arr = root.data
      } else if (Array.isArray(root?.results)) {
        arr = root.results
      } else if (Array.isArray(root?.items)) {
        arr = root.items
      } else if (Array.isArray(root?.foods)) {
        arr = root.foods
      } else if (Array.isArray(root?.docs)) {
        arr = root.docs
      }

      if (Array.isArray(arr)) {
        return arr.map((x) => x?.food ?? x?.item ?? x?.product ?? x).filter(Boolean)
      }

     
      const candidates = collectItemArrays(raw)
      const best = candidates.sort((a, b) => b.length - a.length)[0] || []
      return best
    }

   
    const mkItemMatcher = (needle) => {
      const n1 = needle.toLowerCase()
      const n2 = n1.replace(/\s+/g, '') 
      return (it = {}) => {
        const fields = [
          it.name,
          it.title,
          it.description,
          it?.subCategory?.name ?? it?.subCategory,
          it?.category?.name ?? it?.category,
          it.cuisine,
        ]
        if (Array.isArray(it.tags)) fields.push(...it.tags)
        return fields.some((v) => {
          const a = String(v || '').toLowerCase()
          const b = a.replace(/\s+/g, '')
          return a.includes(n1) || b.includes(n2)
        })
      }
    }
    const itemMatches = mkItemMatcher(q)

    try {
     
      const res = await axios.post('/search', { searchTerm: q })
      const data = normalize(res)

      const filtered = data.filter(itemMatches)
      return filtered.length ? filtered : data
    } catch (err1) {
      try {
      
        const res2 = await axios.get('/all-food-item', { params: { search: q, q } })
        const data2 = normalize(res2)
        const onlyMatches = data2.filter(itemMatches)
        return onlyMatches 
      } catch (err2) {
        return []
      }
    }
  }
)


const menuSlice = createSlice({
  name: 'menu',
  initialState: {
   
    items: [],
    loading: false,
    error: null,

    bySubCategory: [],
    loadingBySubCategory: false,
    errorBySubCategory: null,

   
    searchResults: [],
    searchStatus: 'idle',
    searchError: null,

    
    lastSearchTerm: '',
    searchHistory: JSON.parse(sessionStorage.getItem('searchHistory') || '[]'),
  },
  reducers: {},
  extraReducers: (builder) => {
   
    builder
      .addCase(fetchAllFoodItems.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchAllFoodItems.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload || []
      })
      .addCase(fetchAllFoodItems.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || 'Failed to load menu'
      })

      .addCase(fetchFoodsBySubCategory.pending, (state) => {
        state.loadingBySubCategory = true
        state.errorBySubCategory = null
        state.bySubCategory = []
      })
      .addCase(fetchFoodsBySubCategory.fulfilled, (state, action) => {
        state.loadingBySubCategory = false
        state.bySubCategory = Array.isArray(action.payload) ? action.payload : []
      })
      .addCase(fetchFoodsBySubCategory.rejected, (state, action) => {
        state.loadingBySubCategory = false
        state.errorBySubCategory = action.payload || 'Failed to load items'
      })

     
      .addCase(searchFoodItems.pending, (state, action) => {
        state.searchStatus = 'loading'
        state.searchError = null
        state.searchResults = []

        const term = String(action.meta?.arg || '').trim()
        state.lastSearchTerm = term
        if (term) {
          const deduped = [term, ...state.searchHistory.filter((t) => t !== term)].slice(0, 10)
          state.searchHistory = deduped
          sessionStorage.setItem('searchHistory', JSON.stringify(deduped))
        }
      })
      .addCase(searchFoodItems.fulfilled, (state, action) => {
        state.searchStatus = 'succeeded'
        state.searchResults = Array.isArray(action.payload) ? action.payload : []
      })
      .addCase(searchFoodItems.rejected, (state, action) => {
        state.searchStatus = 'failed'
        state.searchError = action.payload || 'Search failed'
      })
  },
})

export default menuSlice.reducer
