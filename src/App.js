import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"


import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"

import axios from "axios"
import Header from "./layouts/Header"
import HomePage from "./pages/HomePage"
import Login from "./pages/Login"
import Register from "./pages/Register"
import ProductDetail from "./pages/ProductDetail"
import Cart from "./pages/Cart"
import Checkout from "./pages/Checkout"
import Footer from "./layouts/Footer"
import ContactPage from "./pages/ContactPage"
import FAQPage from "./pages/FAQsPage"
axios.defaults.baseURL = "http://localhost:9999"

function App() {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Header />
        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/faqs" element={<FAQPage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App

