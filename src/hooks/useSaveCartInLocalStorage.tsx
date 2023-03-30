import { useEffect, useCallback } from 'react';
import {
  fetchCartFromLocalStorage,
  selectCartContent,
  selectSummary,
} from '../redux/features/cart/cartSlice';
import { useAppSelector } from '../redux/hooks';
import { useAppDispatch } from '../redux/hooks';

const useSaveCartInLocalStorage = () => {
  const dispatch = useAppDispatch();
  const cartContent = useAppSelector(selectCartContent);
  const summary = useAppSelector(selectSummary);

  useEffect(() => {
    dispatch(fetchCartFromLocalStorage());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const saveCartInLocalStorage = useCallback(() => {
    localStorage.setItem('cart', JSON.stringify(cartContent));
    localStorage.setItem('summary', JSON.stringify(summary));
  }, [cartContent, summary]);

  useEffect(() => {
    window.addEventListener('beforeunload', saveCartInLocalStorage);

    return () => {
      window.removeEventListener('beforeunload', saveCartInLocalStorage);
    };
  }, [saveCartInLocalStorage]);
};

export default useSaveCartInLocalStorage;
