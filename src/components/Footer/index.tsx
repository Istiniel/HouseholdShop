import React from 'react';
import { Link } from 'react-router-dom';

import st from './footer.module.scss';
import Button from './../Button/index';
import SearchBar from './../SearchBar/index';

import logo from '../../assets/icons/logo.svg';
import searchIcon from '../../assets/icons/arrow-right.svg';
import iconWhatsapp from '../../assets/icons/icon_whatsapp.svg';
import iconTelegram from '../../assets/icons/icon_telegram.svg';
import iconVisa from '../../assets/icons/icon_visa.svg';
import iconMastercard from '../../assets/icons/icon_master.svg';
import pricelistLogo from '../../assets/icons/pricelist_icon.svg';

const Footer = () => {
  return (
    <footer className={st.footer}>
      <div className="wrapper">
        <div className={st.container}>
          <div className={st.subsribe}>
            <div className={st.about}>
              <Link to="/">
                <img src={logo} alt="logo" className={st.logo} />
              </Link>
              <p>
                {`Компания «Султан» — снабжаем розничные магазины товарами
              "под ключ" в Кокчетаве и Акмолинской области`}
              </p>
            </div>
            <div className={st.subsribeEmail}>
              <h4>Подпишись на скидки и акции</h4>
              <SearchBar
                type="email"
                placeholder="Введите ваш E-mail"
                backgroundImage={searchIcon}
              />
            </div>
          </div>
          <div className={st.menu}>
            <h2>Меню сайта:</h2>
            <a href="#">О компании</a>
            <a href="#">Доставка и оплата</a>
            <a href="#">Возврат</a>
            <a href="#">Контакты</a>
          </div>
          <div className={st.categories}>
            <h2>Категории:</h2>
            <a href="#">Бытовая химия</a>
            <a href="#">Косметика и гигиена</a>
            <a href="#">Товары для дома</a>
            <a href="#">Товары для детей и мам</a>
            <a href="#">Посуда</a>
          </div>
          <div className={st.pricelist}>
            <h2>Скачать прайс-лист:</h2>
            <Button color="orange" padding="2.1rem 4.4rem">
              Прайс-лист <img src={pricelistLogo} alt="card__logo" />
            </Button>
            <h4>Связь в мессенджерах:</h4>
            <div className={st.messengers}>
              <a href="#">
                <img src={iconWhatsapp} alt="icon_whatsapp" />
              </a>
              <a href="#">
                <img src={iconTelegram} alt="icon_telegram" />
              </a>
            </div>
          </div>
          <div className={st.contacts}>
            <h2>Контакты:</h2>
            <div className={st.phoneBlock}>
              <h3 className={st.phone}>+7 (777) 490-00-91</h3>
              <p className={st.workHours}>время работы: 9:00-20:00</p>
              <a href="#" className={st.callback}>
                Заказать звонок
              </a>
            </div>
            <div className={st.emailBlock}>
              <h3 className={st.email}>opt.sultan@mail.ru </h3>
              <p className={st.contactsDetail}>На связи в любое время</p>
            </div>
            <div className={st.cards}>
              <a href="#">
                <img src={iconVisa} alt="icon_visa" />
              </a>
              <a href="#">
                <img src={iconMastercard} alt="icon_mastercard" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
