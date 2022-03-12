import { helloWorld } from './app';

test('should return "Hello world!"', () => {
    expect(helloWorld()).toBe('Hello world!');
});