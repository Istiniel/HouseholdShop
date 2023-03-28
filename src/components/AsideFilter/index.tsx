import React from 'react';
import st from './AsideFilter.module.scss';
import FilterByPrice from './../FilterByPrice/index';
import FilterByProducer from '../FilterByProducer';
import FilterByCategory from './../FilterByCategory/index';

const AsideFilter = () => {
  return (
    <div className={st.container}>
      <h2 className={st.title}>ПОДБОР ПО ПАРАМЕТРАМ</h2>
      <FilterByPrice />
      <FilterByProducer />
      <FilterByCategory />
    </div>
  );
};

export default AsideFilter;
