import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import ApiError from '../components/ApiError'

const API = import.meta.env.VITE_WP_API_URL
const CPT = import.meta.env.VITE_CPT_SLUG

function CptDetail() {
  const { id } = useParams()
  const [item, setItem] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await fetch(`${API}/${CPT}/${id}?_embed`)
        if (!response.ok) throw new Error(`HTTP error: ${response.status}`)
        const data = await response.json()
        setItem(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchItem()
  }, [id])

  if (loading) return <p className="loading">Loading cooking tip...</p>
  if (error) return <ApiError error={error} context="cooking tip" />
  if (!item) return <p className="error">Cooking tip not found.</p>

  return (
    <article className="tip-detail-page">
      <Link to="/cpt" className="back-link tip-back-link">
        ← Back to Cooking Tips
      </Link>

      <section className="tip-detail-hero">
        <span className="tip-detail-label">Mauritian Kitchen Tip</span>

        <h1 dangerouslySetInnerHTML={{ __html: item.title.rendered }} />

        <p>
          A simple cooking guide to help you improve flavour, texture, and
          confidence in the kitchen.
        </p>
      </section>

      <div className="tip-stats">
  <span>👁 1.2K</span>
  <span>★ Beginner Friendly</span>
  <span>⏱ 2 min read</span>
</div>

      <section className="tip-detail-content">
        

        <div
          className="tip-content-box"
          dangerouslySetInnerHTML={{ __html: item.content.rendered }}
        />
      </section>

      <section className="tip-reminder-box">
        <h2>Helpful Reminder</h2>
        <p>
          Small cooking details can make a big difference. Take your time,
          taste as you go, and adjust flavours based on your preference.
        </p>
      </section>
    </article>
  )
}

export default CptDetail