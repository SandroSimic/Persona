import { lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./components/ProtectedRoute";

// 1. Convert these to lazy imports
const Layout = lazy(() => import("./layout/Layout"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const MainPage = lazy(() => import("./pages/MainPage"));
const AllProducts = lazy(() => import("./pages/AllProducts"));
const ProductDetailsPage = lazy(() => import("./pages/ProductDetailsPage"));
const OrderPage = lazy(() => import("./pages/OrderPage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const AdminLayout = lazy(() => import("./layout/AdminLayout"));
const AdminDashboard = lazy(() => import("./components/admin/AdminDashboard"));
const AdminProducts = lazy(() =>
  import("./components/admin/adminProducts/AdminProducts")
);
const AdminProductForm = lazy(() =>
  import("./components/admin/adminProducts/addProductForm/AdminProductForm")
);

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<MainPage />} />
              <Route path="products" element={<AllProducts />} />
              <Route
                path="product/:productId"
                element={<ProductDetailsPage />}
              />
              <Route path="order" element={<OrderPage />} />
              <Route path="profile" element={<ProfilePage />} />
            </Route>

            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<LoginPage register={true} />} />
            <Route path="forgot-password" element={<ForgotPassword />} />

            <Route
              path="admin/*"
              element={
                <ProtectedRoute>
                  <Routes>
                    <Route path="/" element={<AdminLayout />}>
                      <Route index element={<AdminDashboard />} />
                      <Route path="products" element={<AdminProducts />} />
                      <Route
                        path="products/new"
                        element={<AdminProductForm isEdit={false} />}
                      />
                      <Route
                        path="products/edit/:productId"
                        element={<AdminProductForm isEdit={true} />}
                      />
                    </Route>
                  </Routes>
                </ProtectedRoute>
              }
            />

            <Route path="*" element={<h1>Not Found</h1>} />
          </Routes>
        </Suspense>
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
