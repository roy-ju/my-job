/* eslint-disable no-restricted-globals */
import { TextField } from '@/components/molecules';
import CloseContained from '@/assets/icons/close_contained.svg';
import useControlled from '@/hooks/useControlled';
import { Button } from '@/components/atoms';
import { BuyOrRent } from '@/constants/enums';
import { useMemo } from 'react';
import { convertArea } from '@/utils/fotmat';

const DirectionList = ['동', '서', '남', '북', '남동', '남서', '북서', '북동'];

interface Props {
  address?: string;

  buyOrRent?: number;
  onChangeBuyOrRent?: (val: number | undefined) => void;

  tradePrice?: string;
  onChangePrice?: (val: string) => void;

  monthlyRentFee?: string;
  onChangeMonthlyRentFee?: (val: string) => void;

  floor?: string;
  onChangeFloor?: (val: string) => void;

  pyoungArea?: string;
  onChangePyoungArea?: (val: string) => void;

  meterArea?: string;
  onChangeMeterArea?: (val: string) => void;

  direction?: string;
  onChangeDirection?: (val: string) => void;

  description?: string;
  onChangeDescription?: (val: string) => void;
}

export default function SuggestForm({
  address,

  buyOrRent,
  onChangeBuyOrRent,

  tradePrice: tradePriceProp,
  onChangePrice,

  monthlyRentFee: monthlyRentFeeProp,
  onChangeMonthlyRentFee,

  floor: floorProp,
  onChangeFloor,

  pyoungArea: pyoungAreaProp,
  onChangePyoungArea,

  meterArea: meterAreaProp,
  onChangeMeterArea,

  direction,
  onChangeDirection,

  description: descriptionProp,
  onChangeDescription,
}: Props) {
  const [tradePrice, setTradePrice] = useControlled({
    controlled: tradePriceProp,
    default: '',
  });

  const [monthlyRentFee, setMonthlyRentFee] = useControlled({
    controlled: monthlyRentFeeProp,
    default: '',
  });

  const [floor, setFloor] = useControlled({
    controlled: floorProp,
    default: '',
  });

  const [pyoungArea, setPyoungArea] = useControlled({
    controlled: pyoungAreaProp,
    default: '',
  });

  const [meterArea, setMeterArea] = useControlled({
    controlled: meterAreaProp,
    default: '',
  });

  const [description, setDescription] = useControlled({
    controlled: descriptionProp,
    default: '',
  });

  const label = useMemo(() => {
    if (buyOrRent === BuyOrRent.Jeonsae) return '보증금';

    if (buyOrRent === BuyOrRent.Wolsae) return '보증금';

    return '매매가';
  }, [buyOrRent]);

  return (
    <div tw="px-5 pt-10">
      <h1 tw="mb-7 text-h2 font-bold">내 매물 추천하기</h1>
      <h2 tw="mb-1 text-b1 font-bold">추천할 매물 주소를 확인해 주세요.</h2>
      <h2 tw="mb-1 text-info text-gray-700">단지의 경우 상세한 주소는 동까지만 공개해주시는 것이 좋아요.</h2>

      <TextField variant="outlined" tw="mt-4">
        <TextField.Input label="매물 주소" readOnly value={address || ''} disabled />
      </TextField>

      <div tw="mt-10">
        <h2 tw="mb-4 text-b1 font-bold">거래 종류를 선택해 주세요.</h2>
        <div tw="flex items-center gap-3">
          <Button
            variant="outlined"
            size="bigger"
            tw="flex-1"
            selected={buyOrRent === BuyOrRent.Buy}
            onClick={() => {
              onChangeBuyOrRent?.(BuyOrRent.Buy);
            }}
          >
            매매
          </Button>
          <Button
            variant="outlined"
            size="bigger"
            tw="flex-1"
            selected={buyOrRent === BuyOrRent.Jeonsae}
            onClick={() => {
              onChangeBuyOrRent?.(BuyOrRent.Jeonsae);
            }}
          >
            전세
          </Button>
          <Button
            variant="outlined"
            size="bigger"
            tw="flex-1"
            selected={buyOrRent === BuyOrRent.Wolsae}
            onClick={() => {
              onChangeBuyOrRent?.(BuyOrRent.Wolsae);
            }}
          >
            월세
          </Button>
        </div>

        <div tw="flex flex-col gap-4 mt-7">
          <div>
            <TextField variant="outlined">
              <TextField.PriceInput
                label={label}
                value={tradePrice}
                onChange={(e) => {
                  setTradePrice(e.target.value as string);
                  onChangePrice?.(e.target.value as string);
                }}
              />
              {tradePrice && (
                <TextField.Trailing
                  tw="absolute right-12 bottom-3 cursor-pointer"
                  onClick={() => {
                    setTradePrice('');
                    onChangePrice?.('');
                  }}
                >
                  <CloseContained />
                </TextField.Trailing>
              )}
            </TextField>
            <TextField.PriceHelperMessage>{tradePrice}</TextField.PriceHelperMessage>
          </div>

          {buyOrRent === BuyOrRent.Wolsae && (
            <div>
              <TextField variant="outlined">
                <TextField.PriceInput
                  label="월차임"
                  value={monthlyRentFee}
                  onChange={(e) => {
                    setMonthlyRentFee(e.target.value as string);
                    onChangeMonthlyRentFee?.(e.target.value as string);
                  }}
                />
                {monthlyRentFee && (
                  <TextField.Trailing
                    tw="absolute right-12 bottom-3 cursor-pointer"
                    onClick={() => {
                      setMonthlyRentFee('');
                      onChangeMonthlyRentFee?.('');
                    }}
                  >
                    <CloseContained />
                  </TextField.Trailing>
                )}
              </TextField>
              <TextField.PriceHelperMessage>{monthlyRentFee}</TextField.PriceHelperMessage>
            </div>
          )}
        </div>
      </div>

      <div tw="mt-10">
        <h2 tw="mb-4 text-b1 font-bold">매물의 층을 입력해 주세요. (선택)</h2>
        <TextField variant="outlined" tw="mt-4">
          <TextField.NumericInput
            label="층"
            value={floor || ''}
            onChange={(e) => {
              setFloor(e.target.value as string);
              onChangeFloor?.(e.target.value as string);
            }}
          />
          {floor && (
            <TextField.Trailing
              tw="absolute [right: 32px] bottom-3 cursor-pointer"
              onClick={() => {
                setFloor('');
                onChangeFloor?.('');
              }}
            >
              <CloseContained />
            </TextField.Trailing>
          )}
          {floor && (
            <TextField.Leading tw="absolute [right: 12px] bottom-3 leading-4 cursor-pointer p-0">층</TextField.Leading>
          )}
        </TextField>
      </div>

      <div tw="mt-10">
        <h2 tw="mb-4 text-b1 font-bold">전용 면적을 입력해 주세요. (선택)</h2>
        <div tw="flex gap-3">
          <TextField variant="outlined" tw="mt-4">
            <TextField.NumericInput
              label="평수"
              value={pyoungArea || ''}
              onChange={(e) => {
                setPyoungArea(e.target.value as string);
                onChangePyoungArea?.(e.target.value as string);

                if (!e.target.value) {
                  setMeterArea('');
                  onChangeMeterArea?.('');
                  return;
                }

                if (!isNaN(Number(e.target.value)).valueOf() && Number(e.target.value) > 0) {
                  setMeterArea(convertArea({ type: 'pyoungToMeter', value: e.target.value as string }));
                  onChangeMeterArea?.(convertArea({ type: 'pyoungToMeter', value: e.target.value as string }));
                }
              }}
            />
            {pyoungArea && (
              <TextField.Trailing
                tw="absolute [right: 32px] bottom-3 cursor-pointer"
                onClick={() => {
                  setPyoungArea('');
                  setMeterArea('');

                  onChangePyoungArea?.('');
                  onChangeMeterArea?.('');
                }}
              >
                <CloseContained />
              </TextField.Trailing>
            )}
            {pyoungArea && (
              <TextField.Leading tw="absolute [right: 12px] bottom-3 leading-4 cursor-pointer p-0">
                평
              </TextField.Leading>
            )}
          </TextField>
          <TextField variant="outlined" tw="mt-4">
            <TextField.NumericInput
              label="면적"
              value={meterArea || ''}
              onChange={(e) => {
                setMeterArea(e.target.value as string);
                onChangeMeterArea?.(e.target.value as string);

                if (!e.target.value) {
                  setPyoungArea('');
                  onChangePyoungArea?.('');
                  return;
                }

                if (!isNaN(Number(e.target.value)).valueOf() && Number(e.target.value) > 0) {
                  setPyoungArea(convertArea({ type: 'meterToPyoung', value: e.target.value as string }));
                  onChangePyoungArea?.(convertArea({ type: 'meterToPyoung', value: e.target.value as string }));
                }
              }}
            />
            {meterArea && (
              <TextField.Trailing
                tw="absolute [right: 32px] bottom-3 cursor-pointer"
                onClick={() => {
                  setMeterArea('');
                  setPyoungArea('');

                  onChangeMeterArea?.('');
                  onChangePyoungArea?.('');
                }}
              >
                <CloseContained />
              </TextField.Trailing>
            )}

            {meterArea && (
              <TextField.Leading tw="absolute [right: 12px] bottom-3 leading-4 cursor-pointer p-0">
                ㎡
              </TextField.Leading>
            )}
          </TextField>
        </div>
      </div>

      <div tw="mt-10">
        <h2 tw="mb-1 text-b1 font-bold">방향을 선택해 주세요. (선택)</h2>
        <h2 tw="mb-4 text-info text-gray-700">거실 기준으로 입력해 주세요.</h2>
        <div tw="flex flex-wrap gap-2">
          {DirectionList.map((item) => (
            <Button
              key={item}
              size="small"
              variant="outlined"
              selected={item === direction}
              value={item}
              tw="flex-1 [min-width: 78px] [max-width: 78px] [width: 78px] text-b2 leading-4"
              onClick={(e) => {
                onChangeDirection?.(e?.currentTarget.value as string);
              }}
            >
              {item}
            </Button>
          ))}
        </div>
      </div>

      <div tw="mt-10 pb-10">
        <h2 tw="mb-4 text-b1 font-bold">추천 의견을 입력해 주세요.</h2>
        <TextField variant="outlined">
          <TextField.TextArea
            placeholder="추천 의견은 최대 200자까지 입력할 수 있어요."
            value={description}
            onChange={(e) => {
              setDescription(e.currentTarget.value as string);
              onChangeDescription?.(e.currentTarget.value as string);
            }}
            tw="min-h-[76px] py-4 px-5 [font-size: 14px] [line-height: 22px]"
            spellCheck="false"
          />
        </TextField>
        <p tw="[text-align: right] mt-1.5 text-info [letter-spacing: -0.4px]">{description.length} / 200</p>
      </div>
    </div>
  );
}
