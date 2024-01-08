const makeHash = (value: string, compareValue: string) => (value === compareValue ? value : `#${value}`);

export default makeHash;
