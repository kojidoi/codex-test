import { isBallCollidingWithBrick } from '../main.js';

describe('isBallCollidingWithBrick', () => {
  test('detects collision when ball is inside brick', () => {
    const ball = { x: 50, y: 50 };
    const brick = { x: 40, y: 40 };
    expect(isBallCollidingWithBrick(ball, brick)).toBe(true);
  });

  test('detects no collision when ball is outside brick', () => {
    const ball = { x: 10, y: 10 };
    const brick = { x: 40, y: 40 };
    expect(isBallCollidingWithBrick(ball, brick)).toBe(false);
  });
});
