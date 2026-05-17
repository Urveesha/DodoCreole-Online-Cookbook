import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import ApiError from '../components/ApiError'

const API = import.meta.env.VITE_WP_API_URL

function SinglePost() {
  const { id } = useParams()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [checkedItems, setCheckedItems] = useState([])

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`${API}/posts/${id}?_embed`)
        if (!response.ok) throw new Error(`HTTP error: ${response.status}`)
        const data = await response.json()
        setPost(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchPost()
  }, [id])

  if (loading) return <p className="loading">Loading recipe...</p>
  if (error) return <ApiError error={error} context="recipe" />
  if (!post) return <p className="error">Recipe not found.</p>

  const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url

  const parser = new DOMParser()
  const doc = parser.parseFromString(post.content.rendered, 'text/html')

  const allText = doc.body.textContent || ''

 const getMetaValue = label => {
  const text = allText.replace(/\s+/g, ' ')

  const regex = new RegExp(
    `${label}:\\s*(.*?)\\s*(?=Servings:|Prep Time:|Cook Time:|Total Time:|Ingredients:|Instructions:|$)`,
    'i'
  )

  const match = text.match(regex)

  return match ? match[1].trim() : 'Not specified'
}

  const servings = getMetaValue('Servings')
  const prepTime = getMetaValue('Prep Time')
  const cookTime = getMetaValue('Cook Time')
  const totalTime = getMetaValue('Total Time')

  const paragraphs = Array.from(doc.querySelectorAll('p')).map(p =>
    p.textContent.trim()
  )

  const description = paragraphs.find(
    text =>
      text &&
      !text.toLowerCase().includes('servings') &&
      !text.toLowerCase().includes('prep time') &&
      !text.toLowerCase().includes('cook time') &&
      !text.toLowerCase().includes('total time') &&
      !text.toLowerCase().includes('ingredients') &&
      !text.toLowerCase().includes('instructions')
  )

  const ingredients = Array.from(doc.querySelectorAll('ul li')).map(li =>
    li.textContent.trim()
  )

  const instructions = Array.from(doc.querySelectorAll('ol li')).map(li =>
    li.textContent.trim()
  )

  const toggleIngredient = index => {
    setCheckedItems(prev =>
      prev.includes(index)
        ? prev.filter(item => item !== index)
        : [...prev, index]
    )
  }

  return (
    <article className="single-post recipe-detail">
      <Link to="/blog" className="back-link">
        ← Back to Recipes
      </Link>

      {featuredImage && (
        <img
          src={featuredImage}
          alt={post.title.rendered}
          className="featured-image recipe-main-image"
        />
      )}

      <h1 dangerouslySetInnerHTML={{ __html: post.title.rendered }} />

      <div className="recipe-meta">
        <div className="meta-item">
          <span className="meta-icon">
            <img src="/images/servings.png" alt="Servings" />
          </span>

          <div>
            <strong>Servings</strong>
            <p>{servings}</p>
          </div>
        </div>

        <div className="meta-item">
          <span className="meta-icon">
            <img src="/images/prep.png" alt="Prep time" />
          </span>

          <div>
            <strong>Prep Time</strong>
            <p>{prepTime}</p>
          </div>
        </div>

        <div className="meta-item">
          <span className="meta-icon">
            <img src="/images/cook.png" alt="Cook time" />
          </span>

          <div>
            <strong>Cook Time</strong>
            <p>{cookTime}</p>
          </div>
        </div>

        <div className="meta-item">
          <span className="meta-icon">
            <img src="/images/total-time.png" alt="Total time" />
          </span>

          <div>
            <strong>Total Time</strong>
            <p>{totalTime}</p>
          </div>
        </div>
      </div>

      {description && (
        <p className="recipe-description">{description}</p>
      )}

      <section className="recipe-box">
        <h2>Ingredients</h2>

        <div className="ingredients-grid">
          {ingredients.map((ingredient, index) => (
            <button
              key={index}
              className={
                checkedItems.includes(index)
                  ? 'ingredient-item checked'
                  : 'ingredient-item'
              }
              onClick={() => toggleIngredient(index)}
            >
              <span>{checkedItems.includes(index) ? '✓' : '+'}</span>
              {ingredient}
            </button>
          ))}
        </div>
      </section>

      <section className="recipe-box">
        <h2>Instructions</h2>

        <div className="instructions-list">
          {instructions.map((step, index) => (
            <div className="instruction-step" key={index}>
              <span>{index + 1}</span>
              <p>{step}</p>
            </div>
          ))}
        </div>
      </section>
    </article>
  )
}

export default SinglePost