import decideTurn from './ml';

describe('decideTurn', () => {
  test('should return a valid index for an empty board', () => {
    const board = Array(9).fill(null);
    const index = decideTurn(board);
    
    expect(index).toBeGreaterThanOrEqual(0);
    expect(index).toBeLessThan(9);
  });

  test('should not select an occupied space', () => {
    const board = ['X', 'O', 'X', null, null, null, null, null, null];
    const index = decideTurn(board);
    
    // The index should not be 0, 1, or 2 (occupied spaces)
    expect(index).toBeGreaterThan(2);
    expect(index).toBeLessThan(9);
  });

  test('should select from available spaces only', () => {
    const board = ['X', 'O', 'X', 'O', 'X', null, null, null, null];
    const index = decideTurn(board);
    
    // The index should be one of 5, 6, 7, or 8
    expect([5, 6, 7, 8]).toContain(index);
  });

  test('should handle nearly full board', () => {
    const board = ['X', 'O', 'X', 'O', 'X', 'O', 'X', 'O', null];
    const index = decideTurn(board);
    
    // Should select the only remaining space
    expect(index).toBe(8);
  });
});
