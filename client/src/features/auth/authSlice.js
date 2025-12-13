import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../../api/authAPI';

const saveToken = (t) => {
  if (t) sessionStorage.setItem('token', t);
  else sessionStorage.removeItem('token');
};

export const signupThunk = createAsyncThunk(
  'auth/signup',
  async (payload, { rejectWithValue }) => {
    try { return await api.signup(payload); }
    catch (e) { return rejectWithValue(e.response?.data || { message: e.message }); }
  }
);

export const signinThunk = createAsyncThunk(
  'auth/signin',
  async (payload, { rejectWithValue }) => {
    try { return await api.signin(payload); }
    catch (e) { return rejectWithValue(e.response?.data || { message: e.message }); }
  }
);

export const forgotPasswordThunk = createAsyncThunk(
  'auth/forgot',
  async (payload, { rejectWithValue }) => {
    try { return await api.forgotPassword(payload); }
    catch (e) { return rejectWithValue(e.response?.data || { message: e.message }); }
  }
);

export const resetPasswordThunk = createAsyncThunk(
  'auth/reset',
  async (payload, { rejectWithValue }) => {
    try { return await api.resetPassword(payload); }
    catch (e) { return rejectWithValue(e.response?.data || { message: e.message }); }
  }
);

const initialState = {
  user: null,
  token: sessionStorage.getItem('token') || null,
  loading: false,
  error: null,
  message: null,
};

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signout(state) {
      state.user = null;
      state.token = null;
      state.message = null;   
      state.error = null;    
      saveToken(null);
    },
    clearAuthMsg(state) {
      state.message = null;
      state.error = null;
    },
  },
  extraReducers: (b) => {
    const pending = (s) => { s.loading = true; s.error = null; s.message = null; };
    const rejected = (s, a) => { s.loading = false; s.error = a.payload?.message || 'Request failed'; };

    // --- SIGNUP ---
    b.addCase(signupThunk.pending, pending)
     .addCase(signupThunk.fulfilled, (s, a) => {
       s.loading = false;
       s.user = a.payload.user || null;
       const tok = a.payload?.accessToken ?? a.payload?.token ?? null; 
       s.token = tok;
       if (tok) saveToken(tok);
       s.message = 'Signup successful';
     })
     .addCase(signupThunk.rejected, rejected)

     .addCase(signinThunk.pending, pending)
     .addCase(signinThunk.fulfilled, (s, a) => {
       s.loading = false;
       s.user = a.payload.user || null;
       const tok = a.payload?.accessToken ?? a.payload?.token ?? null;
       s.token = tok;
       if (tok) saveToken(tok);
       s.message = 'Login successful';
     })
     .addCase(signinThunk.rejected, rejected)

     .addCase(forgotPasswordThunk.pending, pending)
     .addCase(forgotPasswordThunk.fulfilled, (s, a) => {
       s.loading = false;
       s.message = a.payload?.message || 'Reset link sent';
     })
     .addCase(forgotPasswordThunk.rejected, rejected)

     
     .addCase(resetPasswordThunk.pending, pending)
     .addCase(resetPasswordThunk.fulfilled, (s, a) => {
       s.loading = false;
       s.message = a.payload?.message || 'Password changed';
     })
     .addCase(resetPasswordThunk.rejected, rejected);
  }
});

export const { signout, clearAuthMsg } = slice.actions;
export default slice.reducer;
