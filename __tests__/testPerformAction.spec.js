// Import the js file to test
import { performAction } from "../src/client/js/app"

// The describe() function takes two arguments - a string description, and a test suite as a callback function.
// A test suite may contain one or more related tests
describe("Testing the submit functionality", () => {

  test("Testing the performAction() function", () => {

    expect(performAction).toBeDefined();
  })});