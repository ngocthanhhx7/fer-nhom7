import { useEffect, useState } from "react"
import { Container, Row, Col, Card, Button, Spinner } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import axios from "axios"

function Dashboard() {
  const [orders, setOrders] = useState([])
  const [users, setUsers] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    // Check if user is admin
    const user = JSON.parse(localStorage.getItem("user") || "{}")
    if (!user || user.role !== "admin") {
      navigate("/")
      return
    }
    const fetchData = async () => {
      try {
        const [ordersRes, usersRes] = await Promise.all([
          axios.get("/orders"),
          axios.get("/users")
        ])
        setOrders(ordersRes.data)
        setUsers(usersRes.data)
        setIsLoading(false)
      } catch (error) {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [navigate])

  const totalRevenue = orders.reduce((sum, order) => sum + (order.total || 0), 0)
  const totalOrders = orders.length
  const totalCustomers = users.filter(u => u.role === "customer").length

  if (isLoading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" variant="primary" />
        <p className="mt-2">Loading dashboard...</p>
      </Container>
    )
  }

  return (
    <Container className="py-5">
      <h2 className="fw-bold mb-4">Admin Dashboard</h2>
      <Row className="mb-4">
        <Col md={4}>
          <Card className="text-center shadow mb-3">
            <Card.Body>
              <h5>Total Revenue</h5>
              <h3 className="text-success">${totalRevenue.toFixed(2)}</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="text-center shadow mb-3">
            <Card.Body>
              <h5>Total Orders</h5>
              <h3>{totalOrders}</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="text-center shadow mb-3">
            <Card.Body>
              <h5>Total Customers</h5>
              <h3>{totalCustomers}</h3>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="mb-4">
        <Col md={6}>
          <Card className="shadow mb-3">
            <Card.Body>
              <h5 className="mb-3">Manager Features</h5>
              <div className="d-flex gap-2 flex-wrap">
                <Button variant="primary" onClick={() => navigate("/product-manager")}>Product Manager</Button>
                <Button variant="primary" onClick={() => navigate("/account-manager")}>Account Manager</Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default Dashboard 