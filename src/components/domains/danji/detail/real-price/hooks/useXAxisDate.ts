import { getStartDate } from '../utils/chart';

import { MonthStartDate } from '../chartTypes';

const useXAxisDate = (selectedYear: number) => {
  function getAllStartDates(start: Date, end: Date): MonthStartDate[] {
    const startDates: MonthStartDate[] = [];
    let currentDate = new Date(start);

    while (currentDate <= end) {
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth() + 1;
      startDates.push({ date: getStartDate(year, month) });
      currentDate = new Date(year, month, 1);
    }
    return startDates;
  }

  const currentDate = new Date(); // 현재 날짜
  const currentYear = currentDate.getFullYear(); // 현재 년도

  const currentMonth = currentDate.getMonth() + 1; // 현재 월

  const yearAgoStart = new Date(currentYear - selectedYear, currentMonth - 1, 1); // 1년 전 시작 날짜

  return { data: getAllStartDates(yearAgoStart, currentDate) }; // 1년 전 모든 월의 시작 날짜
};

export default useXAxisDate;
