import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { fetchGoods, selectFilteredState } from '../../redux/features/goodsList/goodsSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';

import st from './ItemPage.module.scss';
import iconToCart from '../../assets/icons/icon_tocart.svg';
import iconVolume from '../../assets/icons/icon_volume.svg';
import iconWeight from '../../assets/icons/icon_weight.svg';
import iconPriceList from '../../assets/icons/pricelist_icon.svg';
import iconShare from '../../assets/icons/icon_share.svg';
import Button from '../../components/Button';
import Counter from '../../components/Counter';
import { addItemToCart } from '../../redux/features/cart/cartSlice';
import { useMediaQueriesMinWidth } from './../../hooks/useMediaQueries';

const ItemPage = () => {
  const [itemCount, setItemCount] = useState<number>(1);

  const dispatch = useAppDispatch();

  const { productURL } = useParams();
  const productID = Number(productURL?.match(/(\d+)$/)![0]);
  const goods = useAppSelector(selectFilteredState);
  const product = goods.filter((item) => item.barcode === +productID)[0];

  useEffect(() => {
    dispatch(fetchGoods());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let measureValue = `${product?.measure_value} `;
  let measureIcon = '';
  if (product?.measure_type === 'volume') {
    measureValue += 'мл';
    measureIcon = iconVolume;
  } else {
    measureValue += 'г';
    measureIcon = iconWeight;
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [productURL]);

  function addItemsToCart(e: React.SyntheticEvent) {
    e.stopPropagation();

    dispatch(addItemToCart({ ...product, count: itemCount }));
  }

  const { isSmall } = useMediaQueriesMinWidth();

  return (
    <div className={st.product}>
      <div className="wrapper">
        <div className={st.container}>
          <div className={st.thumbContainer}>
            <img src={product?.url} alt="thumb" className={st.thumb} />
          </div>
          <div className={st.info}>
            <p className={st.presence}>В наличии</p>
            <h2 className={st.productTitle}>
              <span>{product?.brand} </span>
              {product?.title}
            </h2>
            {isSmall && (
              <div className={st.measure}>
                <img src={measureIcon} alt="measure_type" />
                <p>{measureValue}</p>
              </div>
            )}
            <div className={st.cartSection}>
              <div className={st.price}>{product?.price} ₸</div>
              <Counter count={itemCount} setCount={setItemCount} />
              <Button
                padding="1rem 2rem"
                color="orange"
                callback={addItemsToCart}
                className={st.toCartButton}
                role="buttonToCart"
              >
                В корзину <img src={iconToCart} alt="icon_tocart" />
              </Button>
              <hr />
              <a href="#" className={st.share}>
                <img src={iconShare} alt="icon_share" />
              </a>
              <div className={st.bonus}>
                <h3>
                  При покупке от <span>10 000 ₸</span> бесплатная{'\n'} доставка по Кокчетаву и
                  области
                </h3>
              </div>
              <a href="#" className={st.priceList}>
                Прайс-лист <img src={iconPriceList} alt="icon_pricelist" />
              </a>
            </div>
            <div className={st.productInfo}>
              <div className={st.propertiesContainer}>
                <h3 className={st.property}>
                  Производитель:
                  <span>{' ' + product?.producer}</span>
                </h3>
                <h3 className={st.property}>
                  Бренд:
                  <span>{' ' + product?.brand}</span>
                </h3>
                <h3 className={st.property}>
                  Артикул:
                  <span>{' ' + product?.barcode}</span>
                </h3>
                <h3 className={st.property}>
                  Штрихкод:
                  <span>{' ' + product?.barcode}</span>
                </h3>
              </div>
              <details open className={st.description}>
                <summary>Описание</summary>
                {product?.description}
              </details>
              <details open className={st.properties}>
                <summary>Характеристики</summary>
                <div className={st.propertiesContainer}>
                  <h3 className={st.property}>
                    Назначение:
                    <span>{' ' + product?.brand}</span>
                  </h3>
                  <h3 className={st.property}>
                    Тип:
                    <span>{' ' + product?.brand}</span>
                  </h3>
                  <h3 className={st.property}>
                    Производитель:
                    <span>{' ' + product?.producer}</span>
                  </h3>
                  <h3 className={st.property}>
                    Бренд:
                    <span>{' ' + product?.brand}</span>
                  </h3>
                  <h3 className={st.property}>
                    Артикул:
                    <span>{' ' + product?.barcode}</span>
                  </h3>
                  <h3 className={st.property}>
                    Штрихкод:
                    <span>{' ' + product?.barcode}</span>
                  </h3>
                  <h3 className={st.property}>
                    Вес:
                    <span> {product?.measure_type === 'weight' ? measureValue : '-'}</span>
                  </h3>
                  <h3 className={st.property}>
                    Объем:
                    <span> {product?.measure_type === 'volume' ? measureValue : '-'}</span>
                  </h3>
                </div>
              </details>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemPage;
