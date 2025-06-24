import { Carousel, Button, Container } from "react-bootstrap"

function HeroBanner() {
  return (
    <div className="hero-banner position-relative">
      <style>
        {`
          .carousel-image {
            position: relative;
          }

          .carousel-overlay {
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            width: 100%;
            background: rgba(0, 0, 0, 0.4); /* dark overlay */
            z-index: 1;
          }

          .carousel-content {
            position: absolute !important;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 2;
            text-align: center;
            color: white;
          }

          .carousel-content h1,
          .carousel-content p {
            color: white;
          }

          .hero-shape {
            position: absolute;
            bottom: 0;
            width: 100%;
            z-index: 2;
          }
        `}
      </style>

      <Carousel fade interval={5000} className="modern-carousel">
        <Carousel.Item>
          <div
            className="carousel-image"
            style={{
              backgroundImage:
                "url(https://conversiongods.com/wp-content/uploads/2021/02/ecommerce-retail-ss-1920-1.jpg)",
              height: "800px",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="carousel-overlay"></div>
          </div>
          <Carousel.Caption className="carousel-content">
            <Container>
              <h1 className="display-4 fw-bold mb-3">Welcome to eBay Clone</h1>
              <p className="lead mb-4">Find amazing deals on thousands of products</p>
              <Button variant="primary" size="lg" className="me-2">
                Shop Now
              </Button>
              <Button variant="outline-light" size="lg">
                Learn More
              </Button>
            </Container>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <div
            className="carousel-image"
            style={{
              backgroundImage:
                "url(https://png.pngtree.com/background/20240507/original/pngtree-digital-e-commerce-platform-on-laptop-3d-rendered-illustration-for-hassle-picture-image_8840270.jpg)",
              height: "800px",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="carousel-overlay"></div>
          </div>
          <Carousel.Caption className="carousel-content">
            <Container>
              <h1 className="display-4 fw-bold mb-3">Daily Deals</h1>
              <p className="lead mb-4">Save big with our daily deals and discounts</p>
              <Button variant="primary" size="lg" className="me-2">
                View Deals
              </Button>
              <Button variant="outline-light" size="lg">
                Learn More
              </Button>
            </Container>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <div
            className="carousel-image"
            style={{
              backgroundImage:
                "url(https://orangemonkie.com/cdn/shop/articles/09blog-header-min.jpg?v=1695179019)",
              height: "800px",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="carousel-overlay"></div>
          </div>
          <Carousel.Caption className="carousel-content">
            <Container>
              <h1 className="display-4 fw-bold mb-3">Free Shipping</h1>
              <p className="lead mb-4">Enjoy free shipping on orders over $50</p>
              <Button variant="primary" size="lg" className="me-2">
                Shop Now
              </Button>
              <Button variant="outline-light" size="lg">
                Learn More
              </Button>
            </Container>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      <div className="hero-shape">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#ffffff"
            fillOpacity="1"

          ></path>
        </svg>
      </div>
    </div>
  )
}

export default HeroBanner
