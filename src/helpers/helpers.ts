// email
export function validateEmail(input: string): boolean {
  const emailPattern: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(input);
}
