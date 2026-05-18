import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import ApiError from '../components/ApiError'

const API = import.meta.env.VITE_WP_API_URL
const CPT = import.meta.env.VITE_CPT_SLUG

function CptList() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const tipImages = [
    '/images/tip-snacks.jpg',
    '/images/tip-curry.jpg',
    '/images/tip-gateau-piment.jpg'
  ]

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(`${API}/${CPT}?_embed`)
        if (!response.ok) throw new Error(`HTTP error: ${response.status}`)
        const data = await response.json()
        setItems(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchItems()
  }, [])

  if (loading) return <p className="loading">Loading cooking tips...</p>
  if (error) return <ApiError error={error} context="cooking tips" />

  return (
    <section className="tips-page">

      <section className="tips-hero">
        <div className="tips-hero-overlay">
          <h1>Cooking Tips</h1>

          <p>
            Simple Mauritian kitchen tricks to help you prepare crispier snacks,
            richer curries, and more flavourful homemade dishes.
          </p>
        </div>
      </section>

      <section className="tips-intro">
        <h2>Kitchen Wisdom for Better Mauritian Cooking</h2>

        <p>
          These quick tips are designed to guide beginners and home cooks with
          useful techniques for texture, flavour, and preparation.
        </p>
      </section>

      {items.length === 0 ? (
        <p>No cooking tips found. Add entries to your Custom Post Type in WordPress first.</p>
      ) : (
        <div className="tips-grid">
          {items.map((item, index) => {
            const excerpt = item.content.rendered
              .replace(/<\/?[^>]+(>|$)/g, '')
              .trim()
              .slice(0, 130)

            return (
              <div
                key={item.id}
                className="tip-card"
                style={{
                  backgroundImage: `url(${tipImages[index % tipImages.length]})`
                }}
              >
                <div className="tip-card-overlay">
                  <span className="tip-badge">Kitchen Tip</span>

                  <h2>{item.title.rendered}</h2>

                  <p>
                    {excerpt}
                    {excerpt.length >= 130 ? '...' : ''}
                  </p>

                  <Link to={`/cpt/${item.id}`} className="tip-btn">
                    View Tip →
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </section>
  )
}

export default CptList