import React, { useEffect } from 'react';
import st from './Products.module.scss';
import { PRODUCT_TAGS } from '../../constants/constants';
import DropDown from './../../components/DrowDown/index';
import ProductCards from './../../components/ProductCards/index';
import { fetchGoods } from './../../redux/features/goodsList/goodsSlice';
import { useAppDispatch } from './../../redux/hooks';
import AsideFilter from './../../components/AsideFilter/index';

const Products = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchGoods());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className={st.products}>
        <div className="wrapper">
          <div className={st.topSection}>
            <h2>Косметика и гигиена</h2>
            <div className={st.sort}>
              <h3>Сортировка: </h3>
              <DropDown
                type="hover"
                options={['Название', 'Цена', 'По убыванию', 'По возрастанию']}
              />
            </div>
          </div>
          <div className={st.tags}>
            {PRODUCT_TAGS.map((tag) => (
              <button key={tag} className={st.tag}>
                {tag}
              </button>
            ))}
          </div>
          <div className={st.content}>
            <AsideFilter />
            <ProductCards />
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
