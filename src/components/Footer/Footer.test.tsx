import React from 'react';
import { screen } from '@testing-library/react';
import { renderTestApp } from '../../helpers/renderTestApp';

describe('Footer', () => {
  test('should show information correctly', async () => {
    renderTestApp(<></>);

    expect(screen.getByText('Товары для детей и мам')).toBeInTheDocument();
  });
});
