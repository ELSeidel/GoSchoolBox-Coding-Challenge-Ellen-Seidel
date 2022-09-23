### Features
- Ability to add, subtract, multiple, divide, and complete exponentiation
- Can handle expressions with mutliple operations
- Follows rules of PEMDAS when calculating expressions with more than 1 operation
- Displays error when the user tries to calculate the result for a mathematically invalid input
- Clear and delete buttons to improve user experience
- Handles decimal arithmetic. Although it will run into the typical floating point troubles (since decimals cannot be exactly expressed using binary)
- When the user clicks equals, a number (the "result") is displayed. If their next click is an operation, the operation is performed on the "result". Otherwise,
  the screen clears and the next click is displayed by iteself


### Testing

- Automated unit tests are in calculator.tests.js
- Video of calculator in action:


### Known Bugs

- Decimal +exponential arithmetic starts to approximate due to typical problems storing these numbers in binary