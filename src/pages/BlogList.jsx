import { useState, useEffect } from 'react'
import PostCard from '../components/PostCard'
import ApiError from '../components/ApiError'

const API = import.meta.env.VITE_WP_API_URL

function BlogList() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${API}/posts?_embed&per_page=100`)
        if (!response.ok) throw new Error(`HTTP error: ${response.status}`)
        const data = await response.json()
        setPosts(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  if (loading) return <p className="loading">Loading recipes...</p>
  if (error) return <ApiError error={error} context="recipes" />

  return (
    <section className="recipes-page">
      <div className="recipes-hero">
        <h1>Our Recipes</h1>
        <p>
          Explore authentic Mauritian dishes, snacks, sweets, and beverages
          inspired by island traditions and family kitchens.
        </p>
      </div>

      {posts.length === 0 ? (
        <p>No recipes found. Add some posts in WordPress first.</p>
      ) : (
        <div className="posts-grid">
          {posts.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </section>
  )
}

export default BlogList