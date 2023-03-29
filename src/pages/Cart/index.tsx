import React, { useEffect, useState } from 'react';
import { clearCart, selectCartContent } from '../../redux/features/cart/cartSlice';
import { useAppSelector } from '../../redux/hooks';
import st from './Cart.module.scss';
import CartItem from './../../components/CartItem/index';
import Button from '../../components/Button';
import { selectSummary } from './../../redux/features/cart/cartSlice';
import { useAppDispatch } from './../../redux/hooks';

const Cart = () => {
  const [isEmpty, setIsEmpty] = useState(true);
  const [isPurchased, setIsPurchased] = useState(false);
  const totalPrice = useAppSelector(selectSummary);
  const cartContent = useAppSelector(selectCartContent);

  const dispatch = useAppDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [isPurchased, setIsPurchased]);

  useEffect(() => {
    if (cartContent.length > 0) {
      setIsEmpty(false);
    } else {
      setIsEmpty(true);
    }
  }, [cartContent, isEmpty, setIsEmpty]);

  function purchase() {
    if (cartContent.length > 0) {
      dispatch(clearCart());
      setIsPurchased(true);
    }
  }

  return (
    <div className={st.cart}>
      <div className="wrapper">
        <div className={st.container}>
          {isPurchased && <h2 className={st.gratitudeMessage}>Спасибо за заказ</h2>}
          {isEmpty && !isPurchased && <h2 className={st.gratitudeMessage}>Корзина пуста</h2>}
          {!isEmpty && (
            <>
              <h2 className={st.title}>Корзина</h2>
              {cartContent.map((item) => {
                return <CartItem key={item.id} {...item} />;
              })}
              <div className={st.purchaseBlock}>
                <Button padding="2.1rem 3.75rem" color="orange" callback={purchase}>
                  Оформить заказ
                </Button>
                <h3 className={st.totalPrice}>{totalPrice} ₸</h3>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
