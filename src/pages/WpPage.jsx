import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import ApiError from '../components/ApiError'

const API = import.meta.env.VITE_WP_API_URL

function WpPage() {
  const { slug } = useParams()

  const [page, setPage] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchPage = async () => {
      try {
        const response = await fetch(`${API}/pages?slug=${slug}`)

        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`)
        }

        const data = await response.json()

        if (data.length === 0) {
          throw new Error('Page not found')
        }

        setPage(data[0])

      } catch (err) {
        setError(err.message)

      } finally {
        setLoading(false)
      }
    }

    fetchPage()
  }, [slug])

  if (loading) return <p className="loading">Loading...</p>

  if (error) {
    return <ApiError error={error} context="page" />
  }

  if (slug === 'about') {
    return (
      <section className="about-page">

        <section className="about-hero">
          <div className="about-hero-overlay">

            <h1>About Us!</h1>

            <p>Oh hi there!</p>

            <p>
              We’re DodoCreole Recipes, a Mauritian recipe space celebrating island flavours,
              family traditions, and the comfort of home-cooked food.
            </p>

          </div>
        </section>

        <section className="about-story-section">

          <div className="about-story-image">
            <img
              src="/images/about-story.jpg"
              alt="Mauritian cooking"
            />
          </div>

          <div className="about-story-content">

            <h2>Our Story</h2>

            <p>
              DodoCreole Recipes was created to share the warmth and richness of
              Mauritian cuisine. From crispy street snacks to comforting curries,
              the website brings together recipes that reflect the island’s
              multicultural food heritage transmitted from generations.
            </p>

            <p>
              The goal is to make Mauritian cooking easy to explore, whether
              someone is trying a traditional dish for the first time or
              rediscovering flavours from home.
            </p>

          </div>

        </section>

        <section className="about-mini-values-section">

          <div className="about-mini-values">

            <div className="about-mini-card">
              <h3>Authentic Flavours</h3>

              <p>
                Inspired by local spices, familiar dishes,
                and everyday island cooking.
              </p>
            </div>

            <div className="about-mini-card">
              <h3>Simple Guidance</h3>

              <p>
                Clear ingredients and steps help users cook with confidence.
              </p>
            </div>

            <div className="about-mini-card">
              <h3>Culture & Comfort</h3>

              <p>
                Every dish celebrates the cultural mix
                that makes Mauritius special.
              </p>
            </div>

          </div>

        </section>

        <section className="about-highlight">

          <h2>Why Mauritian Cuisine?</h2>

          <p>
            Mauritian food blends Indian, Chinese, Creole, French, and African
            influences. This mix creates dishes full of colour, spice, and
            personality - from Gateau Piment and Vindaye Poisson to Alouda and
            Biryani.
          </p>

          <Link to="/blog" className="cta-btn">
            Explore Recipes
          </Link>

        </section>

      </section>
    )
  }

  if (slug === 'contact') {
    return (
      <section className="contact-page">

        <section className="contact-split-hero">

          <div className="contact-hero-text">

            <span>Contact</span>

            <h1>Get in touch with us</h1>

            <p>
              Have a question, recipe suggestion, or feedback?
              We would love to hear from you.
            </p>

          </div>

          <div className="contact-hero-image">

            <img
              src="/images/contact-hero.jpg"
              alt="Contact DodoCreole Recipes"
            />

          </div>

        </section>

        <section className="contact-cards-section">

          <h2>Contact us</h2>

          <div className="contact-cards-grid">

            <div className="contact-small-card">
              <h3>✉︎ Email</h3>

              <p>dodocreolerecipes@gmail.com</p>
            </div>

            <div className="contact-small-card">
              <h3>☏ Phone</h3>

              <p>+230 5757 1234</p>
            </div>

            <div className="contact-small-card">
              <h3>⚲ Location</h3>

              <p>Mauritius</p>
            </div>

            <div className="contact-small-card">
              <h3>𐂐 Recipe Suggestions</h3>

              <p>
                Share your favourite Mauritian dishes and cooking ideas with us.
              </p>
            </div>

            <div className="contact-small-card">
              <h3>✎ Feedback</h3>

              <p>
                Tell us how we can improve DodoCreole Recipes.
              </p>
            </div>

            <div className="contact-small-card">
              <h3>ᯤ Connect With Us</h3>

              <p>
                Follow us for Mauritian recipes,
                island flavours, and cooking inspiration.
              </p>
            </div>

          </div>

        </section>

      </section>
    )
  }

  return (
    <article className="single-post">

      <h1>{page.title.rendered}</h1>

      <div
        className="post-content"
        dangerouslySetInnerHTML={{ __html: page.content.rendered }}
      />

    </article>
  )
}

export default WpPage