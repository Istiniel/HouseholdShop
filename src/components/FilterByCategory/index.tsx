import React from 'react';
import st from './FilterByCategory.module.scss';
import { PRODUCT_TAGS } from './../../constants/constants';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { filterByTag } from '../../redux/features/goodsList/goodsSlice';

const FilterByCategory = () => {
  const dispatch = useAppDispatch();
  const activeTag = useAppSelector((state) => state.goodsList.activeTag);

  function filterCardsByCategory(e: React.SyntheticEvent) {
    let tag = (e.target as HTMLButtonElement)?.textContent as string;
    tag = tag.replace('\n', '');

    if (tag === activeTag) {
      dispatch(filterByTag(''));
      return;
    }

    dispatch(filterByTag(tag));
  }

  return (
    <div className={st.container}>
      <h2>Категория</h2>
      {PRODUCT_TAGS.map((tag) => (
        <h3 key={tag} className={st.tag} onClick={filterCardsByCategory}>
          {tag}
        </h3>
      ))}
    </div>
  );
};

export default FilterByCategory;
