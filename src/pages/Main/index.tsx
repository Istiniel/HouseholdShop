import React from 'react';
import st from './Main.module.scss';
import { Navigate } from 'react-router-dom';

const MainPage = () => {
  return (
    <main className={st.main}>
      <div className="wrapper">
        <div className={st.container}>
          <Navigate to={'/products'} />
        </div>
      </div>
    </main>
  );
};

export default MainPage;
