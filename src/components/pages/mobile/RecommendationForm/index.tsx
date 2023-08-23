import { MobileContainer } from '@/components/atoms';
import { memo, useState } from 'react';
import { RecommendationForm as RecommendationFormTemplate } from '@/components/templates';
import { OverlayPresenter } from '@/components/molecules';
import Routes from '@/router/routes';
import { useRouter } from 'next/router';
import RegionForm from '../SuggestRegionalForm/RegionForm';

export default memo(() => {
  const [isRegionListOpen, setIsRegionListOpen] = useState(false);
  // const [isDanjiListOpen, setIsDanjiListOpen] = useState(false);
  const [selectedButton, setSelectedButton] = useState<'region' | 'danji' | 'none'>('none');
  const router = useRouter();

  const handleOpenRegionList = () => {
    setIsRegionListOpen(true);
    setSelectedButton('region');
  };
  const handleCloseRegionList = () => {
    setIsRegionListOpen(false);
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
      {isRegionListOpen && (
        <OverlayPresenter>
          <div tw="bg-white w-[380px] h-[600px] rounded-lg shadow">
            <RegionForm
              onClickClose={handleCloseRegionList}
              onSubmit={(item) => {
                handleCloseRegionList();
                router.push(`/${Routes.EntryMobile}/${Routes.SuggestRegionalForm}?address=${item.name}`);

                /*
                router.replace(Routes.SuggestRegionalForm, {
                  searchParams: {
                    address: item.name,
                  },
                });
                */
              }}
            />
          </div>
        </OverlayPresenter>
      )}
    </MobileContainer>
  );
});
