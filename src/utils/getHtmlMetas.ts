// import Routes from '@/router/routes';
import axios from '@/lib/axios';
import Routes from '@/router/routes';
import { ParsedUrlQuery } from 'querystring';

export default async function getHtmlMetas(query: ParsedUrlQuery) {
  const targetRoute = query.depth2 ?? query.depth1;

  if (targetRoute === Routes.ListingDetail) {
    try {
      const { data } = await axios.post('/listing/detail', { listing_id: Number(query.listingID) });

      return {
        title: data?.listing?.listing_title,
        description: data?.display_address,
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
      };
    } catch (e) {
      return {};
    }
  }

  return {};
}
