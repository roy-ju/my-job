import { LawSearchForm, LawSerachFormPc } from '@/components/organisms';
import { useIsomorphicLayoutEffect } from '@/hooks/utils';
import { getDevice } from '@/utils/misc';
import { useState } from 'react';

export interface LegalCounselingSearchProps {
  onSubmit?: (value: string) => void;
  onClickBack?: () => void;
  closePopLast?: () => void;
}

export default function LegalCounselingSearch({ onSubmit, onClickBack, closePopLast }: LegalCounselingSearchProps) {
  const [render, setRender] = useState('');

  useIsomorphicLayoutEffect(() => {
    if (getDevice() === 'PC') {
      setRender('PC');
    } else if (getDevice() === 'Mobile') {
      setRender('Mobile');
    }
  });

  return (
    <div tw="h-full flex flex-col">
      {render === 'PC' && <LawSerachFormPc onSubmit={onSubmit} onClickBack={onClickBack} closePopLast={closePopLast} />}
      {render === 'Mobile' && <LawSearchForm onSubmit={onSubmit} onClickBack={onClickBack} />}
    </div>
  );
}
