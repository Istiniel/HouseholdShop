import React from 'react';
import { Mock, vi } from 'vitest';
import { screen, render } from '@testing-library/react';

import Pagination from './index';

global.window.scrollTo = vi.fn() as Mock;

describe('Pagination', () => {
  test('should display correct count of pages', () => {
    render(
      <Pagination itemsPerPage={5} totalItems={78} paginate={(page) => null} currentPage={1} />
    );

    expect(screen.getByText(16)).toBeInTheDocument();
  });
});
