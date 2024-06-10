import { useState } from 'react';

import { useRouter } from 'next/router';

import { toast } from 'react-toastify';

import { MobAuthRequired, MobileContainer } from '@/components/atoms';

import LegalCounselingWriting from '@/components/templates/LegalCounselingWriting';

import Routes from '@/router/routes';

import useFetchLawQnaList from '@/services/law-qna/useFetchLawQnaList';

import { apiService } from '@/services';

function LawQnaCreate() {
  const router = useRouter();

  const { mutate } = useFetchLawQnaList({ searchQuery: null });

  const [isLoading, setIsLoading] = useState(false);

  const handleClickConfirm = async (text?: string, message?: string) => {
    if (!text || !message) return;

    setIsLoading(true);

    const response = await apiService.createLawQna({ title: text, user_message: message });

    if (response === null) {
      toast.success('등록이 완료되었습니다.', { toastId: 'success-law-create' });

      mutate();

      router.replace(`/${Routes.EntryMobile}/${Routes.LawQna}`);
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
