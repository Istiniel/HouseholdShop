import React from 'react';

import Main from './pages/Main/';
import SharedLayout from './components/SharedLayout';
import NotFound from './pages/NotFound/';

import './styles/App.scss';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Products from './pages/Products/index';
import ItemPage from './pages/ItemPage/index';
import Cart from './pages/Cart/index';
import Admin from './pages/Admin';
import useSaveCartAndGoodsInLocalStorage from './hooks/useSaveCartInLocalStorage';

function App() {
  useSaveCartAndGoodsInLocalStorage();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<Main />} />
          <Route path="products" element={<Products />} />
          <Route path="products/:productURL" element={<ItemPage />} />
          <Route path="cart" element={<Cart />} />
          <Route path="admin" element={<Admin />} />
          <Route path="404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
