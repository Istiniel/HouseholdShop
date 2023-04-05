import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import itemsLogo from '../../assets/icons/items_icon.svg';
import Logo from '../../assets/icons/logo.svg';
import cartImage from '../../assets/icons/icon_cart.svg';
import iconSearch from '../../assets/images/search_input.png';
import iconBurger from '../../assets/icons/icon_burger.png';

import st from './header.module.scss';
import { NavItemProps } from '../NavItem';
import NavList from '../NavList/index';

const Header: React.FC = () => {
  const [menuActive, setMenuActive] = useState<boolean>(false);

  const headerLinks: NavItemProps[] = [
    { link: 'about', title: 'О Компании' },
    { link: 'checkout', title: 'Доставка и оплата' },
    { link: 'refund', title: 'Возврат' },
    { link: 'contacts', title: 'Контакты' },
  ];

  useEffect(() => {
    if (menuActive) {
      const scrollbarWidth = window.innerWidth - document.body.clientWidth + 'px';
      document.body.style.paddingRight = '' + scrollbarWidth;
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.paddingRight = '0px';
      document.body.style.overflow = '';
    }
  }, [menuActive, setMenuActive]);

  return (
    <header className={st.header}>
      <div className={st.headerTop}>
        <div className={st.wrapper}>
          <div
            className={st.navModal + (menuActive ? ` ${st.active}` : '')}
            onClick={() => setMenuActive(false)}
          >
            <nav className={st.nav} onClick={(e) => e.stopPropagation()}>
              <NavList navLinks={headerLinks} />
            </nav>
          </div>
          <div className={st.topContainer}>
            <button
              role="burgerMenuButton"
              className={st.burgerButton}
              onClick={(e: React.SyntheticEvent) => {
                setMenuActive(!menuActive);
                e.stopPropagation();
              }}
            >
              <img src={iconBurger} alt="icon_burger" />
            </button>
            <Link to="/" className={st.logo}>
              <img src={Logo} alt="logo__icon" />
            </Link>
            <div className={st.cart}>
              <Link to="/cart">
                <img src={cartImage} alt="card_img" className={st.cartIcon} />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className={st.headerBottom}>
        <div className={st.wrapper}>
          <div className={st.bottomContainer}>
            <Link to="/products" className={st.productsLink}>
              <img src={itemsLogo} alt="card__logo" className={st.iconProducts} />
              <h3>Каталог</h3>
            </Link>
            <Link to="/products" className={st.searchBar}>
              <img src={iconSearch} alt="card__logo" className={st.iconSearch} />
              <h3>Поиск</h3>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
