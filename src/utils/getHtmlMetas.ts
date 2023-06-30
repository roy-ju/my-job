/* eslint-disable @typescript-eslint/no-unused-vars */
import { BuyOrRent } from '@/constants/enums';
import Paths from '@/constants/paths';
import axios from '@/lib/axios';
import Routes from '@/router/routes';
import { ParsedUrlQuery } from 'querystring';
import AppConfig from '@/config';
import formatNumberInKorean from './formatNumberInKorean';

export default async function getHtmlMetas(query: ParsedUrlQuery) {
  const defaultMeta = {
    title: AppConfig.title,
    description: AppConfig.description,
    ogImagePath: AppConfig.ogImagePath,
  };

  const targetRoute = query.depth2 ?? query.depth1;

  if (targetRoute === Routes.ListingDetail) {
    try {
      const { data: statusData } = await axios.post('/listing/status', { listing_id: Number(query.listingID) });
      if (statusData?.can_access !== true) {
        return defaultMeta;
      }

      const { data } = await axios.post('/listing/detail', { listing_id: Number(query.listingID) });

      let description = data?.display_address;

      let convertedDescription = '';

      if (data?.listing?.buy_or_rent === BuyOrRent.Wolsae) {
        description = `${formatNumberInKorean(data?.trade_or_deposit_price)}/${formatNumberInKorean(
          data?.monthly_rent_fee,
        )}, ${data?.display_address}`;
      } else {
        description = `${formatNumberInKorean(data?.trade_or_deposit_price)}, ${data?.display_address}`;
      }

      const convertedTitle =
        `${data?.display_address || ''} ${data?.listing?.listing_title}시세, 실거래가, 호가, 매물, 주변 정보` || '';

      if (data?.listing?.buy_or_rent === BuyOrRent.Wolsae) {
        convertedDescription = `${data?.display_address || ''} ${
          data?.listing?.listing_title
        } / ${formatNumberInKorean(data?.trade_or_deposit_price)}/${formatNumberInKorean(
          data?.monthly_rent_fee,
        )}의 매물 기본정보, 실거래가/시세, 호가, 매매/전세/월세/원룸/투룸 매물, 주변학군/생활/교통 정보를 보여드립니다.`;
      } else {
        convertedDescription = `${data?.display_address || ''} ${
          data?.listing?.listing_title
        } / ${formatNumberInKorean(
          data?.trade_or_deposit_price,
        )}의 매물 기본정보, 실거래가/시세, 호가, 매매/전세/월세/원룸/투룸 매물, 주변 학군/생활/교통 정보를 보여드립니다.`;
      }

      return {
        ogTitle: data?.listing?.listing_title ?? '',
        ogDescription: description ?? '',
        title: convertedTitle ?? '',
        description: convertedDescription ?? '',
        ogImagePath: Paths.DEFAULT_OPEN_GRAPH_IMAGE_2,
        ogSiteName: process.env.NEXT_PUBLIC_APP_ENVIRONMENT === 'test' ? '네고시오(TEST)' : '네고시오',
        ogType: 'website',
        keyWords: `${data?.listing?.listing_title || ''}, ${
          process.env.NEXT_PUBLIC_APP_ENVIRONMENT === 'test' ? '네고시오(TEST)' : '네고시오'
        }, 부동산, 아파트 실거래가, 아파트 시세, 오피스텔 실거래가, 오피스텔 시세, 실거래가, 시세, 호가, 단지, 매매, 전세, 월세, 원룸, 투룸, 교통, 환경, 주변`,
      };
    } catch (e) {
      return defaultMeta;
    }
  }

  if (targetRoute === Routes.DanjiDetail) {
    try {
      const { data } = await axios.post('/danji/get/v2', {
        pnu: query.p,
        realestate_type: Number(query.rt),
      });

      const roadAddress = data?.road_name_address ?? data?.jibun_address ?? '';
      const convertedTitle = `${roadAddress} ${data.name}'시세, 실거래가, 단지, 매물, 주변 정보`;
      const convertedDescription =
        `'${roadAddress || ''} ${
          data?.name
        }, 단지 기본정보, 실거래가/시세, 호가, 매물, 주변학군/생활/교통 정보를 보여드립니다.` || '';

      return {
        title: convertedTitle ?? '',
        description: convertedDescription ?? '',
        ogTitle: data?.name ?? '',
        ogDescription: data?.road_name_address ?? data?.jibun_address ?? '',
        ogImagePath: Paths.DEFAULT_OPEN_GRAPH_IMAGE_3,
        ogSiteName: process.env.NEXT_PUBLIC_APP_ENVIRONMENT === 'test' ? '네고시오(TEST)' : '네고시오',
        ogType: 'website',
        keyWords: `${data?.name || ''}, ${
          process.env.NEXT_PUBLIC_APP_ENVIRONMENT === 'test' ? '네고시오(TEST)' : '네고시오'
        }, 부동산, 아파트 실거래가, 아파트 시세, 오피스텔 실거래가, 오피스텔 시세, 실거래가, 시세, 호가, 단지, 매매, 전세, 월세, 원룸, 투룸, 교통, 환경, 주변`,
      };
    } catch (e) {
      return defaultMeta;
    }
  }

  return defaultMeta;
}
