function Footer() {
  return (
    <footer className="site-footer">

      <div className="footer-container">

        <div className="footer-brand">

          <div className="footer-logo-group">
            <img
              src="/images/logo.png"
              alt="DodoCreole Recipes Logo"
              className="footer-logo"
            />

            <h2>DodoCreole Recipes</h2>
          </div>

          <p>
            Bringing authentic Mauritian flavours, family recipes,
            and island comfort food to your kitchen.
          </p>

        </div>

        <div className="footer-contact">

          <h3>Contact</h3>

          <p>dodoreolerecipes@gmail.com</p>
          <p>+230 5757 1234</p>
          <p>Mauritius</p>

        </div>

      </div>

      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} DodoCreole Recipes • Built with React + WordPress
        </p>
      </div>

    </footer>
  )
}

export default Footer