import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchSubCategories } from '../features/category/categorySlice'
import '../styles/Categories.css'
import getImageUrl from '../utils/getImageUrl'

export default function CategoryIcons() {
  const dispatch = useDispatch()
  const { items, loading, error } = useSelector(state => state.category)

  useEffect(() => {
    if (!items || items.length === 0) dispatch(fetchSubCategories())
  }, [dispatch])

  const categories = Array.isArray(items) ? items : (items?.data && Array.isArray(items.data) ? items.data : [])

  if (loading) return <div style={{ textAlign: 'center', padding: 20 }}>Loading categories...</div>
  if (error) return <div style={{ color: 'red', textAlign: 'center' }}>Error: {String(error)}</div>
  if (!categories.length) return <div style={{ textAlign: 'center', padding: 12 }}>No categories found</div>

  return (
    <div className="categories-row">
      <div className="category-explore">
        <div className="explore-badge">50%<span>OFF</span></div>
        <div className="explore-text">Explore →</div>
      </div>

      <div className="category-list">
        {categories.map(cat => {
          // try several possible image fields used by different APIs
          const src = getImageUrl(cat.image || cat.icon || cat.photo || cat.thumbnail || cat.img)
          return (
            <div key={cat._id || cat.id || cat.name} className="category-item">
              <img src={src || 'https://via.placeholder.com/120'} alt={cat.name || cat.title || 'Category'} />
              <div className="category-title">{cat.name || cat.title}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
