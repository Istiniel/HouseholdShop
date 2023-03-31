import React from 'react';
import { Outlet } from 'react-router-dom';

import Header from '../Header';
import Footer from '../Footer';
import BreadCrumbs from './../BreadCrumbs/index';
import { useMediaQueriesMinWidth } from '../../hooks/useMediaQueries';
import HeaderOnMobile from '../HeaderOnMobile';
import FooterOnMobile from '../FooterOnMobile';

const SharedLayout = () => {
  const { isSmall } = useMediaQueriesMinWidth();

  return (
    <>
      {isSmall ? <Header /> : <HeaderOnMobile />}
      <BreadCrumbs />
      <Outlet />
      {isSmall ? <Footer /> : <FooterOnMobile />}
    </>
  );
};

export default SharedLayout;
