import dynamic from 'next/dynamic';

import Container from '@/components/atoms/Container';

import FlexContents from '@/components/atoms/FlexContents';

import PersistentBottomBar from '@/components/atoms/PersistentBottomBar';

import Button from '@/components/atoms/Button';

import { NavigationHeader, TextField } from '@/components/molecules';

import useListingQnaCreateHandler from './qna-create/hooks/useListingQnaCreateHandler';

const ConfirmPopup = dynamic(() => import('./qna-create/popups/ConfirmPopup'), { ssr: false });

export default function ListingQnaCreate() {
  const {
    platform,
    value,
    isCreating,
    isOpenConfirmPopup,
    handleCreateQna,
    handleChangeValue,
    handleOpenPopup,
    handleClosePopup,
    handleClickBack,
  } = useListingQnaCreateHandler();

  return (
    <Container>
      <NavigationHeader>
        {platform === 'mobile' && <NavigationHeader.BackButton onClick={handleClickBack} />}
        <NavigationHeader.Title>매물문의하기</NavigationHeader.Title>
      </NavigationHeader>
      <FlexContents tw="py-7 px-5">
        <TextField variant="outlined" size="medium">
          <TextField.TextArea
            value={value}
            onChange={handleChangeValue}
            tw="min-h-[72px]"
            placeholder="내용을 입력하세요.&#13;&#10;"
            spellCheck="false"
          />
        </TextField>
        <TextField.HelperMessage>{value?.length} / 200</TextField.HelperMessage>
      </FlexContents>
      <PersistentBottomBar>
        <Button
          tw="w-full"
          size="bigger"
          isLoading={isCreating}
          disabled={!(value.length > 0)}
          onClick={handleOpenPopup}
        >
          작성완료
        </Button>
      </PersistentBottomBar>
      {isOpenConfirmPopup && <ConfirmPopup handleCancel={handleClosePopup} handleConfirm={handleCreateQna} />}
    </Container>
  );
}
