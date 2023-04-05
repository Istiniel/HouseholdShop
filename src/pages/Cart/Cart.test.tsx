import React from 'react';
import { Mock, vi } from 'vitest';
import { fireEvent, screen } from '@testing-library/react';
import { renderTestApp } from '../../helpers/renderTestApp';
import { mockGoods } from '../../helpers/mockGoodsTests';
import { CartItemType } from './../../components/CartItem/index';

global.window.scrollTo = vi.fn() as Mock;

describe('Cart', () => {
  test('should show confirmation message after purchase', async () => {
    renderTestApp(<></>, {
      initialRoute: '/cart',
      preloadedState: {
        cart: {
          goods: mockGoods.map((item) => ({ ...item, count: 1 } as CartItemType)),
          summary: 572,
        },
      },
    });

    const purchaseButton = screen.getByRole('purchaseButton');

    fireEvent.click(purchaseButton);

    expect(screen.getByText(/Спасибо за заказ/)).toBeInTheDocument();
  });
});
