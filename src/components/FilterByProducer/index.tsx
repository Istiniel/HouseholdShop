import React from 'react';
import { useAppSelector } from '../../redux/hooks';
import SearchBar from '../SearchBar';

import st from './FilterByProducer.module.scss';

const FilterByProducer = () => {
  const goods = useAppSelector((state) => state.goodsList.goods);
  const producers = goods
    .map((item) => item.producer)
    .filter((producer, index, producers) => index === producers.indexOf(producer));

  function itemsByBrandCount(producer: string) {
    const producers = goods.map((item) => item.producer);
    return producers.reduce((acc, prod) => (prod === producer ? (acc += 1) : acc), 0);
  }

  return (
    <div className={st.container}>
      <h3>Производитель</h3>
      <form className={st.form}>
        <SearchBar />
        <div className={st.inputContainer}>
          {producers.map((producer) => (
            <div key={producer}>
              <input type="checkbox" name={producer} id={producer} />
              <label htmlFor={producer}>
                {producer} <span>{` (${itemsByBrandCount(producer)})`}</span>{' '}
              </label>
            </div>
          ))}
        </div>
      </form>
    </div>
  );
};

export default FilterByProducer;
