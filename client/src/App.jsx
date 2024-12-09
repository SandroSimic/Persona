import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import LoginPage from "./pages/LoginPage";
import { Toaster } from "react-hot-toast";
import MainPage from "./pages/MainPage";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminLayout from "./layout/AdminLayout";
import AdminDashboard from "./components/admin/AdminDashboard";
import AdminProducts from "./components/admin/adminProducts/AdminProducts";
import AdminProductForm from "./components/admin/adminProducts/AdminProductForm";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={true} />
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<MainPage />} />
            <Route path="products" element={<h1>allProducts</h1>} />
            <Route path="product/:productId" element={<h1>productsId</h1>} />
          </Route>
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<LoginPage register={true} />} />
          <Route
            path="admin/*"
            element={
              <ProtectedRoute>
                <Routes>
                  <Route path="/" element={<AdminLayout />}>
                    <Route index element={<AdminDashboard />} />
                    <Route path="products" element={<AdminProducts />} />
                    <Route path="products/new" element={<AdminProductForm />} />
                    <Route
                      path="analytics"
                      element={<h1>Admin Analytics</h1>}
                    />
                  </Route>
                </Routes>
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
      </Router>

      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          style: {
            fontSize: "1.7rem",
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
