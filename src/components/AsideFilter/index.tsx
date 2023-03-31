import React from 'react';
import st from './AsideFilter.module.scss';
import FilterByPrice from './../FilterByPrice/index';
import FilterByProducer from '../FilterByProducer';
import FilterByCategory from './../FilterByCategory/index';
import DropDown from '../DrowDown';
import { useMediaQueriesMinWidth } from '../../hooks/useMediaQueries';

const AsideFilter = () => {
  const { isSmall } = useMediaQueriesMinWidth();

  return (
    <div className={st.container}>
      <h2 className={st.title}>ПОДБОР ПО ПАРАМЕТРАМ</h2>
      {!isSmall && (
        <div className={st.sort}>
          <h3>Сортировка: </h3>
          <DropDown type="hover" options={['Название', 'Цена', 'По убыванию', 'По возрастанию']} />
        </div>
      )}
      <FilterByPrice />
      <FilterByProducer />
      <FilterByCategory />
    </div>
  );
};

export default AsideFilter;
