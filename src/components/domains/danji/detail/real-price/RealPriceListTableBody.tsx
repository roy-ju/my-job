import { BuyOrRent } from '@/constants/enums';

import TradeIcon from '@/assets/icons/trade.svg';

import {
  LabelText,
  ListTableBodyTitle,
  ListTableBodyWrraper,
  ListTableBodyWrraperWithIcon,
} from './widget/RealpriceWidget';

type RealPriceListTableBodyProps = {
  title: string;
  isCancel?: boolean;
  isLabel?: boolean;
  isIcon?: boolean;
  isLeft?: boolean;
  width: string;
  buyOrRent?: number;
  isSpecialColor?: boolean;
  monthlyRentFee?: number;
};

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
}: RealPriceListTableBodyProps) {
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
    <ListTableBodyWrraperWithIcon
      style={{
        minWidth: width,
      }}
    >
      {isLabel ? (
        <LabelText>취소</LabelText>
      ) : (
        <TradeIcon
          style={{
            marginRight: '0.4rem',
            marginLeft: 'auto',
          }}
        />
      )}
      <ListTableBodyTitle style={isCancel ? { color: '#ADB5BD' } : {}}>{title}</ListTableBodyTitle>
    </ListTableBodyWrraperWithIcon>
  ) : (
    <ListTableBodyWrraper style={{ minWidth: width, textAlign: isLeft ? 'left' : 'right' }}>
      <ListTableBodyTitle tw="w-full" style={{ color: isCancel ? '#ADB5BD' : isSpecialColor ? getColor() : '#212529' }}>
        {isLabel && <LabelText>취소</LabelText>}
        {title}
      </ListTableBodyTitle>
    </ListTableBodyWrraper>
  );
}
