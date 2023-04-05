import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import { renderTestApp } from '../../helpers/renderTestApp';
import { mockGoodsItem } from '../CartItem/CartItem.test';

describe('Router', () => {
  test('should navigate through Link component', async () => {
    renderTestApp(<></>, {
      initialRoute: '/',
      preloadedState: {
        goodsList: {
          goods: [mockGoodsItem],
          status: 'idle',
          fetchFailedMessage: '',

          sortedGoods: [mockGoodsItem],
          priceRange: { min: 0, max: 1000 },
          activeTag: '',
          producerTags: [],
        },
      },
    });

    fireEvent.click(screen.getByText(/Администр/));
    expect(screen.getByText(/Добавить товар/)).toBeInTheDocument;

    const buttonAdd = await screen.findByRole('addItemAdmin');
    fireEvent.click(buttonAdd);
    expect(screen.getByText(/Стоимость ед/)).toBeInTheDocument;
  });

  test('should navigate to 404 page if invalid URL', () => {
    renderTestApp(<h2>test</h2>);

    const notImplementedPage = screen.getAllByText('Возврат')[0];
    fireEvent.click(notImplementedPage);

    expect(screen.getByText('Страница не найдена!')).toBeInTheDocument;
  });
});
