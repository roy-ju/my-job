import { Button, Separator } from '@/components/atoms';
import React, { useEffect, useState } from 'react';

import Close from '@/assets/icons/close_24.svg';
import { useMapSidoList } from '@/apis/map/mapSidoList';
import useFullScreenDialogStore from '@/hooks/recoil/mobile/useFullScreenDialog';
import { convertSidoName, convertSigunguName } from '@/utils/fotmat';

import { useMapSigunguList } from '@/apis/map/mapSigunguList';
import { useMapEubmyeondongList } from '@/apis/map/mapEubmyeondong';
import { useRecoilState } from 'recoil';
import { mobileMapState } from '@/states/mob/mobileMap';

export default function MobAreaSearch({ centerAddress, code }: { centerAddress?: string[]; code?: string }) {
  const [sido, setSido] = useState('');
  const [sigungu, setSigungu] = useState('');
  const [eubmyeondong, setEubmyeondong] = useState('');

  const [sidoCode, setSidoCode] = useState('');
  const [sigunguCode, setSigunguCode] = useState('');
  const [eubmyeondongCode, setEubmyeondongCode] = useState('');

  const [centerPoint, setCenterPoint] = useState<{ lat: number; lng: number } | undefined>();

  const [center, setCenter] = useState<(string | null)[] | undefined>();

  const { data: sidoData } = useMapSidoList();

  const { data: sigunguData } = useMapSigunguList({ sidoCode });

  const { data: eubmyeondongData } = useMapEubmyeondongList({ sigunguCode });

  const { closeAll } = useFullScreenDialogStore();

  const [map, _] = useRecoilState(mobileMapState);

  useEffect(() => {
    if (centerAddress) {
      setCenter(centerAddress);
    }
  }, [centerAddress]);

  // 초기에 initializaion 하는 함수
  useEffect(() => {
    if (code) {
      setSidoCode(code.slice(0, 2));
      setSigunguCode(code.slice(0, 5));
      setEubmyeondongCode(code.slice(0, 10));
    }
  }, [code]);

  useEffect(() => {
    if (center?.[0]) {
      setSido(convertSidoName(center?.[0]));
    }
  }, [center]);

  useEffect(() => {
    if (eubmyeondongCode && eubmyeondongData?.list) {
      const result = eubmyeondongData.list.filter((item) => item.code === eubmyeondongCode);
      if (result && result.length >= 1) {
        setCenterPoint({ lat: result[0].lat, lng: result[0].long });
      }
    }
  }, [eubmyeondongCode, eubmyeondongData]);

  useEffect(() => {
    if (center?.[1]) {
      setSigungu(convertSigunguName(center?.[1]));
    }
  }, [center]);

  useEffect(() => {
    if (center?.[2]) {
      setEubmyeondong(center?.[2]);
    }
  }, [center]);

  useEffect(() => {
    if (!sigunguCode && sigunguData?.list?.[0].code && sigunguData?.list?.[0].name) {
      setSigunguCode(sigunguData?.list?.[0].code);
      setSigungu(convertSigunguName(sigunguData?.list?.[0].name));
    }

    if (!eubmyeondongCode && eubmyeondongData?.list?.[0].code && eubmyeondongData?.list?.[0].name) {
      setEubmyeondongCode(eubmyeondongData?.list?.[0].code);
      setEubmyeondong(eubmyeondongData?.list?.[0].name);
    }
  }, [sigunguCode, eubmyeondongCode, sidoData, sigunguData, eubmyeondongData]);

  return (
    <div tw="w-[100%] max-w-mobile mx-auto z-[1000] bg-white">
      <div tw="w-[100%] max-w-mobile fixed left-auto right-auto top-0 gap-3 bg-white z-[910]">
        <div tw="flex items-center justify-between py-4 px-5 [border-bottom-width: 1px] border-b-gray-300">
          <span tw="font-bold [font-size: 1rem] [line-height: 1.5rem]">지역 검색</span>
          <Button variant="ghost" tw="px-0 py-0 h-0" onClick={closeAll}>
            <Close />
          </Button>
        </div>
        <div tw="flex items-center px-5 py-5 gap-3 [border-bottom-width: 1px] border-b-gray-300">
          <span tw="text-b2 [line-height: 1rem]">{sido}</span>
          <Separator tw="h-4 bg-gray-300 min-w-[1px]" />
          <span tw="text-b2 [line-height: 1rem]">{sigungu}</span>
          <Separator tw="h-4 bg-gray-300 min-w-[1px]" />
          <span tw="text-b2 [line-height: 1rem]">{eubmyeondong}</span>
        </div>
        <div tw="w-[100%] min-h-[0.75rem]" />
      </div>

      <div tw="mt-[8rem] flex flex-1 z-[900] overflow-y-hidden h-[calc(100vh - 7.875rem - 5.75rem)]">
        <div tw="flex flex-col flex-1 overflow-y-auto">
          {sidoData?.list?.map((item) => {
            if (item.code === sidoCode) {
              return (
                <Button
                  variant="primary"
                  tw="bg-gray-800 text-white rounded-none hover:rounded-none min-h-[2.5rem]"
                  key={item.code}
                  id={item.code}
                  name={convertSidoName(item.name)}
                  onClick={(e) => {
                    if (e) {
                      setSidoCode(e.currentTarget.id);
                      setSido(e.currentTarget.name);

                      setSigunguCode('');
                      setEubmyeondongCode('');
                    }
                  }}
                >
                  {convertSidoName(item.name)}
                </Button>
              );
            }
            return (
              <Button
                variant="primary"
                tw="bg-white text-gray-1000 rounded-none hover:bg-gray-800 hover:rounded-none hover:text-white min-h-[2.5rem]"
                key={item.code}
                id={item.code}
                name={convertSidoName(item.name)}
                onClick={(e) => {
                  if (e) {
                    setSidoCode(e.currentTarget.id);
                    setSido(e.currentTarget.name);

                    setSigunguCode('');
                    setEubmyeondongCode('');
                  }
                }}
              >
                {convertSidoName(item.name)}
              </Button>
            );
          })}
        </div>

        <div tw="flex flex-col flex-1 [border-right-width: 1px] border-r-gray-300 [border-left-width: 1px] border-l-gray-300 overflow-y-auto">
          {sigunguData?.list?.map((item) => {
            if (item.code === sigunguCode) {
              return (
                <Button
                  variant="primary"
                  tw="bg-gray-800 text-white rounded-none hover:rounded-none min-h-[2.5rem]"
                  key={item.code}
                  id={item.code}
                  name={convertSigunguName(item.name)}
                  onClick={(e) => {
                    if (e) {
                      setSigunguCode(e?.currentTarget.id);
                      setSigungu(convertSigunguName(e.currentTarget.name));

                      setEubmyeondongCode('');
                    }
                  }}
                >
                  {convertSigunguName(item.name)}
                </Button>
              );
            }
            return (
              <Button
                variant="primary"
                tw="bg-white text-gray-1000 rounded-none hover:bg-gray-800 hover:rounded-none hover:text-white min-h-[2.5rem]"
                key={item.code}
                id={item.code}
                name={convertSigunguName(item.name)}
                onClick={(e) => {
                  if (e) {
                    setSigunguCode(e?.currentTarget.id);
                    setSigungu(convertSigunguName(e.currentTarget.name));

                    setEubmyeondongCode('');
                  }
                }}
              >
                {convertSigunguName(item.name)}
              </Button>
            );
          })}
        </div>

        <div tw="flex flex-col flex-1 overflow-y-auto">
          {eubmyeondongData?.list?.map((item) => {
            if (item.code === eubmyeondongCode) {
              return (
                <Button
                  variant="primary"
                  tw="bg-gray-800 text-white rounded-none hover:rounded-none min-h-[2.5rem]"
                  key={item.code}
                  id={item.code}
                  name={item.name}
                  onClick={(e) => {
                    if (e) {
                      setEubmyeondongCode(e.currentTarget.id);
                      setEubmyeondong(e.currentTarget.name);
                    }
                  }}
                >
                  {item.name}
                </Button>
              );
            }
            return (
              <Button
                variant="primary"
                tw="bg-white text-gray-1000 rounded-none hover:bg-gray-800 hover:rounded-none hover:text-white min-h-[2.5rem]"
                key={item.code}
                id={item.code}
                name={item.name}
                onClick={(e) => {
                  if (e) {
                    setEubmyeondongCode(e.currentTarget.id);
                    setEubmyeondong(e.currentTarget.name);
                  }
                }}
              >
                {item.name}
              </Button>
            );
          })}
        </div>
      </div>

      <div tw="fixed bottom-0 left-auto right-auto px-5 pt-4 pb-5 [width: 100%] max-w-mobile bg-white">
        <Button
          variant="primary"
          size="bigger"
          tw="w-full"
          onClick={() => {
            if (centerPoint) {
              map?.morph({ lat: centerPoint.lat, lng: centerPoint.lng });
              closeAll();
            }
          }}
        >
          선택완료
        </Button>
      </div>
    </div>
  );
}
