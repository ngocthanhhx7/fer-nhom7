"use client"

import { useState, useEffect } from "react"
import { Container, Row, Col, Card, Button, ListGroup, Badge } from "react-bootstrap"
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios"

function ProductDetail() {
  const [product, setProduct] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const [quantity, setQuantity] = useState(1)
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:9999/products/${id}`)
        setProduct(response.data)
        setIsLoading(false)
      } catch (error) {
        console.error("Error fetching product:", error)
        setError("Product not found or an error occurred")
        setIsLoading(false)
      }
    }

    if (id) {
      fetchProduct()
    }
  }, [id])

  const handleAddToCart = () => {
    if (!product) return

    // Get existing cart from localStorage
    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]")

    // Check if product already exists in cart
    const existingProductIndex = existingCart.findIndex((item) => item.id === product.id)

    if (existingProductIndex >= 0) {
      // Product exists, increase quantity
      existingCart[existingProductIndex].quantity += quantity
    } else {
      // Product doesn't exist, add to cart with specified quantity
      existingCart.push({
        ...product,
        quantity,
      })
    }

    // Save updated cart to localStorage
    localStorage.setItem("cart", JSON.stringify(existingCart))

    // Dispatch custom event for cart update
    window.dispatchEvent(new Event("cartUpdated"))

    // Show success message
    alert(`${quantity} item(s) added to cart!`)
  }

  const handleBuyNow = () => {
    handleAddToCart()
    navigate("/cart")
  }

  if (isLoading) {
    return (
      <Container className="py-5">
        <p>Loading product details...</p>
      </Container>
    )
  }

  if (error) {
    return (
      <Container className="py-5">
        <div className="alert alert-danger">{error}</div>
        <Button variant="primary" onClick={() => navigate("/")}>
          Back to Home
        </Button>
      </Container>
    )
  }

  if (!product) {
    return (
      <Container className="py-5">
        <div className="alert alert-warning">Product not found</div>
        <Button variant="primary" onClick={() => navigate("/")}>
          Back to Home
        </Button>
      </Container>
    )
  }

  return (
    <Container className="py-5">
      <Button variant="outline-secondary" className="mb-4" onClick={() => navigate(-1)}>
        &larr; Back
      </Button>

      <Row>
        <Col md={6} className="mb-4">
          <Card>
            <img
              src={product.image || "https://via.placeholder.com/400"}
              alt={product.name}
              className="card-img-top p-3"
            />
          </Card>
        </Col>

        <Col md={6}>
          <h1 className="mb-3">{product.name}</h1>

          <div className="mb-3">
            <Badge bg="secondary" className="me-2">
              {product.category}
            </Badge>
            {product.featured && <Badge bg="primary">Featured</Badge>}
          </div>

          <h2 className="text-primary mb-4">${product.price.toFixed(2)}</h2>

          <div className="mb-4">
            <p>{product.description || "No description available for this product."}</p>
          </div>

          <Card className="mb-4">
            <Card.Body>
              <div className="d-flex align-items-center mb-3">
                <label htmlFor="quantity" className="me-3">
                  Quantity:
                </label>
                <input
                  id="quantity"
                  type="number"
                  className="form-control"
                  style={{ width: "80px" }}
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Number.parseInt(e.target.value) || 1)}
                />
              </div>

              <div className="d-grid gap-2">
                <Button variant="primary" size="lg" onClick={handleAddToCart}>
                  Add to Cart
                </Button>
                <Button variant="outline-primary" size="lg" onClick={handleBuyNow}>
                  Buy Now
                </Button>
              </div>
            </Card.Body>
          </Card>

          <Card>
            <Card.Header>Product Details</Card.Header>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <strong>Product ID:</strong> {product.id}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Category:</strong> {product.category}
              </ListGroup.Item>
              {product.brand && (
                <ListGroup.Item>
                  <strong>Brand:</strong> {product.brand}
                </ListGroup.Item>
              )}
              {product.stock !== undefined && (
                <ListGroup.Item>
                  <strong>In Stock:</strong> {product.stock > 0 ? `Yes (${product.stock})` : "No"}
                </ListGroup.Item>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default ProductDetail

