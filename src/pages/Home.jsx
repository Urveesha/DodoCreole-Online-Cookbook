import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className="home-page">

      {/* HERO SECTION */}
      <section className="hero-section">
        <div className="hero-overlay">
          <h1>DodoCreole Recipes</h1>

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

      {/* WELCOME SECTION */}
      <section className="welcome-section">
        <h2>Welcome to Mauritian Cuisine</h2>

        <p>
          Mauritius is known for its vibrant mix of cultures and flavours.
          From crispy Gateau Piment to flavourful curries and refreshing
          Alouda, every recipe tells a story of tradition and comfort.
        </p>
      </section>

      {/* FEATURED RECIPES */}
      <section className="featured-section">
        <h2>Featured Recipes</h2>

        <div className="featured-grid">

          <div className="featured-card">
            <h3>Gateau Piment</h3>
            <p>
              Crispy chilli fritters made from split peas and herbs.
            </p>

            <Link to="/blog" className="card-btn">
              View Recipe
            </Link>
          </div>

          <div className="featured-card">
            <h3>Mauritian Biryani</h3>
            <p>
              A fragrant rice dish layered with spices, meat, and potatoes.
            </p>

            <Link to="/blog" className="card-btn">
              View Recipe
            </Link>
          </div>

          <div className="featured-card">
            <h3>Alouda</h3>
            <p>
              A sweet and refreshing Mauritian milk beverage.
            </p>

            <Link to="/blog" className="card-btn">
              View Recipe
            </Link>
          </div>

        </div>
      </section>

      {/* CALL TO ACTION */}
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