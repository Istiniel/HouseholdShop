import React, { useState } from 'react';
import st from './FilterByPrice.module.scss';
import { useAppDispatch } from './../../redux/hooks';
import { filterByPriceRange } from '../../redux/features/goodsList/goodsSlice';

const FilterByPrice = () => {
  const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({
    min: 0,
    max: 1000,
  });

  const dispatch = useAppDispatch();

  function filterGoodsByPriceRange(e: React.SyntheticEvent<HTMLFormElement>) {
    dispatch(filterByPriceRange(priceRange));
    e.preventDefault();
  }

  return (
    <div className={st.container}>
      <p>Цена ₸</p>
      <form className={st.priceRange} onSubmit={filterGoodsByPriceRange}>
        <input
          type="number"
          value={priceRange.min}
          onChange={(e) => setPriceRange((prevState) => ({ ...prevState, min: +e.target?.value }))}
        />
        <span> - </span>
        <input
          type="number"
          value={priceRange.max}
          onChange={(e) => setPriceRange((prevState) => ({ ...prevState, max: +e.target?.value }))}
        />
        <button type="submit"></button>
      </form>
    </div>
  );
};

export default FilterByPrice;
