export default function getIncludeValue<T>(target: T, compareTarget: T[]) {
  return compareTarget.includes(target);
}
