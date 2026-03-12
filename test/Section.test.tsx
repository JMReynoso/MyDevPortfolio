import { describe, it, expect, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import { Section } from '../src/components/layout/Section';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    section: ({ children }: any) => children,
  },
}));

describe('Section', () => {
  it('renders without crashing', async () => {
    const screen = await render(
      <Section>
        <div>Test Content</div>
      </Section>
    );
    
    expect.element(screen).toBeInTheDocument();
  });

  it('renders children correctly', async () => {
    const screen = await render(
      <Section>
        <div data-testid="child-element">Test Content</div>
      </Section>
    );
    
    expect.element(screen).toHaveText('Test Content');
  });

  it('applies default background and padding classes', async () => {
    const screen = await render(
      <Section>
        <div>Content</div>
      </Section>
    );
    
    expect.element(screen).toHaveClass('bg-gradient-to-b');
    expect.element(screen).toHaveClass('from-white');
    expect.element(screen).toHaveClass('via-[#F5E6D3]');
    expect.element(screen).toHaveClass('to-white');
    expect.element(screen).toHaveClass('py-20');
    expect.element(screen).toHaveClass('px-6');
  });

  it('applies custom background', async () => {
    const screen = await render(
      <Section background="white">
        <div>Content</div>
      </Section>
    );
    
    expect.element(screen).toHaveClass('bg-white');
  });

  it('applies custom padding', async () => {
    const screen = await render(
      <Section padding="sm">
        <div>Content</div>
      </Section>
    );
    
    expect.element(screen).toHaveClass('py-12');
    expect.element(screen).toHaveClass('px-6');
  });

  it('applies custom className', async () => {
    const screen = await render(
      <Section className="custom-section-class">
        <div>Content</div>
      </Section>
    );
    
    expect.element(screen).toHaveClass('custom-section-class');
  });

  it('applies custom id', async () => {
    const screen = await render(
      <Section id="test-section">
        <div>Content</div>
      </Section>
    );
    
    expect.element(screen).toHaveAttribute('id', 'test-section');
  });

  it('renders with dark background', async () => {
    const screen = await render(
      <Section background="dark">
        <div>Content</div>
      </Section>
    );
    
    expect.element(screen).toHaveClass('bg-[#2C2416]');
  });

  it('renders with custom animation behavior', async () => {
    const screen = await render(
      <Section animate={false}>
        <div>Content</div>
      </Section>
    );
    
    expect.element(screen).toBeInTheDocument();
  });

  it('wraps content in max-width container', async () => {
    const screen = await render(
      <Section>
        <div>Content</div>
      </Section>
    );
    
    expect.element(screen).toHaveClass('max-w-6xl');
  });
});