import { useEffect, useCallback } from 'react';
import { useAppSelector } from '../redux/hooks';
import { fetchGoods, selectFilteredState } from '../redux/features/goodsList/goodsSlice';
import { useAppDispatch } from '../redux/hooks';

const useSaveGoodsInLocalStorage = () => {
  const dispatch = useAppDispatch();
  const goods = useAppSelector(selectFilteredState);

  useEffect(() => {
    dispatch(fetchGoods());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const saveGoodsInLocalStorage = useCallback(() => {
    localStorage.setItem('goods', JSON.stringify(goods));
  }, [goods]);

  useEffect(() => {
    saveGoodsInLocalStorage();
    window.addEventListener('beforeunload', saveGoodsInLocalStorage);

    return () => {
      window.removeEventListener('beforeunload', saveGoodsInLocalStorage);
    };
  }, [saveGoodsInLocalStorage]);
};

export default useSaveGoodsInLocalStorage;
