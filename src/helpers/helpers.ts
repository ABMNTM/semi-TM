// email
export function validateEmail(input: string): boolean {
  const emailPattern: RegExp =
    /^(?=.{1,256})(?=.{1,64}@.{1,255}$)[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
  return emailPattern.test(input);
}

export function isASCII(str: string) {
  return /^[\x00-\x7F]*$/.test(str);
}