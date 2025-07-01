"use client"

import { useState, useEffect } from "react"
import { Container, Row, Col, Card, Form, Button, Alert } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import axios from "axios"

function ChangePassword() {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  })
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  // Check if user is logged in
  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (!userData) {
      navigate("/login")
    }
  }, [navigate])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    // Validate passwords match
    if (formData.newPassword !== formData.confirmNewPassword) {
      setError("New passwords do not match")
      return
    }

    // Validate new password length
    if (formData.newPassword.length < 6) {
      setError("New password must be at least 6 characters long")
      return
    }

    setIsLoading(true)

    try {
      // Get current user from localStorage
      const userData = localStorage.getItem("user")
      if (!userData) {
        setError("User not found. Please login again.")
        setIsLoading(false)
        return
      }

      const user = JSON.parse(userData)

      // Get user from database to verify current password
      const response = await axios.get(`http://localhost:9999/users/${user.id}`)
      const currentUser = response.data

      // Verify current password
      if (currentUser.password !== formData.currentPassword) {
        setError("Current password is incorrect")
        setIsLoading(false)
        return
      }

      // Update password in database
      await axios.patch(`http://localhost:9999/users/${user.id}`, {
        password: formData.newPassword,
      })

      setSuccess("Password changed successfully!")
      setIsLoading(false)

      // Clear form
      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      })

      // Redirect to home after 2 seconds
      setTimeout(() => {
        navigate("/")
      }, 2000)
    } catch (error) {
      console.error("Change password error:", error)
      setError("An error occurred while changing password. Please try again.")
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
                <h2 className="fw-bold">Change Password</h2>
                <p className="text-muted">Update your account password</p>
              </div>

              {error && <Alert variant="danger">{error}</Alert>}
              {success && <Alert variant="success">{success}</Alert>}

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Current Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="currentPassword"
                    placeholder="Enter your current password"
                    value={formData.currentPassword}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>New Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="newPassword"
                    placeholder="Enter your new password"
                    value={formData.newPassword}
                    onChange={handleChange}
                    required
                    minLength={6}
                  />
                  <Form.Text className="text-muted">Password must be at least 6 characters long</Form.Text>
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Confirm New Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="confirmNewPassword"
                    placeholder="Confirm your new password"
                    value={formData.confirmNewPassword}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100 py-2" disabled={isLoading}>
                  {isLoading ? "Changing Password..." : "Change Password"}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default ChangePassword 