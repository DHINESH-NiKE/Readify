import { Route, Routes } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { Cart } from "./pages/Cart";
import { Homepage } from "./pages/Homepage";
import { Shop } from "./pages/Shop";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
function App() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios.get("/api/products").then((res) => {
        console.log(res.data);
        setProducts(res.data);
    });
  }, []);
  return (
    <Routes>
      <Route index element={<Homepage products={products} />} />
      <Route path="/shop" element={<Shop products={products} />} />
      <Route path="/checkout" element={<Cart />} />
      <Route path="/login" element={<LoginPage/>} />
      <Route path="/register" element={<RegisterPage/>} />
    </Routes>
  );
}

export default App;
