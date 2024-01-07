type EnumType<T> = {
  [K in keyof T]: T[K];
};

export default function isEnumValue<T extends number | string, U extends EnumType<U>>(val: T, enumType: U) {
  return val === 0 || Object.values(enumType).includes(val);
}
