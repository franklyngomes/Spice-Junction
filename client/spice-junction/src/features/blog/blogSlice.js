import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchBlogs = createAsyncThunk("blogs/fetchBlogs", async () => {
  const res = await axios.get("https://spice-junction.onrender.com/all-blogs");
  return res.data.data; // array of blogs
});

export const fetchBlogDetails = createAsyncThunk(
  "blogs/fetchBlogDetails",
  async (id) => {
    const res = await axios.get(`https://spice-junction.onrender.com/blogs-details/${id}`);
    return res.data.data;
  }
);

const blogSlice = createSlice({
  name: "blogs",
  initialState: { blogs: [], blogDetail: null, loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs = action.payload;
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchBlogDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBlogDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.blogDetail = action.payload;
      })
      .addCase(fetchBlogDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default blogSlice.reducer;
