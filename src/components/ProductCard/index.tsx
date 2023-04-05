import React from 'react';

import st from './ProductCard.module.scss';
import Button from './../Button/index';
import iconToCart from '../../assets/icons/icon_tocart.svg';
import iconVolume from '../../assets/icons/icon_volume.svg';
import iconWeight from '../../assets/icons/icon_weight.svg';

import { GoodsType } from '../../API/API';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { addItemToCart } from '../../redux/features/cart/cartSlice';

const ProductCard: React.FC<GoodsType> = (props) => {
  const product = useAppSelector((state) => state.cart.goods.filter((e) => e.id === props.id)[0]);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  let measureValue = `${props.measure_value} `;
  let measureIcon = '';
  if (props.measure_type === 'volume') {
    measureValue += 'мл';
    measureIcon = iconVolume;
  } else {
    measureValue += 'г';
    measureIcon = iconWeight;
  }

  function navigateToItemPage() {
    navigate(`/products/${props.title} ${props.barcode}`);
  }

  function addItemsToCart(e: React.SyntheticEvent) {
    e.stopPropagation();

    dispatch(addItemToCart({ ...props, count: 1 }));
  }

  return (
    <div className={st.container} onClick={navigateToItemPage}>
      <div className={st.thumb}>
        <img src={props.url} alt="product__img" className={st.productImage} />
      </div>
      <div className={st.card}>
        <div className={st.measure}>
          <img src={measureIcon} alt="measure_type" />
          <p>{measureValue}</p>
        </div>
        <h3 className={st.productName}>
          {`${props.brand} `}
          <span>{props.title}</span>
        </h3>
        <h3 className={st.barcode}>
          Штрихкод:
          <span>{' ' + props.barcode}</span>
        </h3>
        <h3 className={st.producer}>
          Производитель:
          <span>{' ' + props.producer}</span>
        </h3>
        <h3 className={st.brand}>
          Бренд:
          <span>{' ' + props.brand}</span>
        </h3>
        <div className={st.toCard}>
          <h3>{`${props.price} ₸`}</h3>
          <Button
            padding="1rem 2rem"
            color="orange"
            callback={addItemsToCart}
            role={'buttonToCart'}
          >
            В КОРЗИНУ <img src={iconToCart} alt="icon_tocart" />
            {product && <p className={st.itemCount}>в корзине: {product.count} шт.</p>}
          </Button>
        </div>
        <div className={st.tags}>
          {props.tags.map((tag) => (
            <h3 key={tag}>{`${tag}`}</h3>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
