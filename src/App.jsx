import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProductList from "./my-store/publicProducts/productList";
import ProductDetail from "./my-store/publicProducts/productDetail";
import Login from "./my-store/login/login";
import Register from "./my-store/login/register";
import Cart from "./my-store/cartWish/Cart";
import Wishlist from "./my-store/cartWish/Wishlist";
import { AuthProvider, useAuth } from "./my-store/routes/AuthContext";
import AdminRoute from "./my-store/routes/AdminRoute";
import AdminOrSubadminRoute from "./my-store/routes/AdminOrSubadminRoute";

import UserManagement from "./my-store/dashboard/UserManagement";
import OrderList from "./my-store/dashboard/OrderList";
import ClientManagement from "./my-store/dashboard/ClientManagement";
import Products from "./my-store/dashboard/Products";
import AdminDashboard from "./my-store/dashboard/AdminDashboard";
import SubadminDashboard from "./my-store/dashboard/SubadminDashboard";
import DashboardLayout from "./my-store/dashboard/DashboardLayout";

function AppRoutes() {
  const { auth } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<ProductList />} />
      <Route path="/productDetail/:id" element={<ProductDetail />} />
      <Route
        path="/login"
        element={
          auth?.token ? (
            auth.user?.role === "admin" ? (
              <Navigate to="/admin" replace />
            ) : auth.user?.role === "subadmin" ? (
              <Navigate to="/subadmin" replace />
            ) : (
              <Navigate to="/" replace />
            )
          ) : (
            <Login />
          )
        }
      />
      <Route
        path="/register"
        element={auth?.token ? <Navigate to="/" replace /> : <Register />}
      />
      <Route path="/cart" element={<Cart />} />
      <Route path="/wishlist" element={<Wishlist />} />

      <Route
        path="/admin/*"
        element={
          <AdminRoute>
            <DashboardLayout role="admin" />
             <div style={{ padding: 20 }}>
          <p>Test parent content</p>
        </div>
          </AdminRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="users" element={<UserManagement />} />
        <Route path="clients" element={<ClientManagement />} />
        <Route path="orders" element={<OrderList />} />
        <Route path="products" element={<Products />} />
      </Route>

      <Route
        path="/subadmin/*"
        element={
          <AdminOrSubadminRoute>
            <DashboardLayout role="subadmin" />
             <div style={{ padding: 20 }}>
          <p>Test parent content</p>
        </div>
          </AdminOrSubadminRoute>
        }
      >
        <Route index  element={<SubadminDashboard />} />
        <Route path="orders" element={<OrderList />} />
        <Route path="products" element={<Products />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
