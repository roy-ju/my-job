/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useCallback, useState } from 'react';

import { useRouter } from 'next/router';

import { customAlphabet } from 'nanoid';

import { Button } from '@/components/atoms';

import useIsomorphicLayoutEffect from '@/hooks/useIsomorphicLayoutEffect';

import { formatNumberInKorean } from '@/utils';

import { checkPlatform } from '@/utils/checkPlatform';

import { cuttingDot, minDigits } from '@/utils/fotmat';

import { BuyOrRent, describeJeonsaeWolsaeSame } from '@/constants/enums';

import { GetDanjiDetailResponse } from '@/apis/danji/danjiDetail';

import { useAPI_DanjiRecentlyRealPricesListAll } from '@/apis/danji/danjiRecentlyList';

import Routes from '@/router/routes';

const ListItemComponent = ({
  anchorURL,
  title,
  saedaeCount,
  price,
  area,
  date,
  onClickItem,
}: {
  anchorURL?: string;
  title: string;
  saedaeCount: string;
  price: string;
  area: string;
  date: string;
  onClickItem: () => void;
}) => (
  <div tw="py-3 px-5 [border-bottom: 1px solid #E4E4EF] hover:bg-gray-300 cursor-pointer" onClick={onClickItem}>
    <div tw="flex flex-row items-center justify-between mb-1.5">
      {anchorURL ? (
        <a
          onClick={(e) => {
            e.preventDefault();
            onClickItem?.();
          }}
          href={anchorURL}
          tw="text-b2 [line-height: 1] max-w-[265px] [text-overflow: ellipsis] overflow-hidden whitespace-nowrap [text-decoration: underline]"
        >
          {title}
        </a>
      ) : (
        <span tw="text-b2 [line-height: 1] max-w-[265px] [text-overflow: ellipsis] overflow-hidden whitespace-nowrap [text-decoration: underline]">
          {title}
        </span>
      )}
      <span tw="text-b2 [line-height: 1] text-nego [text-align: center]">{price}</span>
    </div>
    <div tw="flex flex-row items-center">
      <span tw="min-w-[60px] text-info text-gray-700 [line-height: 14px] [text-align: center]">{date}</span>
      <div tw="w-px h-2 bg-gray-300 mx-2" />
      <span tw="min-w-[60px] text-info text-gray-700 [line-height: 14px] [text-align: center]">{area}</span>
      <div tw="w-px h-2 bg-gray-300 mx-2" />
      <span tw="min-w-[60px] text-info text-gray-700 [line-height: 14px]  [text-align: center]">{saedaeCount}</span>
    </div>
  </div>
);

export function RealPriceAllListWrraper({ danji, buyOrRent }: { danji?: GetDanjiDetailResponse; buyOrRent?: number }) {
  const nextRouter = useRouter();

  const [platform, setPlatForm] = useState<string>('');

  const nanoId = customAlphabet('1234567890abcdefgh');

  const { list, isShowMoreButton, setSize } = useAPI_DanjiRecentlyRealPricesListAll({
    danjiId: danji?.danji_id,
    realestateType: danji?.type ? danji.type : null,
    buyOrRent,
  });

  const priceUtil = useCallback((pr: number, mrf?: number, bor?: number) => {
    if (bor === BuyOrRent.Buy) {
      return formatNumberInKorean(pr);
    }
    if (bor === BuyOrRent.Jeonsae) {
      if (typeof mrf === 'number' && mrf > 0) {
        return `${formatNumberInKorean(pr)} / ${formatNumberInKorean(mrf)}`;
      }
      return formatNumberInKorean(pr);
    }

    if (bor === BuyOrRent.Wolsae && typeof mrf === 'number' && mrf >= 0) {
      return `${formatNumberInKorean(pr)} / ${formatNumberInKorean(mrf)}`;
    }

    return '-';
  }, []);

  useIsomorphicLayoutEffect(() => {
    if (checkPlatform() === 'pc') {
      setPlatForm('pc');
    }
    if (checkPlatform() === 'mobile') {
      setPlatForm('mobile');
    }
  }, []);

  const onClickItem = useCallback(
    (danjiID: number) => {
      if (platform === 'pc') {
        // nextRouter.push(`/${Routes.DanjiDetail}?danjiID=${danjiID}`);

        nextRouter.push(`/${Routes.DanjiDetail}/${danjiID}`);
      }
      if (platform === 'mobile') {
        // nextRouter.push(`/${Routes.EntryMobile}/${Routes.DanjiDetail}?danjiID=${danjiID}`);

        nextRouter.push(`/${Routes.EntryMobile}/${Routes.DanjiDetail}/${danjiID}`);
      }
    },
    [nextRouter, platform],
  );

  return (
    <div tw="py-10">
      <div tw="mb-5 px-5">
        <span tw="font-bold text-b1 [line-height: 19px]">
          {danji?.sido_name} {danji?.sigungu_name} 최근 실거래 리스트 ({describeJeonsaeWolsaeSame(buyOrRent)})
        </span>
      </div>
      {list &&
        list.length > 0 &&
        list.map((item) => (
          <ListItemComponent
            onClickItem={() => onClickItem(item.danji_id)}
            key={nanoId()}
            title={item.name}
            saedaeCount={item.saedae_count ? `${Number(item.saedae_count).toLocaleString()} 세대` : '- 세대'}
            price={priceUtil(item.price, item.monthly_rent_fee, item.buy_or_rent)}
            area={`전용 ${cuttingDot(item.jeonyong_area)}㎡`}
            date={`${item.year}.${minDigits(+item.month, 2)}.${minDigits(+item.day, 2)}`}
            anchorURL={platform === 'pc' ? `/${Routes.DanjiDetail}?danjiID=${item.danji_id}` : undefined}
          />
        ))}
      {isShowMoreButton && (
        <div tw="px-5">
          <Button
            variant="outlined"
            tw="mt-4 w-full"
            onClick={() => {
              setSize((prev) => prev + 1);
            }}
          >
            더보기
          </Button>
        </div>
      )}
    </div>
  );
}
