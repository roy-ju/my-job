import Moment from '@/components/atoms/Moment';

import Numeral from '@/components/atoms/Numeral';

import Table from '@/components/molecules/Table';

import { MyParticipatedListingHistoryList } from '@/services/my/types';

import useMonthlyRentFee from './hooks/useMonthlyRentFee';

import { HistoryTableWrraper, HistoryTableTitle, HistoryTableContainer } from './widget/ListingDetailHistoryWidget';

type HistoryTableProps = {
  isMonthlyRent: boolean;
  list: MyParticipatedListingHistoryList[];
};

export default function HistoryTable({ isMonthlyRent, list }: HistoryTableProps) {
  const { renderMonthlyRentFee } = useMonthlyRentFee();

  return (
    <HistoryTableWrraper>
      <HistoryTableTitle>거래참여 상세 이력</HistoryTableTitle>
      <HistoryTableContainer>
        <Table.Body>
          {list?.map((item) => (
            <Table.Row key={item.created_time} tw="flex">
              <Table.Head tw="min-w-[84px] self-start whitespace-nowrap">{item.description}</Table.Head>
              <Table.Data tw="text-right pl-0">
                <Moment format="YYYY.MM.DD HH:mm">{item.created_time}</Moment>
                <div>
                  {isMonthlyRent ? (
                    <div>
                      <Numeral thousandsSeparated koreanNumber>
                        {item.bidding_trade_or_deposit_price}
                      </Numeral>
                      {' / '}
                      {renderMonthlyRentFee(item.bidding_monthly_rent_fee)}
                    </div>
                  ) : (
                    <Numeral thousandsSeparated koreanNumber>
                      {item.bidding_trade_or_deposit_price}
                    </Numeral>
                  )}
                </div>
              </Table.Data>
            </Table.Row>
          ))}
        </Table.Body>
      </HistoryTableContainer>
    </HistoryTableWrraper>
  );
}
