import { useState, useEffect } from 'react'
import PostCard from '../components/PostCard'
import ApiError from '../components/ApiError'

const API = import.meta.env.VITE_WP_API_URL

function BlogList() {
  const [posts, setPosts] = useState([])
  const [filteredPosts, setFilteredPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeCategory, setActiveCategory] = useState('all')

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${API}/posts?_embed&per_page=100`)

        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`)
        }

        const data = await response.json()

        setPosts(data)
        setFilteredPosts(data)

      } catch (err) {
        setError(err.message)

      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  const filterRecipes = categorySlug => {
    setActiveCategory(categorySlug)

    if (categorySlug === 'all') {
      setFilteredPosts(posts)
      return
    }

    const filtered = posts.filter(post => {
      const categories =
        post._embedded?.['wp:term']?.[0]?.map(cat => cat.slug) || []

      return categories.includes(categorySlug)
    })

    setFilteredPosts(filtered)
  }

  if (loading) return <p className="loading">Loading recipes...</p>

  if (error) {
    return <ApiError error={error} context="recipes" />
  }

  return (
    <section className="recipes-page">

      <div className="recipes-hero">
        <h1>Our Recipes</h1>

        <p>
          Explore authentic Mauritian dishes, snacks, sweets, and beverages
          inspired by island traditions and family kitchens.
        </p>
      </div>

      <div className="recipe-filters">

        <button
          className={activeCategory === 'all' ? 'active-filter' : ''}
          onClick={() => filterRecipes('all')}
        >
          All Recipes
        </button>

        <button
          className={activeCategory === 'snacks' ? 'active-filter' : ''}
          onClick={() => filterRecipes('snacks')}
        >
          Snacks
        </button>

        <button
          className={activeCategory === 'main-dish' ? 'active-filter' : ''}
          onClick={() => filterRecipes('main-dish')}
        >
          Main Dish
        </button>

        <button
          className={
            activeCategory === 'sweets-beverages'
              ? 'active-filter'
              : ''
          }
          onClick={() => filterRecipes('sweets-beverages')}
        >
          Sweets & Beverages
        </button>

      </div>

      {filteredPosts.length === 0 ? (
        <p>No recipes found.</p>
      ) : (
        <div className="posts-grid">
          {filteredPosts.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </section>
  )
}

export default BlogList