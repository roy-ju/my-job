import { Panel } from '@/components/atoms';
import { OverlayPresenter, Popup } from '@/components/molecules';
import { DanjiDetail } from '@/components/templates';
import { useRouter as useNextRouter } from 'next/router';
import { memo } from 'react';
import useDanjiDetail from './useDanjiDetail';

interface Props {
  depth: number;
  panelWidth?: string;
}

export default memo(({ panelWidth, depth }: Props) => {
  const { danji, mutate } = useDanjiDetail(depth);

  const nextRouter = useNextRouter();

  const handleMutateDanji = () => {
    mutate();
  };

  if (!danji) return null;

  if (danji?.error_code) {
    return (
      <OverlayPresenter>
        <Popup>
          <Popup.ContentGroup tw="py-10">
            <Popup.Title>유효하지 않은 페이지입니다.</Popup.Title>
          </Popup.ContentGroup>
          <Popup.ButtonGroup>
            <Popup.ActionButton
              onClick={() => {
                nextRouter.replace('/', undefined, { shallow: true });
              }}
            >
              확인
            </Popup.ActionButton>
          </Popup.ButtonGroup>
        </Popup>
      </OverlayPresenter>
    );
  }

  return (
    <Panel width={panelWidth}>
      <DanjiDetail depth={depth} danji={danji} isShowTab handleMutateDanji={handleMutateDanji} />
    </Panel>
  );
});
