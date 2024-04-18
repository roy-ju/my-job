import { useCallback, useState, useEffect } from 'react';

export default function useSelectInterviewPopupHandler({
  interviewAvaliableTimes,
}: {
  interviewAvaliableTimes: string;
}) {
  const [selectedInterviewAvailabletimes, setSelectedInterviewAvailableTimes] = useState<string[]>([]);

  const handleChangeSelectedInterviewAvailabletimes = useCallback(
    (e?: NegocioMouseEvent<HTMLButtonElement>) => {
      if (e) {
        const { value } = e.currentTarget;
        if (value === '인터뷰 시간대 상관 없어요.' || value === '인터뷰를 원하지 않아요.') {
          if (selectedInterviewAvailabletimes.includes(value)) {
            setSelectedInterviewAvailableTimes((prev) => prev.filter((ele) => ele !== value));
          } else {
            setSelectedInterviewAvailableTimes([value]);
          }
        } else {
          const result =
            selectedInterviewAvailabletimes.includes('인터뷰 시간대 상관 없어요.') ||
            selectedInterviewAvailabletimes.includes('인터뷰를 원하지 않아요.')
              ? [value]
              : selectedInterviewAvailabletimes.includes(value)
              ? selectedInterviewAvailabletimes.filter((ele) => ele !== value)
              : [...selectedInterviewAvailabletimes, value];
          setSelectedInterviewAvailableTimes(result);
        }
      }
    },
    [selectedInterviewAvailabletimes],
  );

  useEffect(() => {
    if (interviewAvaliableTimes) {
      const convertedList = interviewAvaliableTimes.split(',').filter((ele) => ele !== '인터뷰를 원하지 않아요.');

      setSelectedInterviewAvailableTimes(convertedList);
    }
  }, [interviewAvaliableTimes]);

  return { selectedInterviewAvailabletimes, handleChangeSelectedInterviewAvailabletimes };
}
