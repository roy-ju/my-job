import createListingQna from '@/apis/listing/createListingQna';
import useAPI_GetListingQnaList from '@/apis/listing/getListingQnaList';
import { MobileContainer } from '@/components/atoms';
import { ListingQnaCreateForm } from '@/components/templates';
import { useRouter } from 'next/router';
import { memo, useCallback, useState } from 'react';
import { toast } from 'react-toastify';

export default memo(() => {
  const router = useRouter();
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
      router.back();
    },
    [router, mutate],
  );

  return (
    <MobileContainer>
      <ListingQnaCreateForm
        isCreating={isCreating}
        onClickCreateQna={handleCreateQna}
        onClickBack={() => router.back()}
      />
    </MobileContainer>
  );
});
