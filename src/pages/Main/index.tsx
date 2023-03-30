import React from 'react';
import st from './Main.module.scss';
import { Link } from 'react-router-dom';

const MainPage = () => {
  return (
    <main className={st.main}>
      <div className="wrapper">
        <div className={st.container}>
          <Link to="/products" className={st.link}>
            Каталог
          </Link>
          <Link to="/cart" className={st.link}>
            Корзина
          </Link>
          <Link to="/admin" className={st.link}>
            Администрирование
          </Link>
        </div>
      </div>
    </main>
  );
};

export default MainPage;
