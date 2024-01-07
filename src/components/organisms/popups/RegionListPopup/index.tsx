import { useCallback, useMemo, useState } from 'react';

import { useMapEubmyeondongList } from '@/apis/map/mapEubmyeondong';

import { useMapSidoList } from '@/apis/map/mapSidoList';

import { useMapSigunguList } from '@/apis/map/mapSigunguList';

import { Separator } from '@/components/atoms';

import RegionList, { RegionItem } from '@/components/organisms/RegionList';

import { convertSidoName, convertSigunguName } from '@/utils/fotmat';

import { OverlayPresenter } from '@/components/molecules';

interface RegionFormProps {
  onClickClose?: () => void;
  onSubmit?: (item: RegionItem) => void;
}

export default function RegionListPopup({ onClickClose, onSubmit }: RegionFormProps) {
  const [sido, setSido] = useState<RegionItem | null>(null);
  const [sigungu, setSigungu] = useState<RegionItem | null>(null);
  const [eubmyeondong, setEubmyeondong] = useState<RegionItem | null>(null);

  const { data: sidoData } = useMapSidoList();

  const { data: sigunguData } = useMapSigunguList({ sidoCode: sido?.code });

  const { data: eubmyeondongData } = useMapEubmyeondongList({ sigunguCode: sigungu?.code });

  const sidoList = useMemo(
    () =>
      sidoData?.list
        ?.map((item) => ({
          name: convertSidoName(item.name),
          code: item.code,
        }))
        .filter((item) => ['서울', '경기', '인천'].includes(item.name))
        .sort((a, b) => (a.name < b.name ? -1 : 0)),
    [sidoData],
  );

  const sigunguList = useMemo(
    () =>
      sigunguData?.list
        ?.map((item) => ({
          name: convertSigunguName(item.name),
          code: item.code,
        }))
        .sort((a, b) => (a.name < b.name ? -1 : 0)),
    [sigunguData],
  );

  const eubmyeondongList = useMemo(
    () =>
      eubmyeondongData?.list
        ?.map((item) => ({
          name: item.name,
          code: item.code,
        }))
        .sort((a, b) => (a.name < b.name ? -1 : 0)),
    [eubmyeondongData],
  );

  const handleSubmit = useCallback(() => {
    if (eubmyeondong && sigungu && sido) {
      onSubmit?.({
        name: `${sido.name} ${sigungu.name} ${eubmyeondong.name}`,
        code: eubmyeondong.code,
      });
    }
  }, [sido, sigungu, eubmyeondong, onSubmit]);

  return (
    <OverlayPresenter>
      <div tw="bg-white w-[380px] h-[600px] rounded-lg shadow">
        <RegionList tw="h-full">
          <RegionList.Header onClickClose={onClickClose} />
          <Separator tw="h-px" />
          <RegionList.Breadcrumbs value1={sido?.name} value2={sigungu?.name} value3={eubmyeondong?.name} />
          <Separator tw="h-px" />
          <RegionList.List
            list1={sidoList}
            list2={sigunguList}
            list3={eubmyeondongList}
            onChangeValue1={(value1) => {
              setSido(value1);
              setSigungu(null);
              setEubmyeondong(null);
            }}
            onChangeValue2={(value2) => {
              setSigungu(value2);
              setEubmyeondong(null);
            }}
            onChangeValue3={(value3) => setEubmyeondong(value3)}
            value1={sido}
            value2={sigungu}
            value3={eubmyeondong}
          />
          <RegionList.Submit disabled={!sido || !sigungu || !eubmyeondong} onSubmit={handleSubmit} />
        </RegionList>
      </div>
    </OverlayPresenter>
  );
}
