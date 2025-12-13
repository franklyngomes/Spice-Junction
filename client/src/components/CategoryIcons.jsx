import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchSubCategories,
  setActiveSubCategoryId,
  clearActiveSubCategory,
} from '../features/category/categorySlice'
import { fetchFoodsBySubCategory } from '../features/menu/menuSlice'
import '../styles/Categories.css'
import getImageUrl from '../utils/getImageUrl'

export default function CategoryIcons() {
  const dispatch = useDispatch()
  const { items, loading, error, activeSubCategoryId } = useSelector(
    (state) => state.category
  )

  useEffect(() => {
    if (!items || items.length === 0) dispatch(fetchSubCategories())
  }, [dispatch])

  const categories = Array.isArray(items)
    ? items
    : items?.data && Array.isArray(items.data)
      ? items.data
      : []

  const handleClick = (cat) => {
    const id = cat._id || cat.id
    if (!id) return
    dispatch(setActiveSubCategoryId(id))
    dispatch(fetchFoodsBySubCategory(id))
  }

  if (loading)
    return <div style={{ textAlign: 'center', padding: 20 }}>Loading categories...</div>
  if (error)
    return <div style={{ color: 'red', textAlign: 'center' }}>Error: {String(error)}</div>
  if (!categories.length)
    return <div style={{ textAlign: 'center', padding: 12 }}>No categories found</div>

  return (
    <div className="categories-row">

      <div
        className="category-explore"
        onClick={() => dispatch(clearActiveSubCategory())}
        style={{ cursor: 'pointer' }}
      >
        <div className="explore-badge">
          50%<span>OFF</span>
        </div>
        <div className="explore-text">Explore →</div>
      </div>


      <button
        onClick={() => dispatch(clearActiveSubCategory())}
        style={{
          marginLeft: '12px',
          padding: '6px 12px',
          border: 'none',
          background: 'transparent',
          color: '#c62828',
          cursor: 'pointer',
          height: 40,
          alignSelf: 'center',
          fontWeight: 600,
          fontSize: '16px',
        }}
      >
        Reset All
      </button>



      <div className="category-list">
        {categories.map((cat) => {
          const src = getImageUrl(
            cat.image || cat.icon || cat.photo || cat.thumbnail || cat.img
          )
          const id = cat._id || cat.id
          const isActive = activeSubCategoryId === id

          return (
            <div
              key={id || cat.name}
              className={`category-item${isActive ? ' active' : ''}`}
              onClick={() => handleClick(cat)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleClick(cat)}
              style={{ cursor: 'pointer' }}
              aria-pressed={isActive}
              aria-label={`Show ${cat.name || cat.title}`}
            >
              <img
                src={src || 'https://via.placeholder.com/120'}
                alt={cat.name || cat.title || 'Category'}
              />
              <div className="category-title">{cat.name || cat.title}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
