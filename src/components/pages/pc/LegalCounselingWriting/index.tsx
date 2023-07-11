import useAPI_GetLawQna from '@/apis/lawQna/getLawQna';
import { lawQnaCreate } from '@/apis/lawQna/lawQnaCrud';
import { AuthRequired, Panel } from '@/components/atoms';
import { LegalCounselingWriting } from '@/components/templates';
import { useRouter } from '@/hooks/utils';

import { memo, useState } from 'react';
import { toast } from 'react-toastify';

interface Props {
  depth: number;
  panelWidth: string;
}

export default memo(({ depth, panelWidth }: Props) => {
  const router = useRouter(depth);

  const { mutate } = useAPI_GetLawQna(null);

  const [isLoading, setIsLoading] = useState(false);

  const handleClickConfirm = async (text?: string, message?: string) => {
    if (!text || !message) return;

    setIsLoading(true);

    const response = await lawQnaCreate({ title: text, user_message: message });

    if (response === null) {
      toast.success('등록이 완료되었습니다.');
      mutate();
      router.popLast();
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
