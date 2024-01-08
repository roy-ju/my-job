import { useCallback } from 'react';

import { useRecoilState } from 'recoil';

import SuggestFormSelector from '../selector/SuggestFormSelector';

import SuggestForm from '../types';

export default function useSelectInterview() {
  const [interviewAvailabletimes, setInterviewAvailabletimes] = useRecoilState<SuggestForm['interviewAvailabletimes']>(
    SuggestFormSelector('interviewAvailabletimes'),
  );

  const handleClickInterviewAvailabletimes = useCallback(
    (e?: NegocioMouseEvent<HTMLButtonElement>) => {
      if (e) {
        const { value } = e.currentTarget;
        if (value === '인터뷰 시간대 상관 없어요.' || value === '인터뷰를 원하지 않아요.') {
          if (interviewAvailabletimes.includes(value)) {
            setInterviewAvailabletimes((prev) => prev.filter((ele) => ele !== value));
          } else {
            setInterviewAvailabletimes([value]);
          }
        } else {
          const result =
            interviewAvailabletimes.includes('인터뷰 시간대 상관 없어요.') ||
            interviewAvailabletimes.includes('인터뷰를 원하지 않아요.')
              ? [value]
              : interviewAvailabletimes.includes(value)
              ? interviewAvailabletimes.filter((ele) => ele !== value)
              : [...interviewAvailabletimes, value];
          setInterviewAvailabletimes(result);
        }
      }
    },
    [interviewAvailabletimes, setInterviewAvailabletimes],
  );

  return { interviewAvailabletimes, handleClickInterviewAvailabletimes };
}
