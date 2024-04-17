export default function removeElementOnce(arr: string[], element: string) {
  const index = arr.indexOf(element); // element의 첫 번째 인덱스를 찾는다.
  if (index !== -1) {
    arr.splice(index, 1); // 해당 인덱스의 요소를 배열에서 제거한다.
  }
  return arr;
}
