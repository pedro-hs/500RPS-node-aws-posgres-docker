import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { ChartTooltip } from './ChartTooltip';

describe('ChartTooltip', () => {
  it('renders nothing when inactive', () => {
    const html = renderToStaticMarkup(
      <ChartTooltip active={false} payload={[]} total={100} />,
    );

    expect(html).toBe('');
  });

  it('renders label, total, and percent', () => {
    const html = renderToStaticMarkup(
      <ChartTooltip
        active
        payload={[{ payload: { label: 'BR', total: 25 } }] as never}
        total={100}
      />,
    );

    expect(html).toContain('BR');
    expect(html).toContain('25 (25.0%)');
  });

  it('renders 0% when total is zero', () => {
    const html = renderToStaticMarkup(
      <ChartTooltip
        active
        payload={[{ payload: { label: 'BR', total: 0 } }] as never}
        total={0}
      />,
    );

    expect(html).toContain('0 (0%)');
  });
});
