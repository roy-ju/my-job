import { memo, useState } from 'react';

import { useRouter as useNextRouter } from 'next/router';

import { toast } from 'react-toastify';

import { AuthRequired, Panel } from '@/components/atoms';

import LegalCounselingWriting from '@/components/templates/LegalCounselingWriting';

import Routes from '@/router/routes';

import useFetchLawQnaList from '@/services/law-qna/useFetchLawQnaList';

import { apiService } from '@/services';

interface Props {
  depth: number;
  panelWidth: string;
}

export default memo(({ depth, panelWidth }: Props) => {
  const nextRouter = useNextRouter();

  const { mutate } = useFetchLawQnaList({ searchQuery: null });

  const [isLoading, setIsLoading] = useState(false);

  const handleClickConfirm = async (text?: string, message?: string) => {
    if (!text || !message) return;

    setIsLoading(true);

    const response = await apiService.createLawQna({ title: text, user_message: message });

    if (response === null) {
      toast.success('등록이 완료되었습니다.', { toastId: 'success-law-create' });

      mutate();

      nextRouter.replace(`/${Routes.LawQna}`);
    }
  };

  return (
    <AuthRequired depth={depth}>
      <Panel width={panelWidth}>
        <LegalCounselingWriting onClickConfirm={handleClickConfirm} isLoading={isLoading} />
      </Panel>
    </AuthRequired>
  );
});
