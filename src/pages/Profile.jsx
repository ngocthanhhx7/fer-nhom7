import { useState, useEffect } from "react"
import { Container, Row, Col, Card, Form, Button, Alert } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import axios from "axios"

function Profile() {
  const [user, setUser] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({ name: "" })
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem("user")
    if (!userData) {
      navigate("/login")
      return
    }

    const userInfo = JSON.parse(userData)
    setUser(userInfo)
    setFormData({ name: userInfo.name || "" })
  }, [navigate])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setSuccess("")
    setIsLoading(true)

    try {
      // Update user in database
      await axios.patch(`/users/${user.id}`, { name: formData.name })
      
      // Update user in localStorage
      const updatedUser = { ...user, name: formData.name }
      localStorage.setItem("user", JSON.stringify(updatedUser))
      
      setUser(updatedUser)
      setSuccess("Profile updated successfully!")
      setIsEditing(false)
    } catch (error) {
      setError("An error occurred while updating profile. Please try again.")
    }
    
    setIsLoading(false)
  }

  if (!user) {
    return (
      <Container className="py-5 text-center">
        <p>Loading profile...</p>
      </Container>
    )
  }

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="shadow">
            <Card.Body className="p-5">
              <div className="text-center mb-4">
                <h2 className="fw-bold">Profile</h2>
                <p className="text-muted">Manage your account information</p>
              </div>

              {error && <Alert variant="danger">{error}</Alert>}
              {success && <Alert variant="success">{success}</Alert>}

              <div className="mb-4">
                <h5>Account Information</h5>
                <hr />
                <div className="row mb-3">
                  <div className="col-sm-4">
                    <strong>Email:</strong>
                  </div>
                  <div className="col-sm-8">
                    {user.email}
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-sm-4">
                    <strong>Role:</strong>
                  </div>
                  <div className="col-sm-8">
                    <span className={`badge ${user.role === 'admin' ? 'bg-danger' : 'bg-primary'}`}>
                      {user.role}
                    </span>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-sm-4">
                    <strong>Member Since:</strong>
                  </div>
                  <div className="col-sm-8">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>

              {!isEditing ? (
                <div className="mb-4">
                  <h5>Personal Information</h5>
                  <hr />
                  <div className="row mb-3">
                    <div className="col-sm-4">
                      <strong>Name:</strong>
                    </div>
                    <div className="col-sm-8">
                      {user.name}
                    </div>
                  </div>
                  <Button 
                    variant="outline-primary" 
                    onClick={() => setIsEditing(true)}
                    className="w-100"
                  >
                    Edit Profile
                  </Button>
                </div>
              ) : (
                <Form onSubmit={handleSubmit}>
                  <h5>Edit Personal Information</h5>
                  <hr />
                  <Form.Group className="mb-4">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                  <div className="d-flex gap-2">
                    <Button 
                      variant="primary" 
                      type="submit" 
                      className="flex-grow-1"
                      disabled={isLoading}
                    >
                      {isLoading ? "Saving..." : "Save Changes"}
                    </Button>
                    <Button 
                      variant="outline-secondary" 
                      onClick={() => {
                        setIsEditing(false)
                        setFormData({ name: user.name || "" })
                        setError("")
                      }}
                      className="flex-grow-1"
                    >
                      Cancel
                    </Button>
                  </div>
                </Form>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default Profile 