export function sliceList<T>(firstSliceNum = 0, secondSliceNum = 0, list: T[] = []) {
  const result = list.slice(firstSliceNum, secondSliceNum);
  
  return result;
}
