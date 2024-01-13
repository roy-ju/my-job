/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react';

import { useRecoilState } from 'recoil';

import { Button, Separator } from '@/components/atoms';

import mobileMapAtom from '@/states/atom/mobileMap';

import useFullScreenDialog from '@/states/hooks/useFullScreenDialog';

import useIsomorphicLayoutEffect from '@/hooks/useIsomorphicLayoutEffect';

import { convertSidoName, convertSigunguName } from '@/utils/fotmat';

import { useMapSidoList } from '@/apis/map/mapSidoList';

import { useMapSigunguList } from '@/apis/map/mapSigunguList';

import { useMapEubmyeondongList } from '@/apis/map/mapEubmyeondong';

import Close from '@/assets/icons/close_24.svg';

export default function MobAreaSearch({ centerAddress, code }: { centerAddress?: string[]; code?: string }) {
  const [sido, setSido] = useState('');
  const [sigungu, setSigungu] = useState('');
  const [eubmyeondong, setEubmyeondong] = useState('');

  const selectedRefOne = useRef<HTMLButtonElement | null>(null);
  const selectedRefTwo = useRef<HTMLButtonElement | null>(null);
  const selectedRefThree = useRef<HTMLButtonElement | null>(null);

  const scrollConainerRefOne = useRef<HTMLDivElement | null>(null);
  const scrollConainerRefTwo = useRef<HTMLDivElement | null>(null);
  const scrollConainerRefThree = useRef<HTMLDivElement | null>(null);

  const [sidoCode, setSidoCode] = useState('');
  const [sigunguCode, setSigunguCode] = useState('');
  const [eubmyeondongCode, setEubmyeondongCode] = useState('');

  const [centerPoint, setCenterPoint] = useState<{ lat: number; lng: number } | undefined>();

  const [center, setCenter] = useState<(string | null)[] | undefined>();

  const { data: sidoData } = useMapSidoList();

  const { data: sigunguData } = useMapSigunguList({ sidoCode });

  const { data: eubmyeondongData } = useMapEubmyeondongList({ sigunguCode });

  const { closeAll } = useFullScreenDialog();

  const [map, _] = useRecoilState(mobileMapAtom);

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
      setEubmyeondongCode(`${code.slice(0, 8)}00`);
    }
  }, [code]);

  useEffect(() => {
    if (center?.[0]) {
      setSido(convertSidoName(center?.[0]));
    }
  }, [center]);

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
    if (eubmyeondongCode && eubmyeondongData?.list) {
      const result = eubmyeondongData.list.filter((item) => item.code === eubmyeondongCode);

      if (result && result.length >= 1) {
        setCenterPoint({ lat: result[0].lat, lng: result[0].long });
      }
    }
  }, [eubmyeondongCode, eubmyeondongData]);

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

  function setScreenSize() {
    const vh = window.innerHeight * 0.01;

    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }

  useIsomorphicLayoutEffect(() => {
    setScreenSize();
  }, []);

  useEffect(() => {
    if (selectedRefOne?.current && scrollConainerRefOne?.current) {
      selectedRefOne.current?.scrollIntoView();
      // const selectedRefOneTop = selectedRefOne.current?.getBoundingClientRect();
      // scrollConainerRefThree.current?.scrollBy({ top: selectedRefOneTop.top - 300 });
    }
  }, [selectedRefOne?.current, scrollConainerRefOne]);

  useEffect(() => {
    if (selectedRefTwo?.current && scrollConainerRefTwo?.current) {
      selectedRefTwo.current?.scrollIntoView();
      // const selectedRefTwoTop = selectedRefTwo.current?.getBoundingClientRect();
      // scrollConainerRefThree.current?.scrollBy({ top: selectedRefTwoTop.top });
    }
  }, [selectedRefTwo?.current, scrollConainerRefTwo]);

  useEffect(() => {
    if (selectedRefThree?.current && scrollConainerRefThree?.current) {
      selectedRefThree?.current.scrollIntoView();
      // const selectedRefThreeTop = selectedRefThree.current?.getBoundingClientRect();
      // scrollConainerRefThree.current?.scrollBy({ top: selectedRefThreeTop.top - 300 });
    }
  }, [selectedRefThree?.current, scrollConainerRefThree]);

  return (
    <div tw="w-[100%] mx-auto z-[1000] bg-white">
      <div tw="w-[100%] fixed left-auto right-auto top-0 gap-3 bg-white z-[910]">
        <div tw="flex items-center justify-between py-4 px-5 [border-bottom-width: 1px] border-b-gray-300">
          <span tw="font-bold [font-size: 1rem] [line-height: 1.5rem]">지역 검색</span>
          <Button
            variant="ghost"
            tw="px-0 py-0 h-0"
            onClick={() => {
              closeAll();
            }}
          >
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

      <div tw="mt-[128px] mb-[92px] flex flex-1 z-[900] overflow-y-hidden min-h-0 h-[calc(var(--100vh) - 128px - 92px)]">
        <div ref={scrollConainerRefOne} tw="flex flex-col flex-1 overflow-y-auto">
          {sidoData?.list?.map((item) => {
            if (item.code === sidoCode) {
              return (
                <Button
                  variant="primary"
                  tw="bg-gray-200 font-bold text-gray-1000 rounded-none hover:rounded-none min-h-[2.5rem] max-h-[2.5rem] hover:bg-gray-200"
                  key={item.code}
                  id={item.code}
                  name={convertSidoName(item.name)}
                  ref={selectedRefOne}
                  onClick={(e) => {
                    if (e) {
                      setSidoCode(e.currentTarget.id);
                      setSido(e.currentTarget.name);
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
                tw="bg-white text-gray-1000 rounded-none hover:bg-gray-200 hover:rounded-none hover:text-gray-1000 min-h-[2.5rem] max-h-[2.5rem]"
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

        <div
          ref={scrollConainerRefTwo}
          tw="flex flex-col flex-1 [border-right-width: 1px] border-r-gray-300 [border-left-width: 1px] border-l-gray-300 overflow-y-auto"
        >
          {sigunguData?.list?.map((item) => {
            if (item.code === sigunguCode) {
              return (
                <Button
                  variant="primary"
                  tw="bg-gray-200 font-bold text-gray-1000 rounded-none hover:rounded-none min-h-[2.5rem] max-h-[2.5rem] hover:bg-gray-200"
                  key={item.code}
                  id={item.code}
                  name={convertSigunguName(item.name)}
                  ref={selectedRefTwo}
                  onClick={(e) => {
                    if (e) {
                      setSigunguCode(e?.currentTarget.id);
                      setSigungu(convertSigunguName(e.currentTarget.name));
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
                tw="bg-white text-gray-1000 rounded-none hover:bg-gray-200 hover:rounded-none hover:text-gray-1000 min-h-[2.5rem] max-h-[2.5rem]"
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

        <div ref={scrollConainerRefThree} tw="flex flex-col flex-1 overflow-y-auto">
          {eubmyeondongData?.list?.map((item) => {
            if (item.code === eubmyeondongCode) {
              return (
                <Button
                  variant="primary"
                  tw="bg-gray-200 font-bold text-gray-1000 rounded-none hover:rounded-none min-h-[2.5rem] max-h-[2.5rem] hover:bg-gray-200"
                  key={item.code}
                  id={item.code}
                  name={item.name}
                  ref={selectedRefThree}
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
                tw="bg-white text-gray-1000 rounded-none hover:bg-gray-200 hover:rounded-none hover:text-gray-1000 min-h-[2.5rem]"
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

      <div tw="fixed bottom-0 left-auto right-auto px-5 pt-4 pb-5 [width: 100%] bg-white">
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
