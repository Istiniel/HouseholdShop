import React from 'react';
import { useLocation, Link, useParams } from 'react-router-dom';
import st from './BreadCrumbs.module.scss';

const BreadCrumbs = () => {
  const location = useLocation();
  const { productURL } = useParams();

  const links = {
    products: 'Каталог',
    cart: 'Корзина',
    admin: 'Управление',
  };

  let currentLink = '';
  const crumbs = location.pathname
    .split('/')
    .filter((crumb) => crumb !== '')
    .map((crumb) => {
      currentLink += `/${crumb}`;
      return (
        <Link to={currentLink} className={st.crumb} key={crumb}>
          {crumb in links ? links[crumb as keyof typeof links] : productURL}
        </Link>
      );
    });

  return (
    <div className={st.breadCrumbs}>
      <div className="wrapper">
        <div className={st.container}>
          <Link to="/" className={st.crumb}>
            Главная
          </Link>
          {crumbs}
        </div>
      </div>
    </div>
  );
};

export default BreadCrumbs;
