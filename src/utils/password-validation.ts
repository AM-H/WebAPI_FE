function isNumber(value: string): boolean {
  return new RegExp('(?=.*[0-9])').test(value);
}

function isLowercaseChar(value: string): boolean {
  return new RegExp('(?=.*[a-z])').test(value);
}

function isUppercaseChar(value: string): boolean {
  return new RegExp('(?=.*[A-Z])').test(value);
}

function isSpecialChar(value: string): boolean {
  return new RegExp('(?=.*[!@#$%^&*(),.?":{}|<>])').test(value);
}

function minLength(value: string): boolean {
  return value.length >= 12;
}

// New function to validate role (between 1-5)
function isValidRole(value: number): boolean {
  return value >= 1 && value <= 5 && Number.isInteger(value);
}

export { isNumber, isLowercaseChar, isUppercaseChar, isSpecialChar, minLength, isValidRole };