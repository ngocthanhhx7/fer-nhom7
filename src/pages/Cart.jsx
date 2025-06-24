"use client"

import { useState, useEffect } from "react"
import { Container, Row, Col, Card, Button, Table, Form } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { Trash } from "lucide-react"

function Cart() {
  const [cartItems, setCartItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    // Load cart from localStorage
    const cart = JSON.parse(localStorage.getItem("cart") || "[]")
    setCartItems(cart)
    setIsLoading(false)
  }, [])

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return

    const updatedCart = cartItems.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item))

    setCartItems(updatedCart)
    localStorage.setItem("cart", JSON.stringify(updatedCart))

    // Dispatch custom event for cart update
    window.dispatchEvent(new Event("cartUpdated"))
  }

  const removeItem = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id)
    setCartItems(updatedCart)
    localStorage.setItem("cart", JSON.stringify(updatedCart))

    // Dispatch custom event for cart update
    window.dispatchEvent(new Event("cartUpdated"))
  }

  const clearCart = () => {
    setCartItems([])
    localStorage.setItem("cart", JSON.stringify([]))

    // Dispatch custom event for cart update
    window.dispatchEvent(new Event("cartUpdated"))
  }

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const calculateTax = () => {
    return calculateSubtotal() * 0.1 // 10% tax
  }

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax()
  }

  const handleCheckout = () => {
    navigate("/checkout")
  }

  if (isLoading) {
    return (
      <Container className="py-5">
        <p>Loading cart...</p>
      </Container>
    )
  }

  return (
    <Container className="py-5">
      <h1 className="mb-4">Your Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <div className="text-center py-5">
          <h3>Your cart is empty</h3>
          <p className="mb-4">Looks like you haven't added anything to your cart yet.</p>
          <Button variant="primary" onClick={() => navigate("/")}>
            Continue Shopping
          </Button>
        </div>
      ) : (
        <Row>
          <Col lg={8}>
            <Card className="mb-4">
              <Card.Body>
                <Table responsive>
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Total</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item) => (
                      <tr key={item.id}>
                        <td>
                          <div className="d-flex align-items-center">
                            <img
                              src={item.image || "https://via.placeholder.com/60"}
                              alt={item.name}
                              width="60"
                              height="60"
                              className="me-3"
                            />
                            <div>
                              <h6 className="mb-0">{item.name}</h6>
                              <small className="text-muted">{item.category}</small>
                            </div>
                          </div>
                        </td>
                        <td>${item.price.toFixed(2)}</td>
                        <td style={{ width: "120px" }}>
                          <div className="d-flex align-items-center">
                            <Button
                              variant="outline-secondary"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              -
                            </Button>
                            <Form.Control
                              type="number"
                              min="1"
                              value={item.quantity}
                              onChange={(e) => updateQuantity(item.id, Number.parseInt(e.target.value) || 1)}
                              className="mx-2 text-center"
                              style={{ width: "50px" }}
                            />
                            <Button
                              variant="outline-secondary"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              +
                            </Button>
                          </div>
                        </td>
                        <td>${(item.price * item.quantity).toFixed(2)}</td>
                        <td>
                          <Button variant="outline-danger" size="sm" onClick={() => removeItem(item.id)}>
                            <Trash size={16} />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>

                <div className="d-flex justify-content-between mt-3">
                  <Button variant="outline-secondary" onClick={() => navigate("/")}>
                    Continue Shopping
                  </Button>
                  <Button variant="outline-danger" onClick={clearCart}>
                    Clear Cart
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={4}>
            <Card>
              <Card.Header>
                <h5 className="mb-0">Order Summary</h5>
              </Card.Header>
              <Card.Body>
                <div className="d-flex justify-content-between mb-2">
                  <span>Subtotal:</span>
                  <span>${calculateSubtotal().toFixed(2)}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Tax (10%):</span>
                  <span>${calculateTax().toFixed(2)}</span>
                </div>
                <hr />
                <div className="d-flex justify-content-between mb-4">
                  <strong>Total:</strong>
                  <strong>${calculateTotal().toFixed(2)}</strong>
                </div>
                <Button variant="primary" size="lg" className="w-100" onClick={handleCheckout}>
                  Buy
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  )
}

export default Cart

