"use client"

import { useState } from "react"
import { Container, Row, Col, Card, Form, Button, Alert } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      //Kiểm tra xem người dùng có tồn tại trong máy chủ JSON hay không bằng cách sử dụng axios
      const response = await axios.get(`http://localhost:9999/users?email=${email}`)
      const users = response.data

      if (users.length === 0) {
        setError("User not found. Please check your email or register.")
        setIsLoading(false)
        return
      }

      const user = users[0]

      // Check PasswordPassword
      if (user.password !== password) {
        setError("Invalid password. Please try again.")
        setIsLoading(false)
        return
      }

      // Store user info in localStorage
      const { password: _, ...userInfo } = user
      localStorage.setItem("user", JSON.stringify(userInfo))

      // Redirect to homepage
      navigate("/")
      window.location.reload()
    } catch (error) {
      console.error("Login error:", error)
      setError("An error occurred during login. Please try again.")
      setIsLoading(false)
    }
  }

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={6} lg={5}>
          <Card className="shadow">
            <Card.Body className="p-5">
              <div className="text-center mb-4">
                <h2 className="fw-bold">Login to eBay Clone</h2>
                <p className="text-muted">Enter your credentials to access your account</p>
              </div>

              {error && <Alert variant="danger">{error}</Alert>}

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100 py-2" disabled={isLoading}>
                  {isLoading ? "Logging in..." : "Login"}
                </Button>
              </Form>

              <div className="text-center mt-4">
                <p>
                  Don't have an account?{" "}
                  <Link to="/register" className="text-primary">
                    Register
                  </Link>
                </p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default Login

