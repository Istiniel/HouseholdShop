import React from 'react';
import st from './FilterByCategory.module.scss';
import { PRODUCT_TAGS } from './../../constants/constants';

const FilterByCategory = () => {
  return (
    <div className={st.container}>
      <h2>Категория</h2>
      {PRODUCT_TAGS.map((tag) => (
        <h3 key={tag} className={st.tag}>
          {tag}
        </h3>
      ))}
    </div>
  );
};

export default FilterByCategory;
