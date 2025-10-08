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
   
    dispatch(fetchAllFoodItems())
    dispatch(fetchAllRestaurants())
  }, [dispatch])

  return (
    <div>
     
      <Hero />


      <CategoryIcons />

      
      <section style={{ marginTop: 18 }}>
        <Dishes />
      </section>

     
<section style={{ marginTop: 60 }}>
  <RestaurantSlider />
</section>


      
      <Discover />

<section className="between-strip" aria-hidden="true" />

      <QualitySection />
    </div>
  )
}
