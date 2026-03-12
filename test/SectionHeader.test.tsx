import { describe, it, expect } from 'vitest';
import { render } from 'vitest-browser-react';
import { SectionHeader } from '../src/components/layout/SectionHeader';

describe('SectionHeader', () => {
  it('renders without crashing', async () => {
    const screen = await render(
      <SectionHeader title="Test Title" />
    );
    
    expect.element(screen).toBeInTheDocument();
  });

  it('renders title correctly', async () => {
    const screen = await render(
      <SectionHeader title="Test Title" />
    );
    
    expect.element(screen).toHaveText('Test Title');
  });

  it('renders subtitle when provided', async () => {
    const screen = await render(
      <SectionHeader 
        title="Test Title" 
        subtitle="Test Subtitle" 
      />
    );
    
    expect.element(screen).toHaveText('Test Subtitle');
  });

  it('applies default left alignment', async () => {
    const screen = await render(
      <SectionHeader title="Test Title" />
    );
    
    expect.element(screen).toHaveClass('text-left');
    expect.element(screen).toHaveClass('items-start');
  });

  it('applies center alignment when specified', async () => {
    const screen = await render(
      <SectionHeader 
        title="Test Title" 
        align="center" 
      />
    );
    
    expect.element(screen).toHaveClass('text-center');
    expect.element(screen).toHaveClass('items-center');
  });

  it('renders divider with correct styling', async () => {
    const screen = await render(
      <SectionHeader title="Test Title" />
    );
    
    expect.element(screen).toHaveClass('w-20');
    expect.element(screen).toHaveClass('h-1');
    expect.element(screen).toHaveClass('bg-gradient-to-r');
  });

  it('applies custom className', async () => {
    const screen = await render(
      <SectionHeader 
        title="Test Title" 
        className="custom-header-class" 
      />
    );
    
    expect.element(screen).toHaveClass('custom-header-class');
  });

  it('renders with only title and no subtitle', async () => {
    const screen = await render(
      <SectionHeader title="Test Title" />
    );
    
    expect.element(screen).toHaveText('Test Title');
    // Should not have subtitle text
    expect.element(screen).not.toHaveText('');
  });

  it('renders with empty subtitle', async () => {
    const screen = await render(
      <SectionHeader 
        title="Test Title" 
        subtitle={null as any} 
      />
    );
    
    expect.element(screen).toHaveText('Test Title');
  });

  it('applies correct divider alignment for center alignment', async () => {
    const screen = await render(
      <SectionHeader 
        title="Test Title" 
        align="center" 
      />
    );
    
    expect.element(screen).toHaveClass('mx-auto');
  });

  it('applies correct divider alignment for left alignment', async () => {
    const screen = await render(
      <SectionHeader 
        title="Test Title" 
        align="left" 
      />
    );
    
    expect.element(screen).not.toHaveClass('mx-auto');
  });
});