import { render, screen } from '@testing-library/react';
import { renderTestRouter } from '../../helpers/renderTestRouter';

const mobileWidth = 320;

function resizeToMobileDevice() {
  window.innerWidth = mobileWidth;
  window.dispatchEvent(new Event('resize'));
}

describe('HeaderOnMobile', () => {
  test('should display burger button on Mobile', () => {
    render(renderTestRouter());
    resizeToMobileDevice();

    const burgerMenuButton = screen.getByRole('burgerMenuButton');

    expect(burgerMenuButton).toBeInTheDocument();
  });
});
