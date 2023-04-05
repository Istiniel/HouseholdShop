import React from 'react';
import { Mock, vi } from 'vitest';
import { fireEvent, screen } from '@testing-library/react';
import { renderTestApp } from '../../helpers/renderTestApp';
import { mockGoods } from '../../helpers/mockGoodsTests';

global.window.scrollTo = vi.fn() as Mock;
global.fetch = vi.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(mockGoods),
  })
) as Mock;

describe('MainPage', () => {
  test('should display goods cards on mount', async () => {
    renderTestApp(<></>, {
      initialRoute: '/products',
    });

    const productCard = await screen.findByText(/446040490971/);

    expect(productCard).toBeInTheDocument();
  });

  test('should show count of product in cart', async () => {
    renderTestApp(<></>, {
      initialRoute: '/products',
    });

    const buttonToCart = (await screen.findAllByRole('buttonToCart'))[0];
    fireEvent.click(buttonToCart);

    expect(screen.getByText(/в корзине:/)).toBeInTheDocument();
  });
});
