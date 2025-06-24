import { Container } from "react-bootstrap"
import { Link } from "react-router-dom"

function Footer() {
  return (
    <footer className="bg-dark text-light pt-5 pb-3 mt-5 border-top">
      <Container>
        <div className="row">
          <div className="col-md-4 mb-4">
            <h4 className="fw-bold">eBay Clone</h4>
            <p className="text-secondary">Your one-stop shop for everything you need.</p>
          </div>

          <div className="col-md-2 mb-4">
            <h6 className="text-uppercase fw-semibold mb-3">Shop</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/" className="text-decoration-none text-secondary hover-text-white">
                  Home
                </Link>
              </li>
              <li className="mb-2">
                <Link to="#" className="text-decoration-none text-secondary hover-text-white">
                  Products
                </Link>
              </li>
              <li className="mb-2">
                <Link to="#" className="text-decoration-none text-secondary hover-text-white">
                  Categories
                </Link>
              </li>
              <li className="mb-2">
                <Link to="#" className="text-decoration-none text-secondary hover-text-white">
                  Deals
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-md-2 mb-4">
            <h6 className="text-uppercase fw-semibold mb-3">Account</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/login" className="text-decoration-none text-secondary hover-text-white">
                  Login
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/register" className="text-decoration-none text-secondary hover-text-white">
                  Register
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/cart" className="text-decoration-none text-secondary hover-text-white">
                  Cart
                </Link>
              </li>
              <li className="mb-2">
                <Link to="#" className="text-decoration-none text-secondary hover-text-white">
                  Orders
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-md-4 mb-4">
            <h6 className="text-uppercase fw-semibold mb-3">Contact</h6>
            <ul className="list-unstyled text-secondary">
              <li className="mb-2">support@ebayclone.com</li>
              <li className="mb-2"> (84)869 564 460</li>
              <li className="mb-2"> FPT University - Ha Noi - Viet Nam</li>
            </ul>
          </div>
        </div>

        <hr className="border-secondary" />
        <div className="text-center">
          <p className="mb-0 text-secondary small">&copy; {new Date().getFullYear()} eBay Clone. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  )
}

export default Footer
