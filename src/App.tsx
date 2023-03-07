import React from 'react';
import { Routes, Route, NavLink, Outlet } from 'react-router-dom';
import NoMatch from './routes/nomatch';
import Products from './demo/products';
import Product from './demo/product';
import ProductIndex from './demo/productindex';
import ProductRegister from './demo/productRegister';
import ProductModify from './demo/productModify';

const Layout = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Outlet />
    </div>
  );
};

export default function App() {
  return (
    <div className="App">
      <h1>Hello React Router v6</h1>
      <ul>
        <li>
          <NavLink
            className={({ isActive }) => (isActive ? 'active' : undefined)}
            to="/products"
          >
            Products
          </NavLink>
        </li>
      </ul>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/products" element={<Products />}>
            <Route index element={<ProductIndex />} />
            <Route path=":productId">
              <Route index element={<Product />} />
              <Route path="edit" element={<ProductModify />} />
            </Route>
            <Route path="register" element={<ProductRegister />} />
          </Route>
        </Route>
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </div>
  );
}

