import React from 'react';
import { Mock, vi } from 'vitest';
import { fireEvent, screen } from '@testing-library/react';
import { renderTestApp } from '../../helpers/renderTestApp';
import { mockGoods } from '../../helpers/mockGoodsTests';

global.window.scrollTo = vi.fn() as Mock;

describe('Cart', () => {
  test('should show confirmation message after purchase', async () => {
    renderTestApp(<></>, {
      initialRoute: '/products',
      preloadedState: {
        goodsList: {
          goods: mockGoods,
          status: 'idle',
          fetchFailedMessage: '',

          sortedGoods: mockGoods,
          priceRange: { min: 0, max: 1000 },
          activeTag: '',
          producerTags: [],
        },
        cart: {
          goods: [],
          summary: 0,
        },
      },
      windowWidth: 1600,
    });

    const buttonToCart = screen.getAllByRole('buttonToCart')[1];
    expect(screen.getByText('0₸')).toBeInTheDocument();

    fireEvent.click(buttonToCart);
    fireEvent.click(buttonToCart);

    expect(screen.getByText('556.92₸')).toBeInTheDocument();
  });
});
