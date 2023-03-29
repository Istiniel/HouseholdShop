import React, { useState } from 'react';
import st from './SearchBar.module.scss';

type SearchBarProps = {
  placeholder?: string;
  backgroundImage?: string;
  type?: string;
  callback?: (e: React.SyntheticEvent) => void;
};

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder,
  backgroundImage,
  type = 'search',
  callback,
}) => {
  const [searchValue, setSearchValue] = useState<string>('');
  const styles = backgroundImage ? { backgroundImage: `url(${backgroundImage})` } : {};

  return (
    <div className={st['search-form']}>
      <input
        className={st['search-input']}
        placeholder={placeholder ? placeholder : 'Поиск...'}
        type={type}
        value={searchValue}
        onChange={(e) => {
          setSearchValue(e.target?.value);
          callback && callback(e);
        }}
      />
      <button type="submit" className={st['submit-button']} style={styles}></button>
    </div>
  );
};

export default SearchBar;
