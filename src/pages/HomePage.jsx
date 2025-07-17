import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Spinner, InputGroup, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Search, ArrowUpDown } from 'lucide-react';
import HeroBanner from '../components/HeroBanner';
import FeaturedProducts from '../components/FeaturedProducts';
import ProductList from './ProductList';
import CategoryFilter from '../components/CategoryFilter';

function HomePage() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('featured');
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const user = localStorage.getItem('user');
    if (!user) {
      navigate('/login');
    }

    // Fetch products from JSON server using axios
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/products');
        const data = response.data;
        setProducts(data);
        setFilteredProducts(data);
        
        // Extract unique categories
        const uniqueCategories = [...new Set(data.map(product => product.category))];
        setCategories(uniqueCategories);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [navigate]);

  useEffect(() => {
    // Apply filters and sorting
    let result = [...products];
    
    // Apply category filter
    if (selectedCategory !== 'all') {
      result = result.filter(product => product.category === selectedCategory);
    }
    
    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter(product => 
        product.name.toLowerCase().includes(query) || 
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
      );
    }
    
    // Apply sorting
    switch (sortOption) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        result.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      case 'featured':
      default:
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
    }
    
    setFilteredProducts(result);
  }, [products, selectedCategory, searchQuery, sortOption]);

  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Search is already applied via useEffect
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  return (
    <div className="home-page">
      <HeroBanner />
      
      <Container className="py-2">
        <div className="section-title text-center mb-5">
          <h2 className="display-5 fw-bold">Welcome to <span className="text-primary">eBay Clone</span></h2>
          <p className="lead text-muted">Discover amazing products at unbeatable prices</p>
        </div>
        
        <Row className="mb-5">
          <Col md={6} lg={3} className="mb-4">
            <div className="feature-card text-center p-4 h-100 bg-light rounded shadow-sm">
              <div className="feature-icon bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '60px', height: '60px' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-truck" viewBox="0 0 16 16">
                  <path d="M0 3.5A1.5 1.5 0 0 1 1.5 2h9A1.5 1.5 0 0 1 12 3.5V5h1.02a1.5 1.5 0 0 1 1.17.563l1.481 1.85a1.5 1.5 0 0 1 .329.938V10.5a1.5 1.5 0 0 1-1.5 1.5H14a2 2 0 1 1-4 0H5a2 2 0 1 1-3.998-.085A1.5 1.5 0 0 1 0 10.5v-7zm1.294 7.456A1.999 1.999 0 0 1 4.732 11h5.536a2.01 2.01 0 0 1 .732-.732V3.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .294.456zM12 10a2 2 0 1 1 .001 4A2 2 0 0 1 12 10zm-8 0a2 2 0 1 1 .001 4A2 2 0 0 1 4 10z"/>
                </svg>
              </div>
              <h4 className="fw-bold">Free Shipping</h4>
              <p className="text-muted mb-0">On orders over $50</p>
            </div>
          </Col>
          <Col md={6} lg={3} className="mb-4">
            <div className="feature-card text-center p-4 h-100 bg-light rounded shadow-sm">
              <div className="feature-icon bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '60px', height: '60px' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-shield-check" viewBox="0 0 16 16">
                  <path d="M5.338 1.59a61.44 61.44 0 0 0-2.837.856.481.481 0 0 0-.328.39c-.554 4.157.726 7.19 2.253 9.188a10.725 10.725 0 0 0 2.287 2.233c.346.244.652.42.893.533.12.057.218.095.293.118a.55.55 0 0 0 .101.025.615.615 0 0 0 .1-.025c.076-.023.174-.061.294-.118.24-.113.547-.29.893-.533a10.726 10.726 0 0 0 2.287-2.233c1.527-1.997 2.807-5.031 2.253-9.188a.48.48 0 0 0-.328-.39c-.651-.213-1.75-.56-2.837-.855C9.552 1.29 8.531 1.067 8 1.067c-.53 0-1.552.223-2.662.524zM5.072.56C6.157.265 7.31 0 8 0s1.843.265 2.928.56c1.11.3 2.229.655 2.887.87a1.54 1.54 0 0 1 1.044 1.262c.596 4.477-.787 7.795-2.465 9.99a11.775 11.775 0 0 1-2.517 2.453 7.159 7.159 0 0 1-1.048.625c-.28.132-.581.24-.829.24s-.548-.108-.829-.24a7.158 7.158 0 0 1-1.048-.625 11.777 11.777 0 0 1-2.517-2.453C1.928 10.487.545 7.169 1.141 2.692A1.54 1.54 0 0 1 2.185 1.43 62.456 62.456 0 0 1 5.072.56z"/>
                  <path d="M10.854 5.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 7.793l2.646-2.647a.5.5 0 0 1 .708 0z"/>
                </svg>
              </div>
              <h4 className="fw-bold">Secure Payments</h4>
              <p className="text-muted mb-0">100% secure checkout</p>
            </div>
          </Col>
          <Col md={6} lg={3} className="mb-4">
            <div className="feature-card text-center p-4 h-100 bg-light rounded shadow-sm">
              <div className="feature-icon bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '60px', height: '60px' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-arrow-counterclockwise" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2v1z"/>
                  <path d="M8 4.466V.534a.25.25 0 0 0-.41-.192.25.25 0 0 0 0 .384l.7.7a.5.5 0 0 0 .372.16h.12a.5.5 0 0 0 .372-.16l.7-.7a.25.25 0 0 0 0-.384.25.25 0 0 0-.41.192v3.932z"/>
                </svg>
              </div>
              <h4 className="fw-bold">Easy Returns</h4>
              <p className="text-muted mb-0">30-day return policy</p>
            </div>
          </Col>
          <Col md={6} lg={3} className="mb-4">
            <div className="feature-card text-center p-4 h-100 bg-light rounded shadow-sm">
              <div className="feature-icon bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '60px', height: '60px' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-headset" viewBox="0 0 16 16">
                  <path d="M8 1a5 5 0 0 0-5 5v1h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a6 6 0 1 1 12 0v6a2.5 2.5 0 0 1-2.5 2.5H9.366a1 1 0 0 1-.866.5h-1a1 1 0 1 1 0-2h1a1 1 0 0 1 .866.5H11.5A1.5 1.5 0 0 0 13 12h-1a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1h1V6a5 5 0 0 0-5-5z"/>
                </svg>
              </div>
              <h4 className="fw-bold">24/7 Support</h4>
              <p className="text-muted mb-0">Dedicated customer service</p>
            </div>
          </Col>
        </Row>
        
        <div className="section-title text-center mb-5">
          <h2 className="fw-bold">Featured Products</h2>
          <div className="title-line mx-auto my-3"></div>
          <p className="text-muted">Discover our top picks just for you</p>
        </div>
        
        <FeaturedProducts products={products.filter(product => product.featured).slice(0, 4)} />
        
        <div className="section-title text-center my-5 pt-3">
          <h2 className="fw-bold">Shop Our Collection</h2>
          <div className="title-line mx-auto my-3"></div>
          <p className="text-muted">Browse through our extensive catalog of products</p>
        </div>
        
        <Row className="mb-4">
          <Col md={8} className="mb-3">
            <Form onSubmit={handleSearch}>
              <InputGroup>
                <Form.Control
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="py-2"
                />
                <Button variant="primary" type="submit">
                  <Search size={18} />
                </Button>
              </InputGroup>
            </Form>
          </Col>
          <Col md={4} className="mb-3">
            <InputGroup>
              <InputGroup.Text className="bg-white">
                <ArrowUpDown size={18} />
              </InputGroup.Text>
              <Form.Select 
                value={sortOption} 
                onChange={handleSortChange}
                className="py-2"
              >
                <option value="featured">Featured</option>
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </Form.Select>
            </InputGroup>
          </Col>
        </Row>
        
        <Row>
          <Col lg={3} className="mb-4">
            <Card className="shadow-sm border-0">
              <Card.Header className="bg-primary text-white py-3">
                <h5 className="mb-0 fw-bold">Categories</h5>
              </Card.Header>
              <Card.Body>
                <CategoryFilter 
                  categories={categories} 
                  selectedCategory={selectedCategory} 
                  onSelectCategory={handleCategoryFilter} 
                />
              </Card.Body>
            </Card>
            
            <Card className="shadow-sm border-0 mt-4">
              <Card.Body className="p-4 bg-light">
                <h5 className="fw-bold mb-3">Need Help?</h5>
                <p className="text-muted mb-3">Our customer service team is here to help you with any questions or concerns.</p>
                <Button variant="outline-primary" className="w-100">Contact Support</Button>
              </Card.Body>
            </Card>
          </Col>
          
          <Col lg={9}>
            {isLoading ? (
              <div className="text-center py-5">
                <Spinner animation="border" variant="primary" />
                <p className="mt-2">Loading products...</p>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-5 bg-light rounded">
                <h4>No products found</h4>
                <p className="text-muted">Try adjusting your search or filter criteria</p>
                <Button 
                  variant="primary" 
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                    setSortOption('featured');
                  }}
                >
                  Reset Filters
                </Button>
              </div>
            ) : (
              <ProductList products={filteredProducts} />
            )}
          </Col>
        </Row>
      </Container>
      
      <div className="bg-light py-5 mt-5">
        <Container>
          <Row className="align-items-center">
            <Col md={6} className="mb-4 mb-md-0">
              <h2 className="fw-bold mb-3">Subscribe to Our Newsletter</h2>
              <p className="text-muted mb-4">Stay updated with our latest products and exclusive offers.</p>
              <Form className="d-flex">
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  className="me-2 py-2"
                />
                <Button variant="primary" type="submit">Subscribe</Button>
              </Form>
            </Col>
            <Col md={6} className="text-center text-md-end">
              <img 
                src="https://axiomq.com/wp-content/uploads/2020/06/Newsletter-Design-Trends-1.jpg" 
                alt="Newsletter" 
                className="img-fluid rounded shadow-sm" 
                style={{ maxHeight: '250px' }}
              />
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default HomePage;
