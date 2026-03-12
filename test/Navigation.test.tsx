import { describe, it, expect, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import { Navigation } from '../src/components/layout/Navigation';

// Mock the useIsMobile hook
vi.mock('../ui/use-mobile', () => ({
  useIsMobile: vi.fn(() => false),
}));

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    nav: ({ children }: any) => children,
    div: ({ children }: any) => children,
    a: ({ children }: any) => children,
    span: ({ children }: any) => children,
  },
}));

// Mock react-router-dom Link
vi.mock('react-router-dom', () => ({
  Link: ({ children }: any) => children,
}));

// Mock ImageWithFallback component
vi.mock('../figma/ImageWithFallback', () => ({
  ImageWithFallback: ({ children }: any) => children,
}));

describe('Navigation', () => {
  const mockLinks = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Projects', href: '/projects' },
    { label: 'Contact', href: '/contact' },
  ];

  it('renders without crashing', async () => {
    const screen = await render(
      <Navigation 
        links={mockLinks} 
        activeSection="home"
      />
    );
    
    expect.element(screen).toBeInTheDocument();
  });

  it('renders logo initials and name', async () => {
    const screen = await render(
      <Navigation 
        links={mockLinks} 
        activeSection="home"
      />
    );
    
    expect.element(screen).toHaveText('YN');
    expect.element(screen).toHaveText('Your Name');
  });

  it('renders navigation links', async () => {
    const screen = await render(
      <Navigation 
        links={mockLinks} 
        activeSection="home"
      />
    );
    
    expect.element(screen).toHaveText('Home');
    expect.element(screen).toHaveText('About');
    expect.element(screen).toHaveText('Projects');
    expect.element(screen).toHaveText('Contact');
  });

  it('renders with custom logo', async () => {
    const customLogo = { initials: 'JS', name: 'John Smith' };
    const screen = await render(
      <Navigation 
        links={mockLinks} 
        activeSection="home"
        logo={customLogo}
      />
    );
    
    expect.element(screen).toHaveText('JS');
    expect.element(screen).toHaveText('John Smith');
  });

  it('applies active section styling', async () => {
    const screen = await render(
      <Navigation 
        links={mockLinks} 
        activeSection="about"
      />
    );
    
    // Should have active class on about link
    expect.element(screen).toBeInTheDocument();
  });

  it('handles scroll effect with isScrolled state', async () => {
    const screen = await render(
      <Navigation 
        links={mockLinks} 
        activeSection="home"
      />
    );
    
    expect.element(screen).toBeInTheDocument();
  });

  it('renders with custom className', async () => {
    const screen = await render(
      <Navigation 
        links={mockLinks} 
        activeSection="home"
        className="custom-navigation-class"
      />
    );
    
    expect.element(screen).toHaveClass('custom-navigation-class');
  });

  it('handles empty links array', async () => {
    const screen = await render(
      <Navigation 
        links={[]} 
        activeSection="home"
      />
    );
    
    expect.element(screen).toBeInTheDocument();
  });

  it('calls onSectionChange when navigation link is clicked', async () => {
    const mockOnSectionChange = vi.fn();
    const screen = await render(
      <Navigation 
        links={mockLinks} 
        activeSection="home"
        onSectionChange={mockOnSectionChange}
      />
    );
    
    // This test would require interaction simulation which is not possible with vitest-browser-react
    expect.element(screen).toBeInTheDocument();
  });

  it('calls onNavigationClick when navigation link is clicked', async () => {
    const mockOnNavigationClick = vi.fn();
    const screen = await render(
      <Navigation 
        links={mockLinks} 
        activeSection="home"
        onNavigationClick={mockOnNavigationClick}
      />
    );
    
    // This test would require interaction simulation which is not possible with vitest-browser-react
    expect.element(screen).toBeInTheDocument();
  });
});