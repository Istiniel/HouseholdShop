import React, { useState } from 'react';
import st from './AsideFilter.module.scss';
import FilterByPrice from './../FilterByPrice/index';
import FilterByProducer from '../FilterByProducer';
import FilterByCategory from './../FilterByCategory/index';
import iconDropDown from '../../assets/images/dropdown.png';
import DropDown from '../DrowDown';
import { useMediaQueriesMinWidth } from '../../hooks/useMediaQueries';

const AsideFilter = () => {
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const { isSmall } = useMediaQueriesMinWidth();

  return (
    <div className={st.container}>
      <div className={st.heading}>
        <h2 className={st.title}>ПОДБОР ПО ПАРАМЕТРАМ</h2>
        <img
          src={iconDropDown}
          alt="icon_arrow"
          className={st.iconDropDown + ' ' + (isOpened ? st.active : '')}
          onClick={() => setIsOpened(!isOpened)}
        />
      </div>
      {isOpened && (
        <>
          <FilterByPrice />
          <FilterByProducer />
        </>
      )}
      <FilterByCategory />
      {!isSmall && (
        <div className={st.sort}>
          <h3>Сортировка: </h3>
          <DropDown type="hover" options={['Название', 'Цена', 'По убыванию', 'По возрастанию']} />
        </div>
      )}
    </div>
  );
};

export default AsideFilter;
