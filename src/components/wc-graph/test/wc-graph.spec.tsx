import { newSpecPage } from '@stencil/core/testing';
import { WcGraph } from '../wc-graph';

describe('wc-graph', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [WcGraph],
      html: `<wc-graph></wc-graph>`,
    });
    expect(page.root).toEqualHtml(`
      <wc-graph>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </wc-graph>
    `);
  });
});
