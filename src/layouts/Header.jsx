"use client"

import { useState, useEffect } from "react"
import { Container, Nav, Navbar, Badge, Dropdown } from "react-bootstrap"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { ShoppingCart, User, LogOut, Settings, Package, Users } from "lucide-react"

function Header() {
  const [user, setUser] = useState(null)
  const [cartCount, setCartCount] = useState(0)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem("user")
    if (userData) {
      setUser(JSON.parse(userData))
    }

    // Update cart count
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]")
      setCartCount(cart.reduce((total, item) => total + item.quantity, 0))
    }

    updateCartCount()

    // Listen for storage events to update cart count
    window.addEventListener("storage", updateCartCount)

    // Custom event for cart updates
    const handleCartUpdate = () => {
      updateCartCount()
    }

    window.addEventListener("cartUpdated", handleCartUpdate)

    return () => {
      window.removeEventListener("storage", updateCartCount)
      window.removeEventListener("cartUpdated", handleCartUpdate)
    }
  }, [])
  const handleLogout = () => {
    localStorage.removeItem("user")
    setUser(null)
    navigate("/login")
  }

  return (
    <Navbar bg="secondary" variant="dark" expand="lg" sticky="top" className="mb-4">
      <Container>
        <Navbar.Brand as={Link} to="/">
          eBay Clone
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" active={location.pathname === "/"}>
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="faqs" active={location.pathname === "/faqs"}>
              FAQs
            </Nav.Link>
            <Nav.Link as={Link} to="contact" active={location.pathname === "/contact"}>
              Contact
            </Nav.Link>
          </Nav>
          <Nav>
            {user ? (
              <>
                <Nav.Link as={Link} to="/cart" className="position-relative">
                  <ShoppingCart size={20} />
                  {cartCount > 0 && (
                    <Badge bg="danger" pill className="position-absolute top-0 start-100 translate-middle">
                      {cartCount}
                    </Badge>
                  )}
                </Nav.Link>
                <Dropdown align="end">
                  <Dropdown.Toggle as={Nav.Link} className="d-flex align-items-center">
                    <User size={20} className="me-1" />
                    {user.name}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item as={Link} to="/profile">
                      <User size={16} className="me-2" />
                      Profile
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to="/change-password">
                      <Settings size={16} className="me-2" />
                      Change Password
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={handleLogout}>
                      <LogOut size={16} className="me-2" />
                      Logout
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login" active={location.pathname === "/login"}>
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/register" active={location.pathname === "/register"}>
                  Register
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header

