import React from 'react';
import { Mock, vi } from 'vitest';
import { fireEvent, screen } from '@testing-library/react';
import { CartItemType } from './index';
import { renderTestApp } from '../../helpers/renderTestApp';

export const mockGoodsItem: CartItemType = {
  count: 1,
  url: 'https://i.ibb.co/RyNz6ZN/AOS-1.png',
  title: 'Средство для мытья посуды Crystal',
  measure_type: 'volume',
  measure_value: 43,
  barcode: 446040490971,
  producer: 'Torp, Sanford and Von',
  brand: 'AOS',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam interdum ut justo, vestibulum sagittis iaculis iaculis. Quis mattis vulputate feugiat massa vestibulum duis. Faucibus consectetur aliquet sed pellentesque consequat consectetur congue mauris venenatis. Nunc elit, dignissim sed nulla ullamcorper enim, malesuada.',
  price: 465.66,
  tags: ['Уход за телом'],
  id: '1',
};

global.window.scrollTo = vi.fn() as Mock;

describe('CartItem', () => {
  test('should display card content', async () => {
    renderTestApp(<></>, {
      initialRoute: '/cart',
      preloadedState: {
        cart: {
          goods: [mockGoodsItem],
          summary: 0,
        },
      },
    });

    const productName = await screen.findByText(/Crystal/);
    expect(productName).toBeInTheDocument();
  });

  test('should increase product count when clicking counter "+"', async () => {
    renderTestApp(<></>, {
      initialRoute: '/cart',
      preloadedState: {
        cart: {
          goods: [mockGoodsItem],
          summary: 0,
        },
      },
    });

    const buttonAdd = await screen.findByRole('buttonAddOne');
    fireEvent.click(buttonAdd);

    expect(screen.getByRole('counterValue').textContent).toEqual('2');
  });
});
