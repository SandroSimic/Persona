import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import MainPage from "./layout/MainPage";
import Product from "./Pages/Product";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route path="/product/:id" element={<Product />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
