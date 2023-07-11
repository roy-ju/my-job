import useAPI_GetLawQna from '@/apis/lawQna/getLawQna';
import { lawQnaCreate } from '@/apis/lawQna/lawQnaCrud';

import { MobAuthRequired, MobileContainer } from '@/components/atoms';
import { LegalCounselingWriting } from '@/components/templates';

import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

function LawQnaCreate() {
  const router = useRouter();

  const { mutate } = useAPI_GetLawQna(null);

  const [isLoading, setIsLoading] = useState(false);

  const handleClickConfirm = async (text?: string, message?: string) => {
    if (!text || !message) return;

    setIsLoading(true);

    const response = await lawQnaCreate({ title: text, user_message: message });

    if (response === null) {
      toast.success('등록이 완료되었습니다.', { toastId: 'success' });
      mutate();
      router.back();
    }
  };

  return (
    <MobAuthRequired>
      <MobileContainer>
        <LegalCounselingWriting
          onClickBack={() => router.back()}
          onClickConfirm={handleClickConfirm}
          isLoading={isLoading}
        />
      </MobileContainer>
    </MobAuthRequired>
  );
}

export default LawQnaCreate;
