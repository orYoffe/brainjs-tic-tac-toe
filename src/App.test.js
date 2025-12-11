import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Game from './App';

// Helper function to calculate winner
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

describe('Game Component', () => {
  test('renders the game board', () => {
    render(<Game />);
    
    // Check for the initial status message
    expect(screen.getByText(/Next player: X/i)).toBeInTheDocument();
  });

  test('displays correct initial status', () => {
    render(<Game />);
    
    expect(screen.getByText('Next player: X')).toBeInTheDocument();
  });

  test('has 9 square buttons', () => {
    const { container } = render(<Game />);
    const buttons = container.querySelectorAll('.square');
    
    expect(buttons).toHaveLength(9);
  });

  test('has "Go to game start" button', () => {
    render(<Game />);
    
    expect(screen.getByText('Go to game start')).toBeInTheDocument();
  });

  test('squares are initially empty', () => {
    const { container } = render(<Game />);
    const buttons = container.querySelectorAll('.square');
    
    buttons.forEach(button => {
      expect(button.textContent).toBe('');
    });
  });
});

describe('calculateWinner helper', () => {
  test('returns null for empty board', () => {
    const squares = Array(9).fill(null);
    expect(calculateWinner(squares)).toBeNull();
  });

  test('detects horizontal win in top row', () => {
    const squares = ['X', 'X', 'X', null, null, null, null, null, null];
    expect(calculateWinner(squares)).toBe('X');
  });

  test('detects horizontal win in middle row', () => {
    const squares = [null, null, null, 'O', 'O', 'O', null, null, null];
    expect(calculateWinner(squares)).toBe('O');
  });

  test('detects horizontal win in bottom row', () => {
    const squares = [null, null, null, null, null, null, 'X', 'X', 'X'];
    expect(calculateWinner(squares)).toBe('X');
  });

  test('detects vertical win in first column', () => {
    const squares = ['O', null, null, 'O', null, null, 'O', null, null];
    expect(calculateWinner(squares)).toBe('O');
  });

  test('detects vertical win in middle column', () => {
    const squares = [null, 'X', null, null, 'X', null, null, 'X', null];
    expect(calculateWinner(squares)).toBe('X');
  });

  test('detects vertical win in last column', () => {
    const squares = [null, null, 'O', null, null, 'O', null, null, 'O'];
    expect(calculateWinner(squares)).toBe('O');
  });

  test('detects diagonal win from top-left to bottom-right', () => {
    const squares = ['X', null, null, null, 'X', null, null, null, 'X'];
    expect(calculateWinner(squares)).toBe('X');
  });

  test('detects diagonal win from top-right to bottom-left', () => {
    const squares = [null, null, 'O', null, 'O', null, 'O', null, null];
    expect(calculateWinner(squares)).toBe('O');
  });

  test('returns null for incomplete game', () => {
    const squares = ['X', 'O', 'X', null, 'X', null, 'O', null, null];
    expect(calculateWinner(squares)).toBeNull();
  });

  test('returns null for tie game', () => {
    const squares = ['X', 'O', 'X', 'X', 'O', 'O', 'O', 'X', 'X'];
    expect(calculateWinner(squares)).toBeNull();
  });
});
