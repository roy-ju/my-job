import { Panel } from '@/components/atoms';
import { memo, useState } from 'react';
import { RecommendationForm as RecommendationFormTemplate } from '@/components/templates';
import { OverlayPresenter } from '@/components/molecules';
import { useRouter } from '@/hooks/utils';
import Routes from '@/router/routes';
import { DanjiList } from '@/components/organisms';
import RegionForm from '../SuggestRegionalForm/RegionForm';

interface Props {
  depth: number;
  panelWidth?: string;
}

export default memo(({ depth, panelWidth }: Props) => {
  const [selectedButton, setSelectedButton] = useState<'region' | 'danji' | 'none'>('none');
  const router = useRouter(depth);

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
    <Panel width={panelWidth}>
      <RecommendationFormTemplate
        selectedButton={selectedButton}
        handleOpenRegionList={handleOpenRegionList}
        handleOpenDanjiList={handleOpenDanjiList}
        onClickBack={
          router.query.back === 'true' && router.query.redirect
            ? () => {
                router.replace(router.query.redirect as string);
              }
            : undefined
        }
      />
      {selectedButton === 'region' && (
        <OverlayPresenter>
          <div tw="bg-white w-[380px] h-[600px] rounded-lg shadow">
            <RegionForm
              onClickClose={handleCloseModal}
              onSubmit={(item) => {
                handleCloseModal();

                router.replace(Routes.SuggestRegionalForm, {
                  searchParams: {
                    address: item.name,
                  },
                });
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

                  router.replace(Routes.DanjiRecommendation, {
                    searchParams: {
                      danjiID: `${danjiID}`,
                    },
                  });
                }}
              />
            </DanjiList>
          </div>
        </OverlayPresenter>
      )}
    </Panel>
  );
});
