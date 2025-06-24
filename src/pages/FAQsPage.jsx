import { Container, Accordion } from "react-bootstrap"

function FAQPage() {
  return (
    <div className="bg-light py-5">
      <Container>
        <h2 className="text-center mb-4 fw-bold">Frequently Asked Questions</h2>
        <Accordion defaultActiveKey="0">
          <Accordion.Item eventKey="0">
            <Accordion.Header>How can I place an order?</Accordion.Header>
            <Accordion.Body>
              Simply browse our products, add items to your cart, and proceed to checkout. You’ll receive confirmation by email.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>What payment methods are accepted?</Accordion.Header>
            <Accordion.Body>
              We accept all major credit cards, PayPal, and digital wallets like Google Pay and Apple Pay.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            <Accordion.Header>How long does shipping take?</Accordion.Header>
            <Accordion.Body>
              Standard shipping takes 3–7 business days. Expedited options are available at checkout.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="3">
            <Accordion.Header>Can I track my order?</Accordion.Header>
            <Accordion.Body>
              Yes! You'll receive a tracking number once your order ships.
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Container>
    </div>
  )
}

export default FAQPage
