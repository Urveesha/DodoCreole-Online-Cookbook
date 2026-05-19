import { Link } from 'react-router-dom'

function Header() {
  return (
    <header className="site-header">

      <div className="container">

        <Link to="/" className="logo-wrapper">

          <img
            src="/images/logo.png"
            alt="DodoCreole Recipes Logo"
            className="site-logo"
          />

          <h1>DodoCreole Recipes</h1>

        </Link>

        <nav className="site-nav">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/blog">Recipes</Link></li>
            <li><Link to="/cpt">Cooking Tips</Link></li>
            <li><Link to="/page/about">About</Link></li>
            <li><Link to="/page/contact">Contact</Link></li>
          </ul>
        </nav>

      </div>

    </header>
  )
}

export default Header