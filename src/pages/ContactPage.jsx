import { Container, Form, Button, Row, Col } from "react-bootstrap"

function ContactPage() {
  return (
    <div className="bg-white py-5">
      <Container>
        <h2 className="text-center mb-4 fw-bold">Contact Us</h2>
        <Row className="justify-content-center">
          <Col md={8}>
            <Form>
              <Form.Group controlId="name" className="mb-3">
                <Form.Label>Your Name</Form.Label>
                <Form.Control type="text" placeholder="Enter your name" />
              </Form.Group>

              <Form.Group controlId="email" className="mb-3">
                <Form.Label>Email Address</Form.Label>
                <Form.Control type="email" placeholder="Enter your email" />
              </Form.Group>

              <Form.Group controlId="subject" className="mb-3">
                <Form.Label>Subject</Form.Label>
                <Form.Control type="text" placeholder="Subject" />
              </Form.Group>

              <Form.Group controlId="message" className="mb-3">
                <Form.Label>Message</Form.Label>
                <Form.Control as="textarea" rows={5} placeholder="Write your message here..." />
              </Form.Group>

              <Button variant="primary" size="lg" type="submit">
                Send Message
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default ContactPage
