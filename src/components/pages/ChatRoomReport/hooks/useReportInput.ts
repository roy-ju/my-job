import { ChangeEventHandler, useCallback, useState } from 'react';

export default function useReportInput() {
  const [reportValue, setReportValue] = useState('');

  const handleChange = useCallback<ChangeEventHandler<HTMLTextAreaElement>>(
    (e) => {
      if (e.target.value.length > 200) {
        return;
      }
      setReportValue(e.target.value);
    },
    [setReportValue],
  );

  return { reportValue, handleChange };
}
