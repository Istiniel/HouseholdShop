import React from 'react';
import { Provider } from 'react-redux';

import Main from './pages/Main/';
import SharedLayout from './components/SharedLayout';
import NotFound from './pages/NotFound/';

import './styles/App.scss';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { store } from './redux/store';
import Products from './pages/Products/index';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SharedLayout />}>
            <Route index element={<Main />} />
            <Route path="products" element={<Products />} />
            <Route path="products/:productId" element={<NotFound />} />
            <Route path="cart" element={<NotFound />} />
            <Route path="404" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
