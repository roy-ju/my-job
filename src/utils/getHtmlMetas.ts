import { BuyOrRent } from '@/constants/enums';
import Paths from '@/constants/paths';
import axios from '@/lib/axios';
import Routes from '@/router/routes';
import { ParsedUrlQuery } from 'querystring';
import formatNumberInKorean from './formatNumberInKorean';

export default async function getHtmlMetas(query: ParsedUrlQuery) {
  const targetRoute = query.depth2 ?? query.depth1;

  if (targetRoute === Routes.ListingDetail) {
    try {
      const { data } = await axios.post('/listing/detail', { listing_id: Number(query.listingID) });

      let description = data?.display_address;

      if (data?.listing?.buy_or_rent === BuyOrRent.Wolsae) {
        description = `${formatNumberInKorean(data?.trade_or_deposit_price)}/${formatNumberInKorean(
          data?.monthly_rent_fee,
        )}, ${data?.display_address}`;
      } else {
        description = `${formatNumberInKorean(data?.trade_or_deposit_price)}, ${data?.display_address}`;
      }

      return {
        title: data?.listing?.listing_title,
        description,
        ogImagePath: Paths.DEFAULT_OPEN_GRAPH_IMAGE_2,
      };
    } catch (e) {
      return {};
    }
  }

  if (targetRoute === Routes.DanjiDetail) {
    try {
      const { data } = await axios.post('/danji/get/v2', {
        pnu: query.p,
        realestate_type: Number(query.rt),
      });

      return {
        title: data?.name,
        description: data?.road_name_address ?? data?.jibun_address,
        ogImagePath: Paths.DEFAULT_OPEN_GRAPH_IMAGE_3,
      };
    } catch (e) {
      return {};
    }
  }

  return {};
}
