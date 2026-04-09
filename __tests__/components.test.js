import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import MoodSelector from '../src/components/MoodSelector';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
  useRouter: () => ({ push: jest.fn(), replace: jest.fn() }),
}));

describe('MoodSelector Component', () => {
  test('renders all 5 mood options', () => {
    render(<MoodSelector name="mood" />);
    expect(screen.getByLabelText('Great')).toBeInTheDocument();
    expect(screen.getByLabelText('Good')).toBeInTheDocument();
    expect(screen.getByLabelText('Okay')).toBeInTheDocument();
    expect(screen.getByLabelText('Bad')).toBeInTheDocument();
    expect(screen.getByLabelText('Terrible')).toBeInTheDocument();
  });

  test('renders mood emojis', () => {
    render(<MoodSelector name="mood" />);
    expect(screen.getByText('😊')).toBeInTheDocument();
    expect(screen.getByText('🙂')).toBeInTheDocument();
    expect(screen.getByText('😐')).toBeInTheDocument();
    expect(screen.getByText('😟')).toBeInTheDocument();
    expect(screen.getByText('😢')).toBeInTheDocument();
  });

  test('selects mood on click', () => {
    render(<MoodSelector name="mood" />);
    const greatOption = screen.getByLabelText('Great');
    fireEvent.click(greatOption);
    expect(greatOption).toHaveAttribute('aria-checked', 'true');
  });

  test('renders with pre-selected mood', () => {
    render(<MoodSelector name="mood" selected="good" />);
    const goodOption = screen.getByLabelText('Good');
    expect(goodOption).toHaveAttribute('aria-checked', 'true');
  });

  test('has 5 radio inputs with correct name', () => {
    const { container } = render(<MoodSelector name="test-mood" />);
    const radios = container.querySelectorAll('input[name="test-mood"]');
    expect(radios).toHaveLength(5);
  });
});
