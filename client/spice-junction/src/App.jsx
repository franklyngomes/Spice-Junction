import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from './components/Navbar'
import Home from './pages/Home'

import Footer from './components/Footer'
import { CssBaseline } from '@mui/material'
import RestaurantDetails from './pages/RestaurantDetails'
import BlogPage from './pages/BlogPage';
import BlogDetailPage from './pages/BlogDetailPage';
import PageSection from './pages/PageSection';


export default function App() {
  return (
    <>
      <CssBaseline />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/restaurant-details/:id" element={<RestaurantDetails />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:id" element={<BlogDetailPage />} />
        <Route path="/pages" element={<PageSection />} />
      </Routes>

      <Footer />
    </>
  )
}
