import { useState, useEffect } from "react"
import {
  Container,
  Table,
  Button,
  Modal,
  Form,
  Alert,
  InputGroup,
  Dropdown,
  Badge,
  Card,
  Row,
  Col
} from "react-bootstrap"
import { Plus, Search, Edit, Trash2, SortAsc, SortDesc, User, Mail, Calendar } from "lucide-react"
import axios from "axios"

function AccountManager() {
  const [users, setUsers] = useState([])
  const [filteredUsers, setFilteredUsers] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [editingUser, setEditingUser] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortField, setSortField] = useState("id")
  const [sortDirection, setSortDirection] = useState("asc")
  const [showAlert, setShowAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState("")
  const [alertVariant, setAlertVariant] = useState("success")

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  })

  useEffect(() => {
    fetchUsers()
  }, [])

  useEffect(() => {
    filterAndSortUsers()
  }, [users, searchTerm, sortField, sortDirection])

  const fetchUsers = async () => {
    try {
      const response = await axios.get("/users")
      setUsers(response.data)
    } catch (error) {
      console.error("Error fetching users:", error)
      showAlertMessage("Error fetching users", "danger")
    }
  }

  const filterAndSortUsers = () => {
    let filtered = users.filter(user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    )

    filtered.sort((a, b) => {
      let aValue = a[sortField]
      let bValue = b[sortField]

      if (sortField === "createdAt") {
        aValue = new Date(aValue)
        bValue = new Date(bValue)
      } else {
        aValue = aValue.toString().toLowerCase()
        bValue = bValue.toString().toLowerCase()
      }

      if (sortDirection === "asc") {
        return aValue > bValue ? 1 : -1
      } else {
        return aValue < bValue ? 1 : -1
      }
    })

    setFilteredUsers(filtered)
  }

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const showAlertMessage = (message, variant = "success") => {
    setAlertMessage(message)
    setAlertVariant(variant)
    setShowAlert(true)
    setTimeout(() => setShowAlert(false), 3000)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (formData.password !== formData.confirmPassword) {
      showAlertMessage("Passwords do not match", "danger")
      return
    }

    if (formData.password.length < 6) {
      showAlertMessage("Password must be at least 6 characters", "danger")
      return
    }
    
    try {
      const userData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        createdAt: new Date().toISOString()
      }

      if (editingUser) {
        await axios.put(`/users/${editingUser.id}`, userData)
        showAlertMessage("User updated successfully")
      } else {
        await axios.post("/users", {
          ...userData,
          id: Date.now().toString()
        })
        showAlertMessage("User created successfully")
      }

      setShowModal(false)
      resetForm()
      fetchUsers()
    } catch (error) {
      console.error("Error saving user:", error)
      showAlertMessage("Error saving user", "danger")
    }
  }

  const handleEdit = (user) => {
    setEditingUser(user)
    setFormData({
      name: user.name,
      email: user.email,
      password: "",
      confirmPassword: ""
    })
    setShowModal(true)
  }

  const handleDelete = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await axios.delete(`/users/${userId}`)
        showAlertMessage("User deleted successfully")
        fetchUsers()
      } catch (error) {
        console.error("Error deleting user:", error)
        showAlertMessage("Error deleting user", "danger")
      }
    }
  }

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: ""
    })
    setEditingUser(null)
  }

  const handleModalClose = () => {
    setShowModal(false)
    resetForm()
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const SortableHeader = ({ field, children }) => (
    <th 
      style={{ cursor: "pointer" }}
      onClick={() => handleSort(field)}
      className="text-center"
    >
      <div className="d-flex align-items-center justify-content-center">
        {children}
        {sortField === field && (
          <span className="ms-1">
            {sortDirection === "asc" ? <SortAsc size={16} /> : <SortDesc size={16} />}
          </span>
        )}
      </div>
    </th>
  )

  return (
    <Container className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Account Manager</h2>
        <Button variant="primary" onClick={() => setShowModal(true)}>
          <Plus size={20} className="me-2" />
          Add User
        </Button>
      </div>

      {showAlert && (
        <Alert variant={alertVariant} dismissible onClose={() => setShowAlert(false)}>
          {alertMessage}
        </Alert>
      )}

      <Card className="mb-4">
        <Card.Body>
          <Row>
            <Col md={6}>
              <InputGroup>
                <InputGroup.Text>
                  <Search size={20} />
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </InputGroup>
            </Col>
            <Col md={6}>
              <div className="d-flex justify-content-end">
                <Dropdown>
                  <Dropdown.Toggle variant="outline-secondary">
                    Sort by: {sortField.charAt(0).toUpperCase() + sortField.slice(1)}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => handleSort("id")}>ID</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleSort("name")}>Name</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleSort("email")}>Email</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleSort("createdAt")}>Created Date</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <div className="table-responsive">
        <Table striped bordered hover>
          <thead>
            <tr>
              <SortableHeader field="id">ID</SortableHeader>
              <th className="text-center">Avatar</th>
              <SortableHeader field="name">Name</SortableHeader>
              <SortableHeader field="email">Email</SortableHeader>
              <SortableHeader field="createdAt">Created Date</SortableHeader>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id}>
                <td className="text-center">{user.id}</td>
                <td className="text-center">
                  <div 
                    style={{ 
                      width: "50px", 
                      height: "50px", 
                      borderRadius: "50%",
                      backgroundColor: "#007bff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto"
                    }}
                  >
                    <User size={24} color="white" />
                  </div>
                </td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td className="text-center">{formatDate(user.createdAt)}</td>
                <td className="text-center">
                  <Button
                    variant="outline-primary"
                    size="sm"
                    className="me-2"
                    onClick={() => handleEdit(user)}
                  >
                    <Edit size={16} />
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => handleDelete(user.id)}
                  >
                    <Trash2 size={16} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {filteredUsers.length === 0 && (
        <div className="text-center py-5">
          <p className="text-muted">No users found</p>
        </div>
      )}

      {/* Add/Edit User Modal */}
      <Modal show={showModal} onHide={handleModalClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {editingUser ? "Edit User" : "Add New User"}
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>
                    <User size={16} className="me-2" />
                    Full Name
                  </Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>
                    <Mail size={16} className="me-2" />
                    Email
                  </Form.Label>
                  <Form.Control
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required={!editingUser}
                    minLength={6}
                  />
                  {editingUser && (
                    <Form.Text className="text-muted">
                      Leave blank to keep current password
                    </Form.Text>
                  )}
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    required={!editingUser || formData.password !== ""}
                  />
                </Form.Group>
              </Col>
            </Row>

            {editingUser && (
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>
                      <Calendar size={16} className="me-2" />
                      Created Date
                    </Form.Label>
                    <Form.Control
                      type="text"
                      value={formatDate(editingUser.createdAt)}
                      disabled
                      readOnly
                    />
                  </Form.Group>
                </Col>
              </Row>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleModalClose}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              {editingUser ? "Update User" : "Add User"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  )
}

export default AccountManager 