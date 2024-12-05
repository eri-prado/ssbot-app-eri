export function validatePhone(value: string): boolean {
  const phoneLength = value.replaceAll(/[^a-zA-Z0-9 ]/g, '').length;
  if (phoneLength > 0 && phoneLength < 11) {
    return true;
  } else {
    return false;
  }
}
