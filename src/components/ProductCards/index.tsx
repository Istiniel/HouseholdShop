import React from 'react';
import { useAppSelector } from '../../redux/hooks';
import { selectGoods } from './../../redux/features/goodsList/goodsSlice';
import ProductCard from './../ProductCard/index';
import st from './ProductsCard.module.scss';

const ProductCards = () => {
  const goods = useAppSelector(selectGoods);

  return (
    <div className={st.container}>
      {goods.map((item) => (
        <ProductCard key={item.id} {...item} />
      ))}
    </div>
  );
};

export default ProductCards;
