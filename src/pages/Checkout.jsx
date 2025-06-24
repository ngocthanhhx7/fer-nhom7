import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Checkout() {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    cardName: '',
    cardNumber: '',
    expDate: '',
    cvv: ''
  });
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const user = localStorage.getItem('user');
    if (!user) {
      navigate('/login');
      return;
    }
    
    // Load cart from localStorage
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    
    if (cart.length === 0) {
      navigate('/cart');
      return;
    }
    
    setCartItems(cart);
    setIsLoading(false);
    
    // Pre-fill form with user data if available
    const userData = JSON.parse(user);
    if (userData) {
      setFormData(prev => ({
        ...prev,
        email: userData.email || '',
        firstName: userData.name ? userData.name.split(' ')[0] : '',
        lastName: userData.name ? userData.name.split(' ').slice(1).join(' ') : ''
      }));
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const calculateTax = () => {
    return calculateSubtotal() * 0.1; // 10% tax
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Get user info
      const userInfo = JSON.parse(localStorage.getItem('user') || '{}');
      
      // Create order object
      const order = {
        id: `ORD-${Date.now()}`,
        userId: userInfo.id,
        items: cartItems,
        customer: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode
        },
        payment: {
          cardName: formData.cardName,
          cardNumber: formData.cardNumber.slice(-4).padStart(formData.cardNumber.length, '*'),
          expDate: formData.expDate
        },
        subtotal: calculateSubtotal(),
        tax: calculateTax(),
        total: calculateTotal(),
        status: 'pending',
        date: new Date().toISOString()
      };
      
      // Save order to API using axios
      const response = await axios.post('http://localhost:9999/orders', order);
      
      // Save order ID for reference
      setOrderId(response.data.id);
      
      // Clear cart
      localStorage.setItem('cart', JSON.stringify([]));
      
      // Dispatch custom event for cart update
      window.dispatchEvent(new Event('cartUpdated'));
      
      // Show success message
      setOrderPlaced(true);
      setIsSubmitting(false);
    } catch (error) {
      console.error('Error placing order:', error);
      alert('An error occurred while placing your order. Please try again.');
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <Container className="py-5">
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
          <p className="mt-2">Loading checkout...</p>
        </div>
      </Container>
    );
  }

  if (orderPlaced) {
    return (
      <Container className="py-5">
        <Card className="text-center p-5 shadow-lg border-0">
          <Card.Body>
            <div className="mb-4">
              <div className="check-icon">✓</div>
            </div>
            <h2 className="mb-3">Order Placed Successfully!</h2>
            <p className="mb-2">
              Thank you for your purchase. Your order has been received and is being processed.
            </p>
            <p className="mb-4 text-muted">
              Order ID: <strong>{orderId}</strong>
            </p>
            <div className="d-flex justify-content-center gap-3">
              <Button variant="primary" onClick={() => navigate('/')}>
                Continue Shopping
              </Button>
              <Button variant="outline-primary" onClick={() => navigate('/orders')}>
                View Orders
              </Button>
            </div>
          </Card.Body>
        </Card>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <h1 className="mb-4 fw-bold">Checkout</h1>
      
      <Row>
        <Col lg={8}>
          <Card className="mb-4 shadow-sm border-0">
            <Card.Body className="p-4">
              <h4 className="mb-4 fw-bold">Shipping Information</h4>
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={6} className="mb-3">
                    <Form.Group>
                      <Form.Label>First Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        className="py-2"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6} className="mb-3">
                    <Form.Group>
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        className="py-2"
                      />
                    </Form.Group>
                  </Col>
                </Row>
                
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="py-2"
                  />
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    className="py-2"
                  />
                </Form.Group>
                
                <Row>
                  <Col md={5} className="mb-3">
                    <Form.Group>
                      <Form.Label>City</Form.Label>
                      <Form.Control
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        required
                        className="py-2"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4} className="mb-3">
                    <Form.Group>
                      <Form.Label>State</Form.Label>
                      <Form.Control
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        required
                        className="py-2"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={3} className="mb-3">
                    <Form.Group>
                      <Form.Label>Zip Code</Form.Label>
                      <Form.Control
                        type="text"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleChange}
                        required
                        className="py-2"
                      />
                    </Form.Group>
                  </Col>
                </Row>
                
                <hr className="my-4" />
                
                <h4 className="mb-4 fw-bold">Payment Information</h4>
                
                <Form.Group className="mb-3">
                  <Form.Label>Name on Card</Form.Label>
                  <Form.Control
                    type="text"
                    name="cardName"
                    value={formData.cardName}
                    onChange={handleChange}
                    required
                    className="py-2"
                  />
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>Card Number</Form.Label>
                  <Form.Control
                    type="text"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleChange}
                    required
                    placeholder="XXXX XXXX XXXX XXXX"
                    className="py-2"
                  />
                </Form.Group>
                
                <Row>
                  <Col md={6} className="mb-3">
                    <Form.Group>
                      <Form.Label>Expiration Date</Form.Label>
                      <Form.Control
                        type="text"
                        name="expDate"
                        value={formData.expDate}
                        onChange={handleChange}
                        required
                        placeholder="MM/YY"
                        className="py-2"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6} className="mb-3">
                    <Form.Group>
                      <Form.Label>CVV</Form.Label>
                      <Form.Control
                        type="text"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleChange}
                        required
                        placeholder="123"
                        className="py-2"
                      />
                    </Form.Group>
                  </Col>
                </Row>
                
                <hr className="my-4" />
                
                <Button 
                  variant="primary" 
                  type="submit" 
                  size="lg" 
                  className="w-100 py-3"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Spinner as="span" animation="border" size="sm" className="me-2" />
                      Processing Order...
                    </>
                  ) : (
                    'Place Order'
                  )}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
        
        <Col lg={4}>
          <Card className="mb-4 shadow-sm border-0">
            <Card.Header className="bg-white py-3">
              <h5 className="mb-0 fw-bold">Order Summary</h5>
            </Card.Header>
            <Card.Body className="p-4">
              <div className="mb-3">
                {cartItems.map(item => (
                  <div key={item.id} className="d-flex justify-content-between mb-3">
                    <div>
                      <span className="fw-medium">{item.name}</span>
                      <div className="text-muted small">Qty: {item.quantity}</div>
                    </div>
                    <span className="fw-medium">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              
              <hr />
              
              <div className="d-flex justify-content-between mb-2">
                <span>Subtotal:</span>
                <span>${calculateSubtotal().toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Tax (10%):</span>
                <span>${calculateTax().toFixed(2)}</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between mb-0">
                <strong>Total:</strong>
                <strong className="text-primary fs-5">${calculateTotal().toFixed(2)}</strong>
              </div>
            </Card.Body>
          </Card>
          
          <Card className="shadow-sm border-0 bg-light">
            <Card.Body className="p-4">
              <div className="d-flex align-items-center mb-3">
                <div className="rounded-circle bg-primary p-2 text-white me-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-shield-lock" viewBox="0 0 16 16">
                    <path d="M5.338 1.59a61.44 61.44 0 0 0-2.837.856.481.481 0 0 0-.328.39c-.554 4.157.726 7.19 2.253 9.188a10.725 10.725 0 0 0 2.287 2.233c.346.244.652.42.893.533.12.057.218.095.293.118a.55.55 0 0 0 .101.025.615.615 0 0 0 .1-.025c.076-.023.174-.061.294-.118.24-.113.547-.29.893-.533a10.726 10.726 0 0 0 2.287-2.233c1.527-1.997 2.807-5.031 2.253-9.188a.48.48 0 0 0-.328-.39c-.651-.213-1.75-.56-2.837-.855C9.552 1.29 8.531 1.067 8 1.067c-.53 0-1.552.223-2.662.524zM5.072.56C6.157.265 7.31 0 8 0s1.843.265 2.928.56c1.11.3 2.229.655 2.887.87a1.54 1.54 0 0 1 1.044 1.262c.596 4.477-.787 7.795-2.465 9.99a11.775 11.775 0 0 1-2.517 2.453 7.159 7.159 0 0 1-1.048.625c-.28.132-.581.24-.829.24s-.548-.108-.829-.24a7.158 7.158 0 0 1-1.048-.625 11.777 11.777 0 0 1-2.517-2.453C1.928 10.487.545 7.169 1.141 2.692A1.54 1.54 0 0 1 2.185 1.43 62.456 62.456 0 0 1 5.072.56z"/>
                    <path d="M9.5 6.5a1.5 1.5 0 0 1-1 1.415l.385 1.99a.5.5 0 0 1-.491.595h-.788a.5.5 0 0 1-.49-.595l.384-1.99a1.5 1.5 0 1 1 2-1.415z"/>
                  </svg>
                </div>
                <h6 className="mb-0 fw-bold">Secure Checkout</h6>
              </div>
              <p className="text-muted small mb-0">
                Your payment information is processed securely. We do not store credit card details nor have access to your credit card information.
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Checkout;
