export default function checkSelected<T>(target: T, compareTarget: T | T[]) {
  if (Array.isArray(compareTarget)) {
    return compareTarget.includes(target);
  }

  return target === compareTarget;
}
