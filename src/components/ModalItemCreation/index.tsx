import React, { useEffect, useRef, useState } from 'react';
import useRemoveDisplayShift from '../../hooks/useRemoveDisplayShift';
import Button from '../Button';
import st from './ModalItemCreation.module.scss';
import DropDownTagsSelect from './../DropDownTagsSelect/index';
import { PRODUCT_TAGS } from './../../constants/constants';
import { useAppDispatch } from './../../redux/hooks';
import { addItem } from '../../redux/features/goodsList/goodsSlice';
import { GoodsType } from '../../API/API';
import { checkURL } from '../../helpers/checkIsUrlToImg';
import randomNumber from './../../helpers/randomNumber';

type ModalItemCreationProps = {
  closeModal: () => void;
  clearForm: () => void;
  originProduct?: GoodsType;
};

const ModalItemCreation: React.FC<ModalItemCreationProps> = ({
  closeModal,
  clearForm,
  originProduct,
}) => {
  const [tags, setTags] = useState<string[]>([]);

  const dispatch = useAppDispatch();

  const image = useRef<HTMLInputElement | null>(null);
  const title = useRef<HTMLInputElement | null>(null);
  const weight = useRef<HTMLInputElement | null>(null);
  const volume = useRef<HTMLInputElement | null>(null);
  const measure_value = useRef<HTMLInputElement | null>(null);
  const barcode = useRef<HTMLInputElement | null>(null);
  const producer = useRef<HTMLInputElement | null>(null);
  const brand = useRef<HTMLInputElement | null>(null);
  const description = useRef<HTMLTextAreaElement | null>(null);
  const price = useRef<HTMLInputElement | null>(null);

  function submit(e: React.SyntheticEvent) {
    const imgURL = checkURL(image.current!.value)
      ? image.current!.value
      : 'https://i.ibb.co/Gdb7D4F/no-image.jpg';

    const newProduct: GoodsType = {
      url: imgURL,
      title: title.current!.value,
      measure_type: (weight.current?.checked ? 'volume' : 'weight') as 'volume' | 'weight',
      measure_value: +measure_value.current!.value,
      barcode: +barcode.current!.value,
      producer: producer.current!.value,
      brand: brand.current!.value,
      description: description.current!.value,
      price: +price.current!.value,
      tags: tags as (typeof PRODUCT_TAGS)[number][],
      id: originProduct ? originProduct.id : randomNumber(100, 5123),
    };

    dispatch(addItem(newProduct));
    closeModal();
    e.preventDefault();
  }

  useEffect(() => {
    if (originProduct) {
      setTags(originProduct.tags);
    }

    return () => {
      clearForm();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useRemoveDisplayShift();

  return (
    <div className={st.container} onMouseDown={closeModal}>
      <form className={st.form} onMouseDown={(e) => e.stopPropagation()} onSubmit={submit}>
        <div className={st.inputContainer}>
          <label htmlFor="thumb">Ссылка на изображение</label>
          <input
            ref={image}
            type="text"
            className={st.input}
            name="thumb"
            defaultValue={originProduct && originProduct.url}
          />
        </div>
        <div className={st.inputContainer}>
          <label htmlFor="title">Наименование</label>
          <input
            ref={title}
            type="text"
            className={st.input}
            name="title"
            required
            defaultValue={originProduct && originProduct.title}
          />
        </div>
        <fieldset className={st.radioContainer}>
          <div className={st.inputContainer}>
            <label htmlFor="weight">Вес</label>
            <input
              ref={weight}
              value={'test'}
              className={st.input}
              id="weight"
              name="measure_type"
              type="radio"
              defaultChecked={originProduct && originProduct.measure_type === 'weight'}
            />
          </div>
          <div className={st.inputContainer}>
            <label htmlFor="volume">Объем</label>
            <input
              ref={volume}
              value={'test'}
              className={st.input}
              id="volume"
              name="measure_type"
              type="radio"
              defaultChecked={originProduct && originProduct.measure_type === 'volume'}
            />
          </div>
        </fieldset>
        <div className={st.inputContainer}>
          <label htmlFor="measure_value">Вес/объем единицы товара</label>
          <input
            ref={measure_value}
            type="number"
            className={st.input}
            name="measure_value"
            required
            defaultValue={originProduct && +originProduct.measure_value}
          />
        </div>
        <div className={st.inputContainer}>
          <label htmlFor="barcode">Штрихкод</label>
          <input
            ref={barcode}
            type="number"
            className={st.input}
            name="barcode"
            required
            defaultValue={originProduct && +originProduct.barcode}
          />
        </div>
        <div className={st.inputContainer}>
          <label htmlFor="producer">Производитель</label>
          <input
            ref={producer}
            type="text"
            className={st.input}
            name="producer"
            required
            defaultValue={originProduct && originProduct.producer}
          />
        </div>
        <div className={st.inputContainer}>
          <label htmlFor="brand">Бренд</label>
          <input
            ref={brand}
            type="text"
            className={st.input}
            name="brand"
            required
            defaultValue={originProduct && originProduct.brand}
          />
        </div>
        <div className={st.inputContainer}>
          <label htmlFor="description">Описание</label>
          <textarea
            ref={description}
            className={st.input}
            name="description"
            required
            defaultValue={originProduct && originProduct.description}
          />
        </div>
        <div className={st.inputContainer}>
          <label htmlFor="price">Стоимость ед.</label>
          <input
            ref={price}
            type="number"
            className={st.input}
            name="price"
            required
            defaultValue={originProduct && +originProduct.price}
          />
        </div>
        <div className={st.tagsContainer}>
          {tags.map((tag) => (
            <p
              key={tag}
              className={st.tag}
              onClick={() => setTags((prevState) => prevState.filter((e) => e !== tag))}
            >
              {tag}
            </p>
          ))}
        </div>
        <DropDownTagsSelect
          type="click"
          options={PRODUCT_TAGS}
          callback={(tag: string) => {
            !tags.includes(tag) && setTags((prevState) => [...prevState, tag]);
          }}
        />
        <div className={st.buttons}>
          <Button padding="1.5rem 4rem" color="orange" type="submit">
            Создать
          </Button>
          <Button padding="1.5rem 4rem" color="orange" callback={closeModal}>
            Отменить
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ModalItemCreation;
