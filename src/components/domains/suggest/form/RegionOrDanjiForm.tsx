import { memo } from 'react';

import ButtonV2 from '@/components/atoms/ButtonV2';

import { DanjiOrRegionalType } from '@/constants/enums';

import tw from 'twin.macro';
import Section from './ui/Section';

import AnimateRegionOrDanjiButton from './ui/AnimateRegionOrDanjiButton';

import checkSelected from '../utils/checkSelected';

import useSelectDanjiOrRegion from './hooks/useSelectDanjiOrRegion';

import { AnimationLi, AnimationP } from './ui/AnimationText';

import forms from './constants/forms';

type RegionOrDanjiFormProps = {
  needDiabledFields?: boolean;
};

const GuideTexts = memo(() => (
  <ul tw="text-body_01 text-gray-600 list-disc pl-3 text-justify">
    <AnimationLi transition={{ duration: 0.7 }}>
      {`단지를 선택하시게 되면, 해당 단지에 '구해요' 목록으로 표시되고, 해당 단지 집주인도 추천이 가능합니다.`}
    </AnimationLi>
    <AnimationLi transition={{ duration: 0.9 }}>
      지역을 선택하시면, 중개사에게만 표시되고, 중개사로부터만 추천받을 수 있습니다.
    </AnimationLi>
  </ul>
));

export default function RegionOrDanjiForm({ needDiabledFields = false }: RegionOrDanjiFormProps) {
  const { danjiOrRegion, address, danjiName, handleClickDanjiOrRegion, handleOpenReselectPopup } =
    useSelectDanjiOrRegion();

  return (
    <Section id={forms.REGION_OR_DANJI} tw="pt-0">
      {!address.length && !danjiName ? (
        <>
          <div tw="flex flex-row items-center gap-3 mb-6">
            <AnimateRegionOrDanjiButton
              title="지역"
              description="△△동에서 집 찾기"
              value={DanjiOrRegionalType.Regional.toString()}
              handleClick={handleClickDanjiOrRegion}
              selected={checkSelected<DanjiOrRegionalType | 0>(danjiOrRegion, DanjiOrRegionalType.Regional)}
            />
            <AnimateRegionOrDanjiButton
              title="단지"
              description="□□단지에서 집 찾기"
              value={DanjiOrRegionalType.Danji.toString()}
              handleClick={handleClickDanjiOrRegion}
              selected={checkSelected<DanjiOrRegionalType | 0>(danjiOrRegion, DanjiOrRegionalType.Danji)}
            />
          </div>
          <GuideTexts />
        </>
      ) : (
        <>
          <div tw="flex justify-between">
            <div tw="flex flex-col gap-0.5">
              <AnimationP transition={{ duration: 0.2 }} tw="text-body_02 text-gray-700">
                {address.length > 0 ? '선택한 지역' : '선택한 단지'}
              </AnimationP>
              <AnimationP transition={{ duration: 0.3 }} tw="text-heading_01 flex flex-col gap-1">
                {address.length > 0
                  ? address.map((item, idx) => (
                      <span key={item} css={[idx === 0 && tw`[margin-top: 6px]`]}>
                        {item}
                      </span>
                    ))
                  : danjiName}
              </AnimationP>
            </div>

            {!needDiabledFields && (
              <ButtonV2 variant="gray" size="small" onClick={handleOpenReselectPopup} tw="[margin-top: 9px]">
                {address.length > 0 ? '지역 재선택' : '재선택'}
              </ButtonV2>
            )}
          </div>
          <AnimationP transition={{ duration: 0.4 }} tw="text-body_01 text-gray-600 mt-4">
            {address.length > 0 ? '추천은 법정동을 기준으로 합니다.' : '선택한 단지의 매물만 추천받을 수 있어요.'}
          </AnimationP>
        </>
      )}
    </Section>
  );
}
