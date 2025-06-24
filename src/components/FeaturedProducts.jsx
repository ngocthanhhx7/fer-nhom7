"use client"
import { Row, Col, Card, Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

function FeaturedProducts({ products }) {
  const navigate = useNavigate()

  return (
    <Row className="mb-4">
      {products.map((product) => (
        <Col key={product.id} md={3} className="mb-3">
          <Card className="h-100 featured-product">
            <div className="featured-badge">Featured</div>
            <img
              src={product.image || "https://via.placeholder.com/150"}
              alt={product.name}
              className="card-img-top p-2"
              style={{ height: "300px", objectFit: "cover" }}
            />
            <Card.Body className="d-flex flex-column">
              <Card.Title className="product-title">{product.name}</Card.Title>
              <Card.Text className="product-price mb-3">${product.price.toFixed(2)}</Card.Text>
              <Button
                variant="outline-primary"
                size="sm"
                onClick={() => navigate(`/product/${product.id}`)}
                className="mt-auto"
              >
                View Details
              </Button>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  )
}

export default FeaturedProducts

