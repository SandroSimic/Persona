import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import LoginPage from "./pages/LoginPage";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={true} />
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<h1>Home</h1>} />
            <Route path="products" element={<h1>allProducts</h1>} />
            <Route path="product/:productId" element={<h1>productsId</h1>} />
          </Route>
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<h1>REGISTER</h1>} />
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
