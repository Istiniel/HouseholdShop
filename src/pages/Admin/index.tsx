import React, { useState } from 'react';
import { useAppSelector } from '../../redux/hooks';
import { deleteItem, selectFilteredState } from './../../redux/features/goodsList/goodsSlice';
import { useAppDispatch } from './../../redux/hooks';

import st from './Admin.module.scss';
import iconDelete from '../../assets/icons/icon_remove.svg';
import iconChange from '../../assets/icons/icon_change.svg';
import iconAdd from '../../assets/icons/icon_add.svg';
import useSaveGoodsInLocalStorage from '../../hooks/useSaveGoodsInLocalStorage';
import ModalItemCreation from './../../components/ModalItemCreation/index';
import { GoodsType } from '../../API/API';

const Admin = () => {
  const [isModalActive, setIsModalActive] = useState(false);
  const [editableProduct, setEditableProduct] = useState<GoodsType | undefined>(undefined);

  const dispatch = useAppDispatch();

  useSaveGoodsInLocalStorage();
  const goods = useAppSelector(selectFilteredState);

  return (
    <div className={st.admin}>
      <div className={'wrapper'}>
        <div className={st.container}>
          {goods.map((item) => (
            <div className={st.item} key={item.id}>
              <h3 className={st.itemDescription}>
                <span>{item.barcode}</span>
                {`\n${item.brand} ${item.title}`}
              </h3>
              <div className={st.buttonsContainer}>
                <button
                  className={st.changeButton}
                  onClick={() => {
                    setEditableProduct(item);
                    setIsModalActive(true);
                  }}
                >
                  <img src={iconChange} alt="icon_change" className={st.icon} />
                </button>
                <button className={st.removeButton} onClick={() => dispatch(deleteItem(item.id))}>
                  <img src={iconDelete} alt="icon_delete" className={st.icon} />
                </button>
              </div>
            </div>
          ))}
          <div className={st.item}>
            <h3 className={st.itemDescription}>
              <span>Добавить товар</span>
            </h3>
            <div className={st.buttonsContainer}>
              <button className={st.createButton} onClick={() => setIsModalActive(true)}>
                <img src={iconAdd} alt="icon_delete" className={st.icon} />
              </button>
            </div>
          </div>
          {isModalActive && (
            <ModalItemCreation
              closeModal={() => setIsModalActive(false)}
              clearForm={() => setEditableProduct(undefined)}
              originProduct={editableProduct}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
