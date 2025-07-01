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
import { Plus, Search, Edit, Trash2, SortAsc, SortDesc } from "lucide-react"
import axios from "axios"

function ProductManager() {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortField, setSortField] = useState("id")
  const [sortDirection, setSortDirection] = useState("asc")
  const [showAlert, setShowAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState("")
  const [alertVariant, setAlertVariant] = useState("success")

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: "",
    stock: "",
    featured: false
  })

  useEffect(() => {
    fetchProducts()
  }, [])

  useEffect(() => {
    filterAndSortProducts()
  }, [products, searchTerm, sortField, sortDirection])

  const fetchProducts = async () => {
    try {
      const response = await axios.get("/products")
      setProducts(response.data)
    } catch (error) {
      console.error("Error fetching products:", error)
      showAlertMessage("Error fetching products", "danger")
    }
  }

  const filterAndSortProducts = () => {
    let filtered = products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
    )

    filtered.sort((a, b) => {
      let aValue = a[sortField]
      let bValue = b[sortField]

      if (sortField === "price" || sortField === "stock") {
        aValue = parseFloat(aValue)
        bValue = parseFloat(bValue)
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

    setFilteredProducts(filtered)
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
    
    try {
      const productData = {
        ...formData,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
        date: new Date().toISOString().split('T')[0]
      }

      if (editingProduct) {
        await axios.put(`/products/${editingProduct.id}`, productData)
        showAlertMessage("Product updated successfully")
      } else {
        await axios.post("/products", {
          ...productData,
          id: Date.now().toString()
        })
        showAlertMessage("Product created successfully")
      }

      setShowModal(false)
      resetForm()
      fetchProducts()
    } catch (error) {
      console.error("Error saving product:", error)
      showAlertMessage("Error saving product", "danger")
    }
  }

  const handleEdit = (product) => {
    setEditingProduct(product)
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      category: product.category,
      image: product.image,
      stock: product.stock.toString(),
      featured: product.featured
    })
    setShowModal(true)
  }

  const handleDelete = async (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(`/products/${productId}`)
        showAlertMessage("Product deleted successfully")
        fetchProducts()
      } catch (error) {
        console.error("Error deleting product:", error)
        showAlertMessage("Error deleting product", "danger")
      }
    }
  }

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      price: "",
      category: "",
      image: "",
      stock: "",
      featured: false
    })
    setEditingProduct(null)
  }

  const handleModalClose = () => {
    setShowModal(false)
    resetForm()
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
        <h2>Product Manager</h2>
        <Button variant="primary" onClick={() => setShowModal(true)}>
          <Plus size={20} className="me-2" />
          Add Product
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
                  placeholder="Search products..."
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
                    <Dropdown.Item onClick={() => handleSort("price")}>Price</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleSort("category")}>Category</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleSort("stock")}>Stock</Dropdown.Item>
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
              <th>Image</th>
              <SortableHeader field="name">Name</SortableHeader>
              <th>Description</th>
              <SortableHeader field="price">Price</SortableHeader>
              <SortableHeader field="category">Category</SortableHeader>
              <SortableHeader field="stock">Stock</SortableHeader>
              <th>Featured</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product.id}>
                <td className="text-center">{product.id}</td>
                <td className="text-center">
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{ width: "50px", height: "50px", objectFit: "cover" }}
                    className="rounded"
                  />
                </td>
                <td>{product.name}</td>
                <td>
                  <div style={{ maxWidth: "200px", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {product.description}
                  </div>
                </td>
                <td className="text-center">${product.price}</td>
                <td className="text-center">{product.category}</td>
                <td className="text-center">
                  <Badge bg={product.stock > 10 ? "success" : product.stock > 0 ? "warning" : "danger"}>
                    {product.stock}
                  </Badge>
                </td>
                <td className="text-center">
                  <Badge bg={product.featured ? "primary" : "secondary"}>
                    {product.featured ? "Yes" : "No"}
                  </Badge>
                </td>
                <td className="text-center">
                  <Button
                    variant="outline-primary"
                    size="sm"
                    className="me-2"
                    onClick={() => handleEdit(product)}
                  >
                    <Edit size={16} />
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => handleDelete(product.id)}
                  >
                    <Trash2 size={16} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-5">
          <p className="text-muted">No products found</p>
        </div>
      )}

      {/* Add/Edit Product Modal */}
      <Modal show={showModal} onHide={handleModalClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {editingProduct ? "Edit Product" : "Add New Product"}
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Product Name</Form.Label>
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
                  <Form.Label>Category</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
              />
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Price ($)</Form.Label>
                  <Form.Control
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Stock</Form.Label>
                  <Form.Control
                    type="number"
                    min="0"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="url"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                label="Featured Product"
                checked={formData.featured}
                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleModalClose}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              {editingProduct ? "Update Product" : "Add Product"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  )
}

export default ProductManager 