// src/pages/Home.jsx
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import Hero from '../components/Hero'
import CategoryIcons from '../components/CategoryIcons'
import Dishes from '../components/Dishes'
import RestaurantSlider from '../components/RestaurantSlider'
import Discover from '../components/Discover'
import QualitySection from '../components/QualitySection'

import { fetchAllFoodItems } from '../features/menu/menuSlice'
import { fetchAllRestaurants } from '../features/restaurant/restaurantSlice'

export default function Home() {
  const dispatch = useDispatch()

  useEffect(() => {
    // fetch dishes and restaurants on mount
    dispatch(fetchAllFoodItems())
    dispatch(fetchAllRestaurants())
  }, [dispatch])

  return (
    <div>
      {/* Hero (transparent background) */}
      <Hero />

      {/* Categories */}
      <CategoryIcons />

      {/* Our Dishes section */}
      <section style={{ marginTop: 18 }}>
        <Dishes />
      </section>

     {/* Restaurants slider */}
<section style={{ marginTop: 60 }}>
  <RestaurantSlider />
</section>


      {/* Discover + Quality sections */}
      <Discover />
      <QualitySection />
    </div>
  )
}
