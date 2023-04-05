import React from 'react';
import { screen, render, fireEvent } from '@testing-library/react';
import DropDownTagsSelect from './index';

describe('DropDownTagsSelect', () => {
  test('should show tags to choose from', async () => {
    render(
      <DropDownTagsSelect
        type="click"
        options={['test1', 'test2', 'test3']}
        callback={() => null}
      />
    );

    const dropDownHeader = screen.getByRole('dropDownHeader');
    fireEvent.click(dropDownHeader);

    expect(screen.getByText('test3')).toBeInTheDocument();
  });
});
