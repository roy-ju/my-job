/* eslint-disable no-plusplus */
/* eslint-disable no-continue */
export default function formatInterviewTimes(interviewAvaliableTimes: string) {
  const times = interviewAvaliableTimes
    .split(',')
    .map((item) => item.replaceAll(' 에 인터뷰 가능해요.', ''))
    .join('/');

  // // 두 번째 "/" 마다 줄바꿈 추가
  // let counter = 0; // "/" 갯수 카운팅
  // let result = ''; // 최종 결과를 저장할 문자열

  // for (let i = 0; i < times.length; i++) {
  //   if (times[i] === '/') {
  //     counter++; // "/" 발견시 카운터 증가
  //     if (counter % 2 === 0) {
  //       // 두 번째 "/" 마다
  //       result += '\n'; // 줄바꿈 추가
  //       continue; // 현재 반복을 스킵
  //     }
  //   }
  //   result += times[i]; // 일반 문자열 추가
  // }

  // return result;
  return times;
}
