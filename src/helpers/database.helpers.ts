/**
 * Check if the given string is a valid UUID.
 * @param uuid A valid UUID string.
 * @example ```ts
 * isValidUUID('123e4567-e89b-12d3-a456-426614174000'); // true
 * isValidUUID('66354c5b4117fc9407b49be5'); // false
 * isValidUUID('abc123'); // false
 * ```
 * @returns true if the given string is a valid UUID otherwise false.
 */
export const isValidUUID = (uuid: string) => {
  const regex = /^[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-4[0-9a-fA-F]{3}\-(8|9|a|b)[0-9a-fA-F]{3}\-[0-9a-fA-F]{12}$/;
  return regex.test(uuid);
};

/**
 * Check if the password is strong enough with given password.
 * @param password Password to be checked.
 * @example ```ts
 * checkPasswordStrength('admin'); // false
 * checkPasswordStrength('123456789'); // false
 * isValidUUID('nBfer&3w'); // true
 * ```
 * @returns true if the password is strong enough otherwise false.
 */
export const isPasswordSecure = (password: string) => {
  const insecurePasswords = [
    "admin123",
    "000000",
    "111111",
    "password",
    "123456",
    "1234567",
    "1234568",
    "123456789",
    "012345678",
    "qwerty",
    "abc123",
    "abcdefgh",
    "letmein",
    "football",
    "iloveyou",
    "secretpassword",
    "SecretPassword",
    "SuperSecret",
    "supersecret",
  ];

  if (insecurePasswords.includes(password)) {
    return true;
  }

  return false;
}