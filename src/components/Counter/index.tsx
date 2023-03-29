import React from 'react';
import st from './Counter.module.scss';

type CounterProps = {
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
  increaseCount?: () => void;
  decreaseCount?: () => void;
};

const Counter: React.FC<CounterProps> = ({ count, setCount, increaseCount, decreaseCount }) => {
  return (
    <div className={st.container}>
      <button
        className={st.decrease}
        onClick={() => {
          setCount((prevState) => Math.max((prevState -= 1), 1));
          decreaseCount && decreaseCount();
        }}
      >
        -
      </button>
      <h3 className={st.count}>{count}</h3>
      <button
        className={st.increase}
        onClick={() => {
          setCount((prevState) => (prevState += 1));
          increaseCount && increaseCount();
        }}
      >
        +
      </button>
    </div>
  );
};

export default Counter;
