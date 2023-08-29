import { MobileContainer } from '@/components/atoms';
import { memo, useState } from 'react';
import { RecommendationForm as RecommendationFormTemplate } from '@/components/templates';
import { OverlayPresenter } from '@/components/molecules';
import Routes from '@/router/routes';
import { useRouter } from 'next/router';
import { DanjiList } from '@/components/organisms';
import RegionForm from '../SuggestRegionalForm/RegionForm';

export default memo(() => {
  const [selectedButton, setSelectedButton] = useState<'region' | 'danji' | 'none'>('none');
  const router = useRouter();

  const handleOpenRegionList = () => {
    setSelectedButton('region');
  };
  const handleCloseModal = () => {
    setSelectedButton('none');
  };

  const handleOpenDanjiList = () => {
    setSelectedButton('danji');
  };

  return (
    <MobileContainer>
      <RecommendationFormTemplate
        selectedButton={selectedButton}
        handleOpenRegionList={handleOpenRegionList}
        handleOpenDanjiList={handleOpenDanjiList}
        onClickBack={() => {
          router.back();
        }}
      />
      {selectedButton === 'region' && (
        <OverlayPresenter>
          <div tw="bg-white w-[380px] h-[600px] rounded-lg shadow">
            <RegionForm
              onClickClose={handleCloseModal}
              onSubmit={(item) => {
                handleCloseModal();
                router.push(`/${Routes.EntryMobile}/${Routes.SuggestRegionalForm}?address=${item.name}`);
              }}
            />
          </div>
        </OverlayPresenter>
      )}
      {selectedButton === 'danji' && (
        <OverlayPresenter>
          <div tw="bg-white w-[380px] h-[600px] rounded-lg shadow">
            <DanjiList tw="h-full">
              <DanjiList.Header onClickClose={handleCloseModal} />
              <DanjiList.AddressSearchForm
                onSubmit={(danjiID) => {
                  handleCloseModal();
                  router.push(`/${Routes.EntryMobile}/${Routes.DanjiRecommendation}?danjiID=${danjiID}`);
                }}
              />
            </DanjiList>
          </div>
        </OverlayPresenter>
      )}
    </MobileContainer>
  );
});
