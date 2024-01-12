import { memo } from 'react';

import { TextField } from '@/components/molecules';

import { AnimationP, AnimationSpan } from '../../form/ui/AnimationText';

import useChangePastforwardAddtionalText from '../hooks/useChangePastforwardAddtionalText';

import FIELD_ID from '../../form/constants/fieldId';

function PastforwardAddtionalConditionsField() {
  const { isRenderField, pastForwardAdditionalText, handleChangeAddtionalConditionsInput } =
    useChangePastforwardAddtionalText();

  if (!isRenderField) {
    return null;
  }

  return (
    <div tw="mb-10" id={FIELD_ID.PastforwardAdditionalConditions}>
      <AnimationP tw="text-subhead_02 mb-3">찾는 집의 종류, 거래조건 등을 알려주세요.</AnimationP>
      <TextField variant="outlined">
        <TextField.TextArea
          value={pastForwardAdditionalText}
          onChange={handleChangeAddtionalConditionsInput}
          placeholder="지하철 역에서의 거리, 평형, 주차, 층, 세대수, 학군 등 찾는 조건을 상세하게 적어주세요."
          tw="min-h-[136px] max-h-[136px] placeholder:[font-size: 14px] placeholder:[line-height: 22px] py-4 leading-5"
        />
      </TextField>
      <div tw="text-right mt-1">
        <AnimationSpan tw="text-body_01 text-gray-700 mt-1">{pastForwardAdditionalText.length}</AnimationSpan>
        <AnimationSpan tw="text-body_01 text-gray-500 mt-1 mx-0.5">/</AnimationSpan>
        <AnimationSpan tw="text-body_01 text-gray-700 mt-1">200</AnimationSpan>
      </div>
    </div>
  );
}

export default memo(PastforwardAddtionalConditionsField);
