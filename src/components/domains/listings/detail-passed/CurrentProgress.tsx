import Numeral from '@/components/atoms/Numeral';

import Moment from '@/components/atoms/Moment';

import { ListingStatus } from '@/constants/enums';
import {
  CurrentProgressWrraper,
  CurrentProgressTitle,
  ColumnGap2,
  BodyO2Text,
  SmallTitle,
} from './widget/ListingDetailPassedWidget';

export default function CurrentProgress({
  listingStatus,
  statusText,
  contractTradeOrDepositPrice,
  contractMonthlyRentFee,
  contractCompletionDate,
}: {
  listingStatus: number;
  statusText: string;
  contractTradeOrDepositPrice: number;
  contractMonthlyRentFee: number;
  contractCompletionDate: string;
}) {
  const renderPrice = () => {
    if (contractMonthlyRentFee) {
      return (
        <>
          <Numeral thousandsSeparated koreanNumber>
            {contractTradeOrDepositPrice}
          </Numeral>
          {' / '}
          <Numeral thousandsSeparated koreanNumber>
            {contractMonthlyRentFee}
          </Numeral>
        </>
      );
    }
    return (
      <Numeral thousandsSeparated koreanNumber>
        {contractTradeOrDepositPrice}
      </Numeral>
    );
  };

  return (
    <CurrentProgressWrraper>
      <CurrentProgressTitle>진행 상황</CurrentProgressTitle>

      <ColumnGap2>
        {ListingStatus.ContractComplete === listingStatus && (
          <>
            <BodyO2Text>
              <SmallTitle>체결일</SmallTitle>
              <Moment format="YYYY.MM.DD">{contractCompletionDate}</Moment>
            </BodyO2Text>
            <BodyO2Text>
              <SmallTitle>체결가</SmallTitle>
              <div>{renderPrice()}</div>
            </BodyO2Text>
          </>
        )}

        <BodyO2Text>
          <SmallTitle>상태</SmallTitle>
          <span tw="text-nego-800">{statusText}</span>
        </BodyO2Text>
      </ColumnGap2>
    </CurrentProgressWrraper>
  );
}
