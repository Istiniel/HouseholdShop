import React, { useEffect } from 'react';
import st from './Products.module.scss';

import { PRODUCT_TAGS } from '../../constants/constants';
import DropDown from './../../components/DrowDown/index';
import ProductCards from './../../components/ProductCards/index';
import {
  fetchGoods,
  filterByTag,
  selectFilteredState,
} from './../../redux/features/goodsList/goodsSlice';
import { useAppDispatch, useAppSelector } from './../../redux/hooks';
import AsideFilter from './../../components/AsideFilter/index';
import { useMediaQueriesMinWidth } from '../../hooks/useMediaQueries';

const Products = () => {
  const dispatch = useAppDispatch();
  const activeTag = useAppSelector((state) => state.goodsList.activeTag);
  const goods = useAppSelector(selectFilteredState);

  function filterCardsByCategory(e: React.MouseEvent<HTMLButtonElement>) {
    let tag = (e.target as HTMLButtonElement)?.textContent as string;
    tag = tag.replace('\n', '');

    if (tag === activeTag) {
      dispatch(filterByTag(''));
      return;
    }

    dispatch(filterByTag(tag));
  }

  function isTagActive(tag: string) {
    return activeTag.indexOf(tag.replace(/\n/, '')) !== -1 ? ` ${st.active}` : '';
  }

  useEffect(() => {
    dispatch(fetchGoods());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { isSmall } = useMediaQueriesMinWidth();

  return (
    <>
      <div className={st.products}>
        <div className="wrapper">
          <div className={st.topSection}>
            <h2>Косметика и гигиена</h2>
            {isSmall && (
              <div className={st.sort}>
                <h3>Сортировка: </h3>
                <DropDown
                  type="hover"
                  options={['Название', 'Цена', 'По убыванию', 'По возрастанию']}
                />
              </div>
            )}
          </div>
          <div className={st.tags}>
            {PRODUCT_TAGS.map((tag) => (
              <button
                key={tag}
                className={st.tag + isTagActive(tag)}
                onClick={filterCardsByCategory}
              >
                {tag}
              </button>
            ))}
          </div>
          <div className={st.content}>
            <AsideFilter />
            <ProductCards goods={goods} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
