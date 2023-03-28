import React from 'react';
import { Outlet } from 'react-router-dom';

import Header from '../Header';
import Footer from '../Footer';
import BreadCrumbs from './../BreadCrumbs/index';
import st from './SharedLayout.module.scss';

const SharedLayout = () => {
  return (
    <>
      <Header />
      <BreadCrumbs />
      <Outlet />
      <Footer />
    </>
  );
};

export default SharedLayout;
