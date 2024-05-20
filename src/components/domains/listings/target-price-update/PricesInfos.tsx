import Numeral from '@/components/atoms/Numeral';

import { BuyOrRent } from '@/constants/enums';

type PricesInfosProps = {
  listingBuyOrRent?: number;
  listingPrice: number;
  listingMonthlyRentFee: number;
  highestPrice: number;
  highestMonthlyRentFee: number;
};

export default function PricesInfos({
  listingBuyOrRent,
  listingPrice,
  listingMonthlyRentFee,
  highestPrice,
  highestMonthlyRentFee,
}: PricesInfosProps) {
  return (
    <div tw="flex py-7">
      <div tw="flex-1 text-center">
        <div tw="text-info text-gray-700">집주인 희망가</div>
        <div tw="text-b1 font-bold">
          {listingBuyOrRent === BuyOrRent.Wolsae ? (
            <span>
              <Numeral koreanNumber>{listingPrice}</Numeral> / <Numeral koreanNumber>{listingMonthlyRentFee}</Numeral>
            </span>
          ) : (
            <span>
              <Numeral koreanNumber>{listingPrice}</Numeral>
            </span>
          )}
        </div>
      </div>
      <div tw="flex-1 text-center">
        <div tw="text-info text-gray-700">최고 제안가</div>
        <div tw="text-b1 font-bold text-nego-1000">
          {highestPrice ? (
            <div>
              {listingBuyOrRent === BuyOrRent.Wolsae ? (
                <span>
                  <Numeral koreanNumber>{highestPrice}</Numeral> /{' '}
                  <Numeral koreanNumber>{highestMonthlyRentFee}</Numeral>
                </span>
              ) : (
                <span>
                  <Numeral koreanNumber>{highestPrice}</Numeral>
                </span>
              )}
            </div>
          ) : (
            <span>-</span>
          )}
        </div>
      </div>
    </div>
  );
}
