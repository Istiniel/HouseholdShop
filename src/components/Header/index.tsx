import React from 'react';
import { Link } from 'react-router-dom';

import locationLogo from '../../assets/icons/icon_location.svg';
import emailLogo from '../../assets/icons/icon_email.svg';
import itemsLogo from '../../assets/icons/items_icon.svg';
import pricelistLogo from '../../assets/icons/pricelist_icon.svg';
import Logo from '../../assets/icons/logo.svg';
import callbackImage from '../../assets/images/callback_img.png';
import cartImage from '../../assets/icons/icon_cart.svg';

import st from './header.module.scss';
import { NavItemProps } from '../NavItem';
import NavList from '../NavList/index';
import Button from '../Button';
import { useAppSelector } from '../../redux/hooks';
import { selectSummary } from '../../redux/features/cart/cartSlice';
import SearchBar from '../SearchBar/index';

const Header: React.FC = () => {
  const summaryPrice = useAppSelector(selectSummary);

  const headerLinks: NavItemProps[] = [
    { link: 'about', title: 'О Компании' },
    { link: 'checkout', title: 'Доставка и оплата' },
    { link: 'refund', title: 'Возврат' },
    { link: 'contacts', title: 'Контакты' },
  ];

  return (
    <header className={st.header}>
      <div className={st.headerTop}>
        <div className={st.wrapper}>
          <div className={st.topContainer}>
            <div className={st.contactBlock}>
              <div className={st.contactItem}>
                <a href="#">
                  <img src={locationLogo} alt="icon_location" />
                </a>
                <div>
                  <h3>г. Кокчетав, ул. Ж. Ташенова 129Б</h3>
                  <p>{'(Рынок Восточный)'}</p>
                </div>
              </div>
              <div className={st.contactItem}>
                <a href="#">
                  <img src={emailLogo} alt="icon_location" />
                </a>
                <div>
                  <h3>opt.sultan@mail.ru</h3>
                  <p>На связи в любое время</p>
                </div>
              </div>
            </div>
            <nav className={st.nav}>
              <NavList navLinks={headerLinks} />
            </nav>
          </div>
        </div>
      </div>
      <div className={st.headerBottom}>
        <div className={st.wrapper}>
          <div className={st.bottomContainer}>
            <Link to="/">
              <img src={Logo} alt="logo__icon" />
            </Link>
            <Link to="/products">
              <Button color="orange" padding="2.1rem 5.4rem">
                Каталог <img src={itemsLogo} alt="card__logo" />
              </Button>
            </Link>
            <SearchBar />
            <div className={st.interactionBlock}>
              <div className={st.callback}>
                <div className={st.callbackInfo}>
                  <h3>+7 (777) 490-00-91</h3>
                  <p>время работы: 9:00-20:00</p>
                  <a href="#">Заказать звонок</a>
                </div>
                <img src={callbackImage} alt="callback_img" />
              </div>
              <Button color="orange" padding="2.1rem 4.4rem">
                Прайс-лист <img src={pricelistLogo} alt="card__logo" />
              </Button>
              <div className={st.cart}>
                <a href="#">
                  <img src={cartImage} alt="card_img" />
                </a>
                <div className={st.cartInfo}>
                  <p>Корзина</p>
                  <h3>{summaryPrice + '₸'}</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
