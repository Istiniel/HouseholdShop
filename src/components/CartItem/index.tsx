import React, { useState } from 'react';

import { GoodsType } from '../../API/API';
import st from './CartItem.module.scss';
import iconVolume from '../../assets/icons/icon_volume.svg';
import iconWeight from '../../assets/icons/icon_weight.svg';
import iconRemove from '../../assets/icons/icon_remove.svg';
import Counter from '../Counter';
import { useAppDispatch } from './../../redux/hooks';
import {
  decreaseCount,
  deleteItemFromCart,
  increaseCount,
} from '../../redux/features/cart/cartSlice';

export interface CartItemType extends GoodsType {
  count: number;
}

const CartItem: React.FC<CartItemType> = (item) => {
  const [itemCount, setItemCount] = useState<number>(item.count);
  const dispatch = useAppDispatch();

  let measureValue = `${item?.measure_value} `;
  let measureIcon = '';
  if (item?.measure_type === 'volume') {
    measureValue += 'мл';
    measureIcon = iconVolume;
  } else {
    measureValue += 'г';
    measureIcon = iconWeight;
  }

  function getProductName() {
    const name = item.brand + ' ' + item.title;
    if (name.length < 50) {
      return name;
    }
    return name.split(' ').slice(0, 7).join(' ') + '...';
  }

  return (
    <div className={st.container}>
      <div className={st.thumbContainer}>
        <img src={item.url} alt="thumb" className={st.thumb} />
      </div>
      <div className={st.description}>
        <div className={st.measure}>
          <img src={measureIcon} alt="measure_type" />
          <p>{measureValue}</p>
        </div>
        <h2 className={st.productName}>{getProductName()}</h2>
        <p className={st.productDescription}>{item.description}</p>
      </div>
      <div className={st.interactionBlock}>
        <Counter
          count={itemCount}
          setCount={setItemCount}
          decreaseCount={() => dispatch(decreaseCount(item))}
          increaseCount={() => dispatch(increaseCount(item))}
        />
        <h2 className={st.price}>{(item.price * item.count).toFixed(2)} ₸</h2>
        <button className={st.removeProduct} onClick={() => dispatch(deleteItemFromCart(item))}>
          <img src={iconRemove} alt="remove_icon" />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
