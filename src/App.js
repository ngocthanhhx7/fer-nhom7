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
import ChangePassword from "./pages/ChangePassword"
import ProductManager from "./pages/ProductManager"
import AccountManager from "./pages/AccountManager"
import Dashboard from "./pages/Dashboard"
import RequireRole from "./components/RequireRole"
import ForgotPassword from "./pages/ForgotPassword"
import Profile from "./pages/Profile"
axios.defaults.baseURL = "http://localhost:9999"

function App() {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Header />
        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={
              <RequireRole allowedRoles={["customer"]}>
                <HomePage />
              </RequireRole>
            } />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/product/:id" element={
              <RequireRole allowedRoles={["customer"]}>
                <ProductDetail />
              </RequireRole>
            } />
            <Route path="/cart" element={
              <RequireRole allowedRoles={["customer"]}>
                <Cart />
              </RequireRole>
            } />
            <Route path="/checkout" element={
              <RequireRole allowedRoles={["customer"]}>
                <Checkout />
              </RequireRole>
            } />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/faqs" element={<FAQPage />} />
            <Route path="/change-password" element={<ChangePassword />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/product-manager" element={
              <RequireRole allowedRoles={["admin"]}>
                <ProductManager />
              </RequireRole>
            } />
            <Route path="/account-manager" element={
              <RequireRole allowedRoles={["admin"]}>
                <AccountManager />
              </RequireRole>
            } />
            <Route path="/dashboard" element={
              <RequireRole allowedRoles={["admin"]}>
                <Dashboard />
              </RequireRole>
            } />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App

