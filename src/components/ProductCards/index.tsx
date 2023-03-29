import React, { useEffect, useState } from 'react';
import { GoodsType } from '../../API/API';
import Pagination from '../Pagination';
import ProductCard from './../ProductCard/index';
import st from './ProductsCards.module.scss';
import arrowLeft from '../../assets/icons/icon_pagLeft.png';
import arrowRight from '../../assets/icons/icon_pagRight.svg';

const ProductCards = ({ goods }: { goods: GoodsType[] }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(6);

  const lastItemIndex = itemsPerPage * currentPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;
  const currentItems = goods.slice(firstItemIndex, lastItemIndex);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  useEffect(() => {
    setCurrentPage(1);
  }, [goods]);

  return (
    <div className={st.cards}>
      <div className={st.container}>
        {currentItems.map((item) => (
          <ProductCard key={item.id} {...item} />
        ))}
      </div>
      <div className={st.pagination}>
        <img
          src={arrowLeft}
          alt="icon_arrowLeft"
          className={st.prev}
          onClick={() => setCurrentPage((prevState) => Math.max(prevState - 1, 1))}
        />
        <Pagination
          itemsPerPage={itemsPerPage}
          totalItems={goods.length}
          paginate={paginate}
          currentPage={currentPage}
        />
        <img
          src={arrowRight}
          alt="icon_arrowRight"
          className={st.next}
          onClick={() =>
            setCurrentPage((prevState) =>
              Math.min(prevState + 1, Math.ceil(goods.length / itemsPerPage))
            )
          }
        />
      </div>
    </div>
  );
};

export default ProductCards;
