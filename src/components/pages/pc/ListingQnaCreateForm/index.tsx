import { Panel } from '@/components/atoms';
import { ListingQnaCreateForm } from '@/components/templates';
import { useRouter } from '@/hooks/utils';
import { memo, useCallback, useState } from 'react';

interface Props {
  depth: number;
  panelWidth?: string;
}

export default memo(({ depth, panelWidth }: Props) => {
  const router = useRouter(depth);
  const [isCreating, setIsCreating] = useState(false);

  const handleCreateQna = useCallback(
    (value: string) => {
      setIsCreating(true);
      console.log(value);
      setIsCreating(false);
      router.pop();
    },
    [router],
  );

  return (
    <Panel width={panelWidth}>
      <ListingQnaCreateForm isCreating={isCreating} onClickCreateQna={handleCreateQna} />
    </Panel>
  );
});
