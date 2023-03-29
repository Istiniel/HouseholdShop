import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../../redux/hooks';
import SearchBar from '../SearchBar';

import st from './FilterByProducer.module.scss';
import { useAppDispatch } from './../../redux/hooks';
import { filterByProducers } from '../../redux/features/goodsList/goodsSlice';

const FilterByProducer = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [checkedProducers, setCheckedProducers] = useState<(string | null)[]>([]);

  const goods = useAppSelector((state) => state.goodsList.goods);
  const dispatch = useAppDispatch();
  const producers = goods
    .map((item) => item.producer)
    .filter((producer, index, producers) => index === producers.indexOf(producer));

  function itemsByBrandCount(producer: string) {
    const producers = goods.map((item) => item.producer);
    return producers.reduce((acc, prod) => (prod === producer ? (acc += 1) : acc), 0);
  }

  useEffect(() => {
    dispatch(filterByProducers(checkedProducers));
  }, [checkedProducers, setCheckedProducers, dispatch]);

  function toggleProducerCheckbox(e: React.ChangeEvent) {
    const producer = e.target.getAttribute('name');

    if (checkedProducers.includes(producer)) {
      setCheckedProducers((prevState) => {
        return prevState.filter((prod) => prod !== producer);
      });
      return;
    }

    setCheckedProducers((prevState) => {
      return [...prevState, producer];
    });
  }

  function changeSearchValue(e: React.SyntheticEvent) {
    setSearchValue(((e.target as HTMLLIElement)?.value).toString());
  }

  return (
    <div className={st.container}>
      <h3>Производитель</h3>
      <form className={st.form} onSubmit={(e) => e.preventDefault()}>
        <SearchBar callback={changeSearchValue} />
        <div className={st.inputContainer}>
          {producers.map(
            (producer) =>
              producer.includes(searchValue) && (
                <div key={producer}>
                  <input
                    type="checkbox"
                    name={producer}
                    id={producer}
                    onChange={toggleProducerCheckbox}
                  />
                  <label htmlFor={producer}>
                    {producer} <span>{` (${itemsByBrandCount(producer)})`}</span>{' '}
                  </label>
                </div>
              )
          )}
        </div>
      </form>
    </div>
  );
};

export default FilterByProducer;
