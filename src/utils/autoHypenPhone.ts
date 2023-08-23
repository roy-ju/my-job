export function autoHyphenPhone(target: any) {
  if (typeof target === 'string') {
    return target.replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);
  }
  return '';
}
