export default function makeObject<T>(obj: T): Readonly<T> {
  const resultObject = { ...obj };

  return Object.freeze(resultObject);
}
