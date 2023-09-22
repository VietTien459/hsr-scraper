import { hello } from '../src/main';
 
describe('testing index file', () => {
  test('hello should return 1', () => {
    expect(hello()).toBe(1);
  });
});