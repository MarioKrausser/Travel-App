// Import the js file to test
import { keys } from "../src/server/serverKeys"

// The describe() function takes two arguments - a string description, and a test suite as a callback function.
// A test suite may contain one or more related tests
describe("Testing the keys functionality", () => {

  test('checking if the weather bit key is included', () => {
    expect(keys('WEATHERBIT_API_KEY')).not.toBe('');
  });

});