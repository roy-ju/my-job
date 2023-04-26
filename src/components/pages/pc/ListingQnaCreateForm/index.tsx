import createListingQna from '@/apis/listing/createListingQna';
import useAPI_GetListingQnaList from '@/apis/listing/getListingQnaList';
import { Panel } from '@/components/atoms';
import { ListingQnaCreateForm } from '@/components/templates';
import { useRouter } from '@/hooks/utils';
import { memo, useCallback, useState } from 'react';
import { toast } from 'react-toastify';

interface Props {
  depth: number;
  panelWidth?: string;
}

export default memo(({ depth, panelWidth }: Props) => {
  const router = useRouter(depth);
  const listingID = Number(router.query.listingID) ?? 0;

  const { mutate } = useAPI_GetListingQnaList(listingID);

  const [isCreating, setIsCreating] = useState(false);

  const handleCreateQna = useCallback(
    async (value: string) => {
      setIsCreating(true);
      await createListingQna({
        listing_id: Number(router.query.listingID),
        message: value,
      });
      await mutate();
      setIsCreating(false);
      toast.success('문의가 등록되었습니다.');
      router.pop();
    },
    [router, mutate],
  );

  return (
    <Panel width={panelWidth}>
      <ListingQnaCreateForm isCreating={isCreating} onClickCreateQna={handleCreateQna} />
    </Panel>
  );
});
