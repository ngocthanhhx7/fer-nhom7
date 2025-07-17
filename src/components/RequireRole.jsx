import { Navigate } from "react-router-dom"

function RequireRole({ allowedRoles, redirectTo = "/login", children }) {
  const user = JSON.parse(localStorage.getItem("user") || "null")
  if (!user) return <Navigate to="/login" />
  if (!allowedRoles.includes(user.role)) {
    // Nếu là admin mà vào trang customer thì về dashboard, ngược lại về home
    return <Navigate to={user.role === "admin" ? "/dashboard" : "/"} />
  }
  return children
}

export default RequireRole 