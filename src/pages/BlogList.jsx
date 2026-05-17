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
  const [searchTerm, setSearchTerm] = useState('')

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

  const filterRecipes = (categorySlug, search = searchTerm) => {
    setActiveCategory(categorySlug)

    let filtered = posts

    if (categorySlug !== 'all') {
      filtered = filtered.filter(post => {
        const categories =
          post._embedded?.['wp:term']?.[0]?.map(cat => cat.slug) || []

        return categories.includes(categorySlug)
      })
    }

    if (search.trim() !== '') {
      filtered = filtered.filter(post =>
        post.title.rendered
          .toLowerCase()
          .includes(search.toLowerCase())
      )
    }

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
          className={activeCategory === 'sweets-beverages' ? 'active-filter' : ''}
          onClick={() => filterRecipes('sweets-beverages')}
        >
          Sweets & Beverages
        </button>
      </div>

      <div className="recipe-search">
        <input
          type="text"
          placeholder="Search Mauritian recipes..."
          value={searchTerm}
          onChange={e => {
            setSearchTerm(e.target.value)
            filterRecipes(activeCategory, e.target.value)
          }}
        />
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