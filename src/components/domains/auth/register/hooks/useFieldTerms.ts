import { useCallback, useState } from 'react';

import TermsState from '../types/Terms';

export default function useFieldTerms() {
  const [terms, setTerms] = useState<TermsState>({
    over19: false,
    service: false,
    privacy: false,
    location: false,
    notification: false,
    marketing: false,
  });

  const handleChangeTerms = useCallback((newTerms: TermsState) => {
    setTerms(newTerms);
  }, []);

  return { terms, handleChangeTerms };
}
