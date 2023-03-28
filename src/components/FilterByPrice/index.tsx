import React, { useState } from 'react';
import st from './FilterByPrice.module.scss';

const FilterByPrice = () => {
  const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({
    min: 0,
    max: 1000,
  });

  return (
    <div className={st.container}>
      <p>Цена ₸</p>
      <form className={st.priceRange}>
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
      </form>
    </div>
  );
};

export default FilterByPrice;
