export default function splitAddress(address: string) {
  const parts = address.split(' ');

  const sido = parts[0]; // 도/특별시/광역시

  const sigungu = parts.slice(1, parts.length - 1).join(' '); // 시/군/구 (중간 모든 부분)

  const eubmyeondong = parts[parts.length - 1]; // 동/읍/면

  return { sido, sigungu, eubmyeondong };
}
