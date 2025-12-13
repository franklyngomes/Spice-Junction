import React from 'react'
import { Routes, Route, useLocation } from "react-router-dom"

import Navbar from './components/Navbar'
import Home from './pages/Home'
import Footer from './components/Footer'
import { CssBaseline } from '@mui/material'
import RestaurantDetails from './pages/RestaurantDetails'
import Menu from './pages/Menu' 
import AuthPage from './pages/AuthPage'   
import Cart from './pages/Cart'
import Checkout from "./pages/Checkout";
import ResetPassword from "./pages/ResetPassword";
import UserProfile from "./pages/UserProfile";
import BlogPage from './pages/BlogPage';
import BlogDetailPage from './pages/BlogDetailPage';
import PageSection from './pages/PageSection';
import AuthGlobalSnackbar from "./components/AuthGlobalSnackbar";

export default function App() {
  const { pathname } = useLocation()
  const isAuth = pathname.startsWith('/auth')   

  return (
    <>
      <CssBaseline />
      {!isAuth && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/restaurant-details/:id" element={<RestaurantDetails />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/auth/:mode" element={<AuthPage />} />
         <Route path="/reset-password" element={<ResetPassword />} />
         <Route path="/user-profile/:id" element={<UserProfile />} />
        <Route path="/cart" element={<Cart />} />
         <Route path="/checkout" element={<Checkout />} /> 
         <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:id" element={<BlogDetailPage />} />
        <Route path="/pages" element={<PageSection />} />
        
      </Routes>
       <AuthGlobalSnackbar />

      {!isAuth && <Footer />}
    </>
  )
}
