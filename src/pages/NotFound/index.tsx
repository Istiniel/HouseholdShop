import React from 'react';
import st from './NotFound.module.scss';

const NotFound = () => {
  return (
    <main className={st.main}>
      <div className="wrapper">
        <div className={st.container}>
          <h2 className={st.nomatches__title}>{'Страница не найдена!'}</h2>
        </div>
      </div>
    </main>
  );
};

export default NotFound;
