import { GetDanjiRealPricesPyoungListResponse } from '@/apis/danji/danjiRealPricesPyoungList';
import { Button } from '@/components/atoms';
import { TextField } from '@/components/molecules';
import React, { useMemo } from 'react';
import CloseContained from '@/assets/icons/close_contained.svg';
import CloseContainedBlack from '@/assets/icons/close_contained_black.svg';

interface AreaProps {
  danjiRealPricesPyoungList?: GetDanjiRealPricesPyoungListResponse['list'];
  selectedGonggeupPyoungList: number[];
  pyoungInputValue: string;
  onChangePyoungField?: React.ChangeEventHandler<HTMLInputElement>;
  onClickPyoungDeleteIcon?: () => void;
  onClickPyoungAddIcon?: (val: string) => void;
  onClickPyoungButton?: (val: number) => void;
  onClickPyoungCloseButton?: (val: number) => void;
}

export default function Area({
  danjiRealPricesPyoungList,
  selectedGonggeupPyoungList,
  pyoungInputValue,
  onChangePyoungField,
  onClickPyoungDeleteIcon,
  onClickPyoungAddIcon,
  onClickPyoungButton,
  onClickPyoungCloseButton,
}: AreaProps) {
  const isShowDanjiRealPricesPyoungList = useMemo(() => {
    if (danjiRealPricesPyoungList && danjiRealPricesPyoungList.length > 0) {
      return true;
    }
    return false;
  }, [danjiRealPricesPyoungList]);

  return (
    <>
      <div tw="px-5 pt-10">
        <span tw="text-b1 font-bold">
          {isShowDanjiRealPricesPyoungList ? '관심있는 평수를 선택해 주세요.' : '관심있는 평수를 입력해 주세요.'}
        </span>
      </div>
      <div tw="flex flex-col pt-4 px-5 gap-4">
        {danjiRealPricesPyoungList && isShowDanjiRealPricesPyoungList && (
          <div tw="flex flex-wrap gap-2 pb-7 [max-width: 280px]">
            {danjiRealPricesPyoungList.map((item) => (
              <Button
                variant="outlined"
                key={item.gonggeup_pyoung}
                size="small"
                tw="[border-radius: 32px] whitespace-nowrap"
                onClick={() => {
                  if (onClickPyoungButton) {
                    onClickPyoungButton(item.gonggeup_pyoung);
                  }
                }}
                selected={selectedGonggeupPyoungList.includes(item.gonggeup_pyoung)}
              >
                {item.gonggeup_pyoung}평
              </Button>
            ))}
          </div>
        )}
      </div>
      <div tw="flex flex-col px-5 pt-7 pb-10 gap-4">
        <span tw="text-b2">직접입력</span>
        <TextField variant="outlined">
          <TextField.NumericInput
            label={pyoungInputValue ? '평 수' : '평수 입력'}
            value={pyoungInputValue}
            onChange={onChangePyoungField}
          />
          <TextField.Trailing tw="flex items-center">
            <Button variant="ghost" size="small" onClick={onClickPyoungDeleteIcon}>
              <CloseContained />
            </Button>
            <Button
              size="small"
              onClick={() => {
                if (onClickPyoungAddIcon) {
                  onClickPyoungAddIcon(pyoungInputValue);
                }
              }}
            >
              확인
            </Button>
          </TextField.Trailing>
        </TextField>
        {selectedGonggeupPyoungList && selectedGonggeupPyoungList.length > 0 && (
          <div tw="flex flex-wrap gap-2 [max-width: 280px]">
            {selectedGonggeupPyoungList.map((item) => (
              <Button
                variant="outlined"
                key={item}
                selected
                tw="px-3 [border-radius: 32px]"
                size="small"
                onClick={() => {
                  if (onClickPyoungCloseButton) {
                    onClickPyoungCloseButton(item);
                  }
                }}
              >
                <CloseContainedBlack style={{ marginRight: '4px' }} />
                {item}평
              </Button>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
