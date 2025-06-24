"use client"
import { Row, Col, Card, Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

function ProductList({ products }) {
  const navigate = useNavigate()

  const handleViewDetails = (productId) => {
    navigate(`/product/${productId}`)
  }

  const handleAddToCart = (product) => {
    // Get existing cart from localStorage
    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]")

    // Check if product already exists in cart
    const existingProductIndex = existingCart.findIndex((item) => item.id === product.id)

    if (existingProductIndex >= 0) {
      // Product exists, increase quantity
      existingCart[existingProductIndex].quantity += 1
    } else {
      // Product doesn't exist, add to cart with quantity 1
      existingCart.push({
        ...product,
        quantity: 1,
      })
    }

    // Save updated cart to localStorage
    localStorage.setItem("cart", JSON.stringify(existingCart))

    // Dispatch custom event for cart update
    window.dispatchEvent(new Event("cartUpdated"))

    // Show success message (you could use a toast notification here)
    alert("Product added to cart!")
  }

  return (
    <Row>
      {products.length === 0 ? (
        <Col>
          <p>No products found.</p>
        </Col>
      ) : (
        products.map((product) => (
          <Col key={product.id} sm={6} md={4} lg={3} className="mb-4">
            <Card className="h-200 product-card">
              <div className="product-image-container">
                <img
                  src={product.image || "https://via.placeholder.com/200"}
                  alt={product.name}
                  className="card-img-top p-2"
                  style={{ height: "300px", objectFit: "cover" }}
                />
              </div>
              <Card.Body className="d-flex flex-column">
                <Card.Title className="product-title">{product.name}</Card.Title>
                <Card.Text className="text-muted mb-1">{product.category}</Card.Text>
                <Card.Text className="product-price mb-3">${product.price.toFixed(2)}</Card.Text>
                <div className="mt-auto d-flex gap-2">
                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() => handleViewDetails(product.id)}
                    className="flex-grow-1"
                  >
                    Details
                  </Button>
                  <Button variant="primary" size="sm" onClick={() => handleAddToCart(product)} className="flex-grow-1">
                    Add to Cart
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))
      )}
    </Row>
  )
}

export default ProductList

