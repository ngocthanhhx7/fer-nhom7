import { useState } from "react"
import { Container, Row, Col, Card, Form, Button, Alert } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import axios from "axios"

function ForgotPassword() {
  const [step, setStep] = useState(1)
  const [email, setEmail] = useState("")
  const [userId, setUserId] = useState(null)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [form, setForm] = useState({ password: "", confirmPassword: "" })
  const navigate = useNavigate()

  const handleEmailSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)
    try {
      const res = await axios.get(`/users?email=${email}`)
      if (res.data.length === 0) {
        setError("Email not found. Please check again.")
        setIsLoading(false)
        return
      }
      setUserId(res.data[0].id)
      setStep(2)
      setIsLoading(false)
    } catch (err) {
      setError("An error occurred. Please try again.")
      setIsLoading(false)
    }
  }

  const handlePasswordChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handlePasswordSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setSuccess("")
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.")
      return
    }
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.")
      return
    }
    setIsLoading(true)
    try {
      await axios.patch(`/users/${userId}`, { password: form.password })
      setSuccess("Password changed successfully! Redirecting to login...")
      setTimeout(() => navigate("/login"), 2000)
    } catch (err) {
      setError("An error occurred. Please try again.")
    }
    setIsLoading(false)
  }

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={6} lg={5}>
          <Card className="shadow">
            <Card.Body className="p-5">
              <div className="text-center mb-4">
                <h2 className="fw-bold">Forgot Password</h2>
                <p className="text-muted">{step === 1 ? "Enter your email to reset password" : "Enter your new password"}</p>
              </div>
              {error && <Alert variant="danger">{error}</Alert>}
              {success && <Alert variant="success">{success}</Alert>}
              {step === 1 && (
                <Form onSubmit={handleEmailSubmit}>
                  <Form.Group className="mb-4">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <Button variant="primary" type="submit" className="w-100 py-2" disabled={isLoading}>
                    {isLoading ? "Checking..." : "Continue"}
                  </Button>
                </Form>
              )}
              {step === 2 && (
                <Form onSubmit={handlePasswordSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>New Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      placeholder="Enter new password"
                      value={form.password}
                      onChange={handlePasswordChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-4">
                    <Form.Label>Confirm New Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="confirmPassword"
                      placeholder="Confirm new password"
                      value={form.confirmPassword}
                      onChange={handlePasswordChange}
                      required
                    />
                  </Form.Group>
                  <Button variant="primary" type="submit" className="w-100 py-2" disabled={isLoading}>
                    {isLoading ? "Saving..." : "Change Password"}
                  </Button>
                </Form>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default ForgotPassword 