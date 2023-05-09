import { newE2EPage } from '@stencil/core/testing';

describe('wc-graph', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<wc-graph></wc-graph>');

    const element = await page.find('wc-graph');
    expect(element).toHaveClass('hydrated');
  });
});
