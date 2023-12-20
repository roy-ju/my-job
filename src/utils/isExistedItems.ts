export function isExistedItems<T>(list: T[] = []) {
  if (list.length > 0) {
    return true;
  }

  return false;
}
