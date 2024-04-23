export default function sortTimes(array: string[]) {
  return array.sort((time1: string, time2: string) => {
    const startTime1 = time1.split('~')[0].trim().split(':').map(Number);
    const startTime2 = time2.split('~')[0].trim().split(':').map(Number);

    const minutes1 = startTime1[0] * 60 + startTime1[1];
    const minutes2 = startTime2[0] * 60 + startTime2[1];

    return minutes1 - minutes2;
  });
}
