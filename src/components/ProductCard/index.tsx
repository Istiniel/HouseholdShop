import React from 'react';

import st from './ProductCard.module.scss';
import Button from './../Button/index';
import iconToCart from '../../assets/icons/icon_tocart.svg';
import iconVolume from '../../assets/icons/icon_volume.svg';
import iconWeight from '../../assets/icons/icon_weight.svg';

import { GoodsType } from '../../API/API';

const ProductCard: React.FC<GoodsType> = (props) => {
  let measureValue = `${props.measure_value} `;
  let measureIcon = iconVolume;
  if (props.measure_type === 'volume') {
    measureValue += 'мл';
  } else {
    measureValue += 'г';
    measureIcon = iconWeight;
  }

  return (
    <div className={st.container}>
      <img src={props.url} alt="product__img" className={st.productImage} />
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
        <Button padding="1rem 2rem" color="orange">
          В КОРЗИНУ <img src={iconToCart} alt="icon_tocart" />
        </Button>
      </div>
      <div></div>
    </div>
  );
};

export default ProductCard;
