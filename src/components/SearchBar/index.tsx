import React, { useState } from 'react';
import st from './SearchBar.module.scss';

type SearchBarProps = {
  placeholder?: string;
  backgroundImage?: string;
  type?: string;
};

const SearchBar: React.FC<SearchBarProps> = ({ placeholder, backgroundImage, type = 'search' }) => {
  const [searchValue, setSearchValue] = useState<string>('');
  const styles = backgroundImage ? { backgroundImage: `url(${backgroundImage})` } : {};

  return (
    <form className={st['search-form']}>
      <input
        className={st['search-input']}
        placeholder={placeholder ? placeholder : 'Поиск...'}
        type={type}
        value={searchValue}
        onChange={(e) => {
          setSearchValue(e.target?.value);
        }}
      />
      <button type="submit" className={st['submit-button']} style={styles}></button>
    </form>
  );
};

export default SearchBar;
