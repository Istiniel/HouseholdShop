import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import SearchBar from '.';

describe('SearchBar', () => {
  test('should display query string', async () => {
    render(<SearchBar />);

    const SearchInput = screen.getByPlaceholderText<HTMLInputElement>('Поиск...');

    fireEvent.change(SearchInput, { target: { value: 'продукты123' } });

    expect(SearchInput.value).toBe('продукты123');
  });
});
