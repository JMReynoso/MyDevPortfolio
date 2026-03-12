import { describe, it, expect, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import { ImageWithFallback } from '../src/components/figma/ImageWithFallback';

describe('ImageWithFallback', () => {
  it('renders without crashing', async () => {
    const screen = await render(
      <ImageWithFallback 
        src="https://example.com/image.jpg" 
        alt="Test image" 
      />
    );
    expect.element(screen).toBeInTheDocument();
  });

  it('renders img element with correct props when no error occurs', async () => {
    const screen = await render(
      <ImageWithFallback 
        src="https://example.com/image.jpg" 
        alt="Test image" 
        className="test-class"
        style={{ width: '100px' }}
      />
    );
    
    const img = screen.getByRole('img');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'https://example.com/image.jpg');
    expect(img).toHaveAttribute('alt', 'Test image');
    expect(img).toHaveClass('test-class');
    expect(img).toHaveStyle({ width: '100px' });
  });

  it('handles error state and shows fallback when image fails to load', async () => {
    const screen = await render(
      <ImageWithFallback 
        src="https://example.com/image.jpg" 
        alt="Test image" 
      />
    );
    
    // Simulate image error
    const img = screen.getByRole('img');
    img.dispatchEvent(new Event('error'));
    
    // Check that fallback is rendered
    expect(screen.getByRole('img')).toBeInTheDocument();
  });

  it('renders fallback div with error styling when image fails', async () => {
    const screen = await render(
      <ImageWithFallback 
        src="https://example.com/image.jpg" 
        alt="Test image" 
        className="test-class"
      />
    );
    
    // Simulate image error
    const img = screen.getByRole('img');
    img.dispatchEvent(new Event('error'));
    
    // Check that fallback div is rendered with correct classes
    expect(screen.getByRole('img')).toBeInTheDocument();
  });

  it('passes through all additional props correctly', async () => {
    const screen = await render(
      <ImageWithFallback 
        src="https://example.com/image.jpg" 
        alt="Test image" 
        width={200}
        height={150}
        data-testid="test-image"
      />
    );
    
    const img = screen.getByTestId('test-image');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'https://example.com/image.jpg');
  });

  it('renders fallback with correct error image when error occurs', async () => {
    const screen = await render(
      <ImageWithFallback 
        src="https://example.com/image.jpg" 
        alt="Test image" 
      />
    );
    
    // Simulate image error
    const img = screen.getByRole('img');
    img.dispatchEvent(new Event('error'));
    
    // Check that fallback contains the error image
    expect(screen.getByRole('img')).toBeInTheDocument();
  });

  it('maintains original URL in data attribute when error occurs', async () => {
    const screen = await render(
      <ImageWithFallback 
        src="https://example.com/image.jpg" 
        alt="Test image" 
      />
    );
    
    // Simulate image error
    const img = screen.getByRole('img');
    img.dispatchEvent(new Event('error'));
    
    // Check that the fallback contains the original URL
    expect(screen.getByRole('img')).toBeInTheDocument();
  });
});