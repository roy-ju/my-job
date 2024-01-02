import { BuyOrRent } from '@/constants/enums';

import TradeIcon from '@/assets/icons/trade.svg';

export default function RealPriceListTableBody({
  title,
  isCancel = false,
  isLabel = false,
  isIcon = false,
  isLeft = false,
  width,
  buyOrRent = 1,
  isSpecialColor = false,
  monthlyRentFee,
}: {
  title: string;
  isCancel?: boolean;
  isLabel?: boolean;
  isIcon?: boolean;
  isLeft?: boolean;
  width: string;
  buyOrRent?: number;
  isSpecialColor?: boolean;
  monthlyRentFee?: number;
}) {
  const getColor = () => {
    if (buyOrRent === BuyOrRent.Buy) {
      return '#5F3DC4';
    }

    if (monthlyRentFee && monthlyRentFee > 0) {
      return '#009F40';
    }

    return '#CA2F0B';
  };

  return isIcon ? (
    <div
      style={{
        width: '100%',
        minWidth: width,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        textAlign: 'right',
      }}
    >
      {isLabel ? (
        <div tw="[display: inline] [min-width: 27px] [max-width: 27px] h-4 text-white py-0.5 px-1 bg-gray-700 [font-size: 11px] [line-height: 12px] font-bold rounded-2xl mr-1 whitespace-nowrap">
          취소
        </div>
      ) : (
        <TradeIcon
          style={{
            marginRight: '0.4rem',
            marginLeft: 'auto',
          }}
        />
      )}
      <span tw="text-b2 font-normal" style={isCancel ? { color: '#ADB5BD' } : {}}>
        {title}
      </span>
    </div>
  ) : (
    <div
      tw="flex flex-row [text-align: right]"
      style={{ width: '100%', minWidth: width, textAlign: isLeft ? 'left' : 'right' }}
    >
      <span
        tw="w-full text-b2 font-normal"
        style={{ color: isCancel ? '#ADB5BD' : isSpecialColor ? getColor() : '#212529' }}
      >
        {isLabel && (
          <div tw="[display: inline] [min-width: 27px] [max-width: 27px] h-4 text-white py-0.5 px-1 bg-gray-700 [font-size: 11px] [line-height: 12px] font-bold rounded-2xl mr-1 whitespace-nowrap">
            취소
          </div>
        )}
        {title}
      </span>
    </div>
  );
}
