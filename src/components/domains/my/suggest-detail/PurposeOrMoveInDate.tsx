import { useMemo } from 'react';

import moment from 'moment';

import { BuyOrRent } from '@/constants/enums';

import { TimeTypeString } from '@/constants/strings';

import formatNumberInKorean from '@/utils/formatNumberInKorean';

type PurposeOrMoveInDateProps = {
  buyOrRent?: string;
  purpose?: string;
  investAmount?: number;
  moveInDate?: string;
  moveInDateType?: number;
};

export default function PurposeOrMoveInDate({
  buyOrRent,
  purpose,
  investAmount = 0,
  moveInDate,
  moveInDateType = 0,
}: PurposeOrMoveInDateProps) {
  const title = useMemo(() => {
    if (!buyOrRent) return '';

    if (buyOrRent === BuyOrRent.Buy.toString()) {
      return '거래목적';
    }

    return '희망 입주 날짜';
  }, [buyOrRent]);

  const subTitle = useMemo(() => {
    if (buyOrRent === BuyOrRent.Buy.toString() && purpose === '투자' && investAmount) {
      return `${purpose} / ${formatNumberInKorean(investAmount)}`;
    }

    if (buyOrRent === BuyOrRent.Buy.toString() && purpose === '실거주' && moveInDate && moveInDateType) {
      return `${purpose} / ${moment(moveInDate).format('YYYY.MM.DD')} ${TimeTypeString[moveInDateType]} 입주`;
    }

    return `${moment(moveInDate).format('YYYY.MM.DD')} ${TimeTypeString[moveInDateType]} 입주`;
  }, [buyOrRent, investAmount, moveInDate, moveInDateType, purpose]);

  return (
    <div>
      <p tw="text-subhead_02 text-gray-800">{title}</p>
      <p tw="text-body_02 text-gray-700">{subTitle}</p>
    </div>
  );
}
