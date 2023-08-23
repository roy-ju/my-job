import { Panel } from '@/components/atoms';
import { memo, useState } from 'react';
import { RecommendationForm as RecommendationFormTemplate } from '@/components/templates';
import { OverlayPresenter } from '@/components/molecules';
import { useRouter } from '@/hooks/utils';
import Routes from '@/router/routes';
import RegionForm from '../SuggestRegionalForm/RegionForm';

interface Props {
  depth: number;
  panelWidth?: string;
}

export default memo(({ depth, panelWidth }: Props) => {
  const [isRegionListOpen, setIsRegionListOpen] = useState(false);
  // const [isDanjiListOpen, setIsDanjiListOpen] = useState(false);
  const [selectedButton, setSelectedButton] = useState<'region' | 'danji' | 'none'>('none');
  const router = useRouter(depth);

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
      {isRegionListOpen && (
        <OverlayPresenter>
          <div tw="bg-white w-[380px] h-[600px] rounded-lg shadow">
            <RegionForm
              onClickClose={handleCloseRegionList}
              onSubmit={(item) => {
                handleCloseRegionList();

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
    </Panel>
  );
});
