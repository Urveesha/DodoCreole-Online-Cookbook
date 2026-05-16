import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

function Home() {
  const finalWord = 'Recipes'
  const [displayWord, setDisplayWord] = useState(finalWord)

  useEffect(() => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    let iteration = 0

    const interval = setInterval(() => {
      setDisplayWord(
        finalWord
          .split('')
          .map((letter, index) => {
            if (index < iteration) return finalWord[index]
            return chars[Math.floor(Math.random() * chars.length)]
          })
          .join('')
      )

      if (iteration >= finalWord.length) clearInterval(interval)
      iteration += 0.35
    }, 55)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-overlay">
          <h1>
            DodoCreole <br />
            <span>{displayWord}</span>
          </h1>

          <p>
            Discover the rich flavours of Mauritius through traditional
            street food, family dishes, refreshing drinks, and authentic
            island recipes made with love.
          </p>

          <div className="hero-buttons">
            <Link to="/blog" className="hero-btn">
              Explore Recipes
            </Link>

            <Link to="/cpt" className="hero-btn secondary-btn">
              Cooking Tips
            </Link>
          </div>
        </div>
      </section>

      <section className="welcome-section">
        <h2>Welcome to Mauritian Cuisine</h2>

        <p>
          Mauritius is known for its vibrant mix of cultures and flavours.
          From crispy Gateau Piment to flavourful curries and refreshing
          Alouda, every recipe tells a story of tradition and comfort.
        </p>

        <Link to="/page/about" className="about-btn">
          Learn More About Us
        </Link>
      </section>

      <section className="featured-section">
        <h2>Mauritians' Favorites</h2>

        <div className="featured-grid">

          <div
            className="featured-card featured-bg"
            style={{ backgroundImage: "url('/images/gateau-piment.jpg')" }}
          >
            <div className="featured-overlay">
              <h3>Gateau Piment</h3>

              <p>
                Crispy chilli fritters made from split peas and herbs.
              </p>

              <Link to="/blog" className="card-btn">
                View Recipes
              </Link>
            </div>
          </div>

          <div
            className="featured-card featured-bg"
            style={{ backgroundImage: "url('/images/biryani.jpg')" }}
          >
            <div className="featured-overlay">
              <h3>Mauritian Biryani</h3>

              <p>
                A fragrant rice dish layered with spices, meat, and potatoes.
              </p>

              <Link to="/blog" className="card-btn">
                View Recipes
              </Link>
            </div>
          </div>

          <div
            className="featured-card featured-bg"
            style={{ backgroundImage: "url('/images/alouda.jpg')" }}
          >
            <div className="featured-overlay">
              <h3>Alouda</h3>

              <p>
                A sweet and refreshing Mauritian milk beverage.
              </p>

              <Link to="/blog" className="card-btn">
                View Recipes
              </Link>
            </div>
          </div>

        </div>
      </section>

      <section className="cta-section">
        <h2>Ready to Start Cooking?</h2>

        <p>
          Explore authentic Mauritian recipes and cooking tips today.
        </p>

        <Link to="/blog" className="cta-btn">
          Browse All Recipes
        </Link>
      </section>
    </div>
  )
}

export default Home