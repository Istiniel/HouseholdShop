import React, { useEffect, useState } from 'react';
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
import { SubmitHandler, useForm } from 'react-hook-form';

type ModalItemCreationProps = {
  closeModal: () => void;
  clearForm: () => void;
  originProduct?: GoodsType;
};

type FormValues = {
  image: string;
  title: string;
  measure_type: 'volume' | 'weight';
  measure_value: string;
  barcode: number;
  producer: string;
  brand: string;
  description: string;
  price: number;
};

const ModalItemCreation: React.FC<ModalItemCreationProps> = ({
  closeModal,
  clearForm,
  originProduct,
}) => {
  const [tags, setTags] = useState<string[]>([]);

  const dispatch = useAppDispatch();

  const {
    register,
    formState: { errors },
    handleSubmit,
    clearErrors,
    reset,
  } = useForm<FormValues>({ mode: 'onSubmit', reValidateMode: 'onSubmit' });

  useEffect(() => {
    if (originProduct) {
      setTags(originProduct.tags);
    }
    return () => {
      clearForm();
      clearErrors();
      reset();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const imgURL = checkURL(data.image) ? data.image : 'https://i.ibb.co/Gdb7D4F/no-image.jpg';

    const newProduct: GoodsType = {
      url: imgURL,
      title: data.title,
      measure_type: (data.measure_type ? 'volume' : 'weight') as 'volume' | 'weight',
      measure_value: +data.measure_value,
      barcode: +data.barcode,
      producer: data.producer,
      brand: data.brand,
      description: data.description,
      price: +data.price,
      tags: tags.map((tag) => tag.replace('\n', '')) as (typeof PRODUCT_TAGS)[number][],
      id: originProduct ? originProduct.id : randomNumber(100, 5123),
    };

    dispatch(addItem(newProduct));
    clearForm();
    reset();
    closeModal();
  };

  useRemoveDisplayShift();

  return (
    <div className={st.container} onMouseDown={closeModal}>
      <form
        className={st.form}
        onMouseDown={(e) => e.stopPropagation()}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className={st.inputContainer}>
          <label htmlFor="thumb">Ссылка на изображение</label>
          <input
            type="text"
            className={st.input}
            defaultValue={originProduct ? originProduct.url : ''}
            {...register('image')}
          />
        </div>
        <div className={st.inputContainer}>
          <label htmlFor="title">Наименование</label>
          <input
            type="text"
            className={`${st.input} ${errors.title ? st.invalid : ''}`}
            defaultValue={originProduct && originProduct.title}
            {...register('title', {
              required: 'Введите наименование',
            })}
          />
          <p className={st.error}>{errors.title?.message}</p>
        </div>
        <fieldset className={st.radioContainer}>
          <div className={st.inputContainer}>
            <label htmlFor="weight">Вес</label>
            <input
              value={'test'}
              className={st.input}
              id="weight"
              type="radio"
              defaultChecked={originProduct && originProduct.measure_type === 'weight'}
              {...register('measure_type', {
                required: 'Выберите тип',
              })}
            />
            <p className={st.error}>{errors.measure_type?.message}</p>
          </div>
          <div className={st.inputContainer}>
            <label htmlFor="volume">Объем</label>
            <input
              value={'test'}
              className={st.input}
              id="volume"
              type="radio"
              defaultChecked={originProduct && originProduct.measure_type === 'volume'}
              {...register('measure_type')}
            />
          </div>
        </fieldset>
        <div className={st.inputContainer}>
          <label htmlFor="measure_value">Вес/объем единицы товара</label>
          <input
            type="number"
            className={`${st.input} ${errors.measure_value ? st.invalid : ''}`}
            defaultValue={originProduct && +originProduct.measure_value}
            {...register('measure_value', {
              required: 'Введите количество',
            })}
          />
          <p className={st.error}>{errors.measure_value?.message}</p>
        </div>
        <div className={st.inputContainer}>
          <label htmlFor="barcode">Штрихкод</label>
          <input
            type="number"
            className={`${st.input} ${errors.barcode ? st.invalid : ''}`}
            defaultValue={originProduct && +originProduct.barcode}
            {...register('barcode', {
              required: 'Введите штрихкод',
            })}
          />
          <p className={st.error}>{errors.barcode?.message}</p>
        </div>
        <div className={st.inputContainer}>
          <label htmlFor="producer">Производитель</label>
          <input
            type="text"
            className={`${st.input} ${errors.producer ? st.invalid : ''}`}
            defaultValue={originProduct && originProduct.producer}
            {...register('producer', {
              required: 'Введите производителя продукта',
            })}
          />
          <p className={st.error}>{errors.producer?.message}</p>
        </div>
        <div className={st.inputContainer}>
          <label htmlFor="brand">Бренд</label>
          <input
            type="text"
            className={`${st.input} ${errors.brand ? st.invalid : ''}`}
            defaultValue={originProduct && originProduct.brand}
            {...register('brand', {
              required: 'Введите название бренда',
            })}
          />
          <p className={st.error}>{errors.brand?.message}</p>
        </div>
        <div className={st.inputContainer}>
          <label htmlFor="description">Описание</label>
          <textarea
            className={`${st.input} ${errors.description ? st.invalid : ''}`}
            defaultValue={originProduct && originProduct.description}
            {...register('description', {
              required: 'Введите описание товара',
            })}
          />
          <p className={st.error}>{errors.description?.message}</p>
        </div>
        <div className={st.inputContainer}>
          <label htmlFor="price">Стоимость ед.</label>
          <input
            type="number"
            className={`${st.input} ${errors.price ? st.invalid : ''}`}
            defaultValue={originProduct && +originProduct.price}
            {...register('price', {
              required: 'Введите стоимость',
            })}
          />
          <p className={st.error}>{errors.price?.message}</p>
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
