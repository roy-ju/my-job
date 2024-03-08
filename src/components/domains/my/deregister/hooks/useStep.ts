import { useCallback, useState } from 'react';

export default function useStep() {
  const [step, setStep] = useState(1);

  const handleUpdateStep = useCallback((v: number) => {
    setStep(v);
  }, []);

  return { step, handleUpdateStep };
}
