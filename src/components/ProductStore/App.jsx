import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import './styles.css';
import Home from "./Home.jsx";
import Products from "./Products.jsx";
import ProductDetails from "./ProductDetails.jsx";

const App = () => (

  <>
    <nav className="navbar">
      <Link to="/" className="navLink">Home</Link>
      <Link to="/products" className="navLink">Products</Link>
    </nav>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Products />} />
      <Route path="/products/:productId" element={<ProductDetails />} />
    </Routes>
  </>
);


export default App;
