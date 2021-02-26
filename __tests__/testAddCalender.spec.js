// Import the js file to test
import { addCalender } from "../src/client/js/calender"

// The describe() function takes two arguments - a string description, and a test suite as a callback function.
// A test suite may contain one or more related tests
describe("Testing the addCalender functionality", () => {

  test("Testing the addCalender() function", () => {

    expect( addCalender ).toBeDefined();
  })});