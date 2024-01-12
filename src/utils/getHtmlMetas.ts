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

  if (targetRoute === Routes.PAST_RecommedationGuide || targetRoute === Routes.SuggestGuide) {
    return {
      title: `매물 추천받기 가이드 | ${
        process.env.NEXT_PUBLIC_APP_ENVIRONMENT === 'test'
          ? '(TEST) 부동산 가격협상 앱 네고시오'
          : '부동산 가격협상 앱 네고시오'
      }`,
      description: '매물 추천받기 서비스를 이용해 보세요.',
      ogTitle: '매물 추천받기 가이드',
      ogDescription: '매물 추천받기 서비스를 이용해 보세요.',
      ogImagePath: AppConfig.ogImagePath,
      ogSiteName: process.env.NEXT_PUBLIC_APP_ENVIRONMENT === 'test' ? '네고시오(TEST)' : '네고시오',
      ogType: 'website',
      keyWords: `${
        process.env.NEXT_PUBLIC_APP_ENVIRONMENT === 'test' ? '네고시오(TEST)' : '네고시오'
      }, 부동산, 아파트 실거래가, 아파트 시세, 오피스텔 실거래가, 오피스텔 시세, 실거래가, 시세, 호가, 단지, 매매, 전세, 월세, 원룸, 투룸, 교통, 환경, 주변`,
    };
  }

  if (
    targetRoute === Routes.SuggestForm ||
    targetRoute === Routes.PAST_SuggestRegionalForm ||
    targetRoute === Routes.PAST_SuggestRegionalSummary ||
    targetRoute === Routes.PAST_DanjiRecommendation ||
    targetRoute === Routes.PAST_DanjiRecommendationSummary
  ) {
    return {
      title: `매물 추천받기 | ${
        process.env.NEXT_PUBLIC_APP_ENVIRONMENT === 'test'
          ? '(TEST) 부동산 가격협상 앱 네고시오'
          : '부동산 가격협상 앱 네고시오'
      }`,
      description: '매물 추천받기 서비스를 이용해 보세요.',
      ogTitle: '매물 추천받기',
      ogDescription: '매물 추천받기 서비스를 이용해 보세요.',
      ogImagePath: AppConfig.ogImagePath,
      ogSiteName: process.env.NEXT_PUBLIC_APP_ENVIRONMENT === 'test' ? '네고시오(TEST)' : '네고시오',
      ogType: 'website',
      keyWords: `${
        process.env.NEXT_PUBLIC_APP_ENVIRONMENT === 'test' ? '네고시오(TEST)' : '네고시오'
      }, 부동산, 아파트 실거래가, 아파트 시세, 오피스텔 실거래가, 오피스텔 시세, 실거래가, 시세, 호가, 단지, 매매, 전세, 월세, 원룸, 투룸, 교통, 환경, 주변`,
    };
  }

  if (
    targetRoute === Routes.SuggestForm ||
    targetRoute === Routes.PAST_RecommendationForm ||
    targetRoute === Routes.PAST_SuggestRegionalForm ||
    targetRoute === Routes.PAST_DanjiRecommendation
  ) {
    return {
      title: `매물 구해요 | ${
        process.env.NEXT_PUBLIC_APP_ENVIRONMENT === 'test'
          ? '(TEST) 부동산 가격협상 앱 네고시오'
          : '부동산 가격협상 앱 네고시오'
      }`,
      description: '매물 구해요 서비스를 이용해 보세요.',
      ogTitle: '매물 구해요',
      ogDescription: '매물 구해요 서비스를 이용해 보세요.',
      ogImagePath: AppConfig.ogImagePath,
      ogSiteName: process.env.NEXT_PUBLIC_APP_ENVIRONMENT === 'test' ? '네고시오(TEST)' : '네고시오',
      ogType: 'website',
      keyWords: `${
        process.env.NEXT_PUBLIC_APP_ENVIRONMENT === 'test' ? '네고시오(TEST)' : '네고시오'
      }, 부동산, 아파트 실거래가, 아파트 시세, 오피스텔 실거래가, 오피스텔 시세, 실거래가, 시세, 호가, 단지, 매매, 전세, 월세, 원룸, 투룸, 교통, 환경, 주변`,
    };
  }

  if (
    targetRoute === Routes.My ||
    targetRoute === Routes.MyAddress ||
    targetRoute === Routes.MyAddressDetail ||
    targetRoute === Routes.MyAddressVerifying ||
    targetRoute === Routes.MyDetail
  ) {
    return {
      title: `마이페이지 | ${
        process.env.NEXT_PUBLIC_APP_ENVIRONMENT === 'test'
          ? '(TEST) 부동산 가격협상 앱 네고시오'
          : '부동산 가격협상 앱 네고시오'
      }`,
      description: '단지 기본정보, 실거래가/시세, 호가, 매물, 주변학군/생활/교통 정보를 보여드립니다.',
      ogTitle: '마이페이지',
      ogDescription: '단지 기본정보, 실거래가/시세, 호가, 매물, 주변학군/생활/교통 정보를 보여드립니다.',
      ogImagePath: AppConfig.ogImagePath,
      ogSiteName: process.env.NEXT_PUBLIC_APP_ENVIRONMENT === 'test' ? '네고시오(TEST)' : '네고시오',
      ogType: 'website',
      keyWords: `${
        process.env.NEXT_PUBLIC_APP_ENVIRONMENT === 'test' ? '네고시오(TEST)' : '네고시오'
      }, 부동산, 아파트 실거래가, 아파트 시세, 오피스텔 실거래가, 오피스텔 시세, 실거래가, 시세, 호가, 단지, 매매, 전세, 월세, 원룸, 투룸, 교통, 환경, 주변`,
    };
  }

  if (targetRoute === Routes.MyRegisteredListingList) {
    return {
      title: `나의 매물 현황 | ${
        process.env.NEXT_PUBLIC_APP_ENVIRONMENT === 'test'
          ? '(TEST) 부동산 가격협상 앱 네고시오'
          : '부동산 가격협상 앱 네고시오'
      }`,
      description: '단지 기본정보, 실거래가/시세, 호가, 매물, 주변학군/생활/교통 정보를 보여드립니다.',
      ogTitle: '마이페이지',
      ogDescription: '단지 기본정보, 실거래가/시세, 호가, 매물, 주변학군/생활/교통 정보를 보여드립니다.',
      ogImagePath: AppConfig.ogImagePath,
      ogSiteName: process.env.NEXT_PUBLIC_APP_ENVIRONMENT === 'test' ? '네고시오(TEST)' : '네고시오',
      ogType: 'website',
      keyWords: `${
        process.env.NEXT_PUBLIC_APP_ENVIRONMENT === 'test' ? '네고시오(TEST)' : '네고시오'
      }, 부동산, 아파트 실거래가, 아파트 시세, 오피스텔 실거래가, 오피스텔 시세, 실거래가, 시세, 호가, 단지, 매매, 전세, 월세, 원룸, 투룸, 교통, 환경, 주변`,
    };
  }

  if (targetRoute === Routes.MyParticipatingListings) {
    return {
      title: `나의 거래 현황 | ${
        process.env.NEXT_PUBLIC_APP_ENVIRONMENT === 'test'
          ? '(TEST) 부동산 가격협상 앱 네고시오'
          : '부동산 가격협상 앱 네고시오'
      }`,
      description: '단지 기본정보, 실거래가/시세, 호가, 매물, 주변학군/생활/교통 정보를 보여드립니다.',
      ogTitle: '마이페이지',
      ogDescription: '단지 기본정보, 실거래가/시세, 호가, 매물, 주변학군/생활/교통 정보를 보여드립니다.',
      ogImagePath: AppConfig.ogImagePath,
      ogSiteName: process.env.NEXT_PUBLIC_APP_ENVIRONMENT === 'test' ? '네고시오(TEST)' : '네고시오',
      ogType: 'website',
      keyWords: `${
        process.env.NEXT_PUBLIC_APP_ENVIRONMENT === 'test' ? '네고시오(TEST)' : '네고시오'
      }, 부동산, 아파트 실거래가, 아파트 시세, 오피스텔 실거래가, 오피스텔 시세, 실거래가, 시세, 호가, 단지, 매매, 전세, 월세, 원룸, 투룸, 교통, 환경, 주변`,
    };
  }

  if (targetRoute === Routes.Login) {
    return {
      title: `로그인 | ${
        process.env.NEXT_PUBLIC_APP_ENVIRONMENT === 'test'
          ? '(TEST) 부동산 가격협상 앱 네고시오'
          : '부동산 가격협상 앱 네고시오'
      }`,
      description: '단지 기본정보, 실거래가/시세, 호가, 매물, 주변학군/생활/교통 정보를 보여드립니다.',
      ogTitle: '로그인',
      ogDescription: '단지 기본정보, 실거래가/시세, 호가, 매물, 주변학군/생활/교통 정보를 보여드립니다.',
      ogImagePath: AppConfig.ogImagePath,
      ogSiteName: process.env.NEXT_PUBLIC_APP_ENVIRONMENT === 'test' ? '네고시오(TEST)' : '네고시오',
      ogType: 'website',
      keyWords: `${
        process.env.NEXT_PUBLIC_APP_ENVIRONMENT === 'test' ? '네고시오(TEST)' : '네고시오'
      }, 부동산, 아파트 실거래가, 아파트 시세, 오피스텔 실거래가, 오피스텔 시세, 실거래가, 시세, 호가, 단지, 매매, 전세, 월세, 원룸, 투룸, 교통, 환경, 주변`,
    };
  }

  if (targetRoute === Routes.Deregister) {
    return {
      title: `탈퇴하기 | ${
        process.env.NEXT_PUBLIC_APP_ENVIRONMENT === 'test'
          ? '(TEST) 부동산 가격협상 앱 네고시오'
          : '부동산 가격협상 앱 네고시오'
      }`,
      description: '단지 기본정보, 실거래가/시세, 호가, 매물, 주변학군/생활/교통 정보를 보여드립니다.',
      ogTitle: '탈퇴하기',
      ogDescription: '단지 기본정보, 실거래가/시세, 호가, 매물, 주변학군/생활/교통 정보를 보여드립니다.',
      ogImagePath: AppConfig.ogImagePath,
      ogSiteName: process.env.NEXT_PUBLIC_APP_ENVIRONMENT === 'test' ? '네고시오(TEST)' : '네고시오',
      ogType: 'website',
      keyWords: `${
        process.env.NEXT_PUBLIC_APP_ENVIRONMENT === 'test' ? '네고시오(TEST)' : '네고시오'
      }, 부동산, 아파트 실거래가, 아파트 시세, 오피스텔 실거래가, 오피스텔 시세, 실거래가, 시세, 호가, 단지, 매매, 전세, 월세, 원룸, 투룸, 교통, 환경, 주변`,
    };
  }

  if (targetRoute === Routes.MyFavoriteList) {
    return {
      title: `관심목록 | ${
        process.env.NEXT_PUBLIC_APP_ENVIRONMENT === 'test'
          ? '(TEST) 부동산 가격협상 앱 네고시오'
          : '부동산 가격협상 앱 네고시오'
      }`,
      description: '단지 기본정보, 실거래가/시세, 호가, 매물, 주변학군/생활/교통 정보를 보여드립니다.',
      ogTitle: '관심목록',
      ogDescription: '단지 기본정보, 실거래가/시세, 호가, 매물, 주변학군/생활/교통 정보를 보여드립니다.',
      ogImagePath: AppConfig.ogImagePath,
      ogSiteName: process.env.NEXT_PUBLIC_APP_ENVIRONMENT === 'test' ? '네고시오(TEST)' : '네고시오',
      ogType: 'website',
      keyWords: `${
        process.env.NEXT_PUBLIC_APP_ENVIRONMENT === 'test' ? '네고시오(TEST)' : '네고시오'
      }, 부동산, 아파트 실거래가, 아파트 시세, 오피스텔 실거래가, 오피스텔 시세, 실거래가, 시세, 호가, 단지, 매매, 전세, 월세, 원룸, 투룸, 교통, 환경, 주변`,
    };
  }

  if (
    targetRoute === Routes.Chat ||
    targetRoute === Routes.ChatRoom ||
    targetRoute === Routes.ChatRoomList ||
    targetRoute === Routes.ChatRoomReport
  ) {
    return {
      title: `채팅 | ${
        process.env.NEXT_PUBLIC_APP_ENVIRONMENT === 'test'
          ? '(TEST) 부동산 가격협상 앱 네고시오'
          : '부동산 가격협상 앱 네고시오'
      }`,
      description: '단지 기본정보, 실거래가/시세, 호가, 매물, 주변학군/생활/교통 정보를 보여드립니다.',
      ogTitle: '관심목록',
      ogDescription: '단지 기본정보, 실거래가/시세, 호가, 매물, 주변학군/생활/교통 정보를 보여드립니다.',
      ogImagePath: AppConfig.ogImagePath,
      ogSiteName: process.env.NEXT_PUBLIC_APP_ENVIRONMENT === 'test' ? '네고시오(TEST)' : '네고시오',
      ogType: 'website',
      keyWords: `부동산 법률 상담, ${
        process.env.NEXT_PUBLIC_APP_ENVIRONMENT === 'test' ? '네고시오(TEST)' : '네고시오'
      }, 부동산, 아파트 실거래가, 아파트 시세, 오피스텔 실거래가, 오피스텔 시세, 실거래가, 시세, 호가, 단지, 매매, 전세, 월세, 원룸, 투룸, 교통, 환경, 주변`,
    };
  }

  if (
    targetRoute === Routes.ListingCreateForm ||
    targetRoute === Routes.ListingCreateSummary ||
    targetRoute === Routes.ListingSelectAddress ||
    targetRoute === Routes.ListingCreateSummary ||
    targetRoute === Routes.ListingCreateResult
  ) {
    return {
      title: `매물등록 | ${
        process.env.NEXT_PUBLIC_APP_ENVIRONMENT === 'test'
          ? '(TEST) 부동산 가격협상 앱 네고시오'
          : '부동산 가격협상 앱 네고시오'
      }`,
      description: '단지 기본정보, 실거래가/시세, 호가, 매물, 주변학군/생활/교통 정보를 보여드립니다.',
      ogTitle: '매물등록',
      ogDescription: '단지 기본정보, 실거래가/시세, 호가, 매물, 주변학군/생활/교통 정보를 보여드립니다.',
      ogImagePath: AppConfig.ogImagePath,
      ogSiteName: process.env.NEXT_PUBLIC_APP_ENVIRONMENT === 'test' ? '네고시오(TEST)' : '네고시오',
      ogType: 'website',
      keyWords: `${
        process.env.NEXT_PUBLIC_APP_ENVIRONMENT === 'test' ? '네고시오(TEST)' : '네고시오'
      }, 부동산, 아파트 실거래가, 아파트 시세, 오피스텔 실거래가, 오피스텔 시세, 실거래가, 시세, 호가, 단지, 매매, 전세, 월세, 원룸, 투룸, 교통, 환경, 주변`,
    };
  }

  if (targetRoute === Routes.NotificationList || targetRoute === Routes.NotificationSettings) {
    return {
      title: `알림 | ${
        process.env.NEXT_PUBLIC_APP_ENVIRONMENT === 'test'
          ? '(TEST) 부동산 가격협상 앱 네고시오'
          : '부동산 가격협상 앱 네고시오'
      }`,
      description: '단지 기본정보, 실거래가/시세, 호가, 매물, 주변학군/생활/교통 정보를 보여드립니다.',
      ogTitle: '알림',
      ogDescription: '단지 기본정보, 실거래가/시세, 호가, 매물, 주변학군/생활/교통 정보를 보여드립니다.',
      ogImagePath: AppConfig.ogImagePath,
      ogSiteName: process.env.NEXT_PUBLIC_APP_ENVIRONMENT === 'test' ? '네고시오(TEST)' : '네고시오',
      ogType: 'website',
      keyWords: `부동산 법률 상담, ${
        process.env.NEXT_PUBLIC_APP_ENVIRONMENT === 'test' ? '네고시오(TEST)' : '네고시오'
      }, 부동산, 아파트 실거래가, 아파트 시세, 오피스텔 실거래가, 오피스텔 시세, 실거래가, 시세, 호가, 단지, 매매, 전세, 월세, 원룸, 투룸, 교통, 환경, 주변`,
    };
  }

  if (targetRoute === Routes.NoticeDetail || targetRoute === Routes.NoticeList) {
    return {
      title: `공지사항 | ${
        process.env.NEXT_PUBLIC_APP_ENVIRONMENT === 'test'
          ? '(TEST) 부동산 가격협상 앱 네고시오'
          : '부동산 가격협상 앱 네고시오'
      }`,
      description: '단지 기본정보, 실거래가/시세, 호가, 매물, 주변학군/생활/교통 정보를 보여드립니다.',
      ogTitle: '공지사항',
      ogDescription: '단지 기본정보, 실거래가/시세, 호가, 매물, 주변학군/생활/교통 정보를 보여드립니다.',
      ogImagePath: AppConfig.ogImagePath,
      ogSiteName: process.env.NEXT_PUBLIC_APP_ENVIRONMENT === 'test' ? '네고시오(TEST)' : '네고시오',
      ogType: 'website',
      keyWords: `부동산 법률 상담, ${
        process.env.NEXT_PUBLIC_APP_ENVIRONMENT === 'test' ? '네고시오(TEST)' : '네고시오'
      }, 부동산, 아파트 실거래가, 아파트 시세, 오피스텔 실거래가, 오피스텔 시세, 실거래가, 시세, 호가, 단지, 매매, 전세, 월세, 원룸, 투룸, 교통, 환경, 주변`,
    };
  }

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
        convertedDescription = `${data?.display_address || ''} ${data?.listing?.listing_title} / ${formatNumberInKorean(
          data?.trade_or_deposit_price,
        )}/${formatNumberInKorean(
          data?.monthly_rent_fee,
        )}의 매물 기본정보, 실거래가/시세, 호가, 매매/전세/월세/원룸/투룸 매물, 주변학군/생활/교통 정보를 보여드립니다.`;
      } else {
        convertedDescription = `${data?.display_address || ''} ${data?.listing?.listing_title} / ${formatNumberInKorean(
          data?.trade_or_deposit_price,
        )}의 매물 기본정보, 실거래가/시세, 호가, 매매/전세/월세/원룸/투룸 매물, 주변 학군/생활/교통 정보를 보여드립니다.`;
      }

      return {
        ogTitle: data?.listing?.listing_title ?? '',
        ogDescription: description ?? '',
        title: convertedTitle
          ? `${convertedTitle} | ${
              process.env.NEXT_PUBLIC_APP_ENVIRONMENT === 'test'
                ? '(TEST) 부동산 가격협상 앱 네고시오'
                : '부동산 가격협상 앱 네고시오'
            }`
          : '',
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
      const { data } = await axios.post('/danji/detail', {
        danji_id: Number(query?.danjiID),
      });

      const convertedTitle = `'${data.name}'시세, 실거래가, 단지, 매물, 주변 정보`;
      const convertedDescription =
        `'${data?.name}', 단지 기본정보, 실거래가/시세, 호가, 매물, 주변학군/생활/교통 정보를 보여드립니다.` || '';

      return {
        title: convertedTitle ? `${convertedTitle}` : '',
        description: convertedDescription ?? '',
        ogTitle: data?.name ?? '',
        ogDescription: data?.road_name_address ?? data?.jibun_address ?? '',
        ogImagePath: Paths.DEFAULT_OPEN_GRAPH_IMAGE_3,
        ogSiteName: process.env.NEXT_PUBLIC_APP_ENVIRONMENT === 'test' ? '네고시오(TEST)' : '네고시오',
        ogType: 'website',
        ogTitleOnly: true,
        keyWords: `'${
          data?.name || ''
        }', 부동산, 아파트 실거래가, 아파트 시세, 오피스텔 실거래가, 오피스텔 시세, 실거래가, 시세, 호가, 단지, 매매, 전세, 월세, 원룸, 투룸, 교통, 환경, 주변`,
        canonical: `https://www.negocio.co.kr/danjiDetail?danjiID=${query?.danjiID}`,
        alternate: `https://www.negocio.co.kr/m/danjiDetail?danjiID=${query?.danjiID}`,
      };
    } catch (e) {
      return defaultMeta;
    }
  }

  if (targetRoute === Routes.LawQnaDetail) {
    try {
      const { data: lawQnaDetail } = await axios.post('/lawqna/get', { law_qna_id: Number(query.qnaID) });

      return {
        title: `네고시오 부동산 법률 상담 게시판 | ${
          process.env.NEXT_PUBLIC_APP_ENVIRONMENT === 'test'
            ? '(TEST) 부동산 가격협상 앱 네고시오'
            : '부동산 가격협상 앱 네고시오'
        }`,
        description: `Q.${lawQnaDetail?.title}`,
        ogTitle: '네고시오 부동산 법률 상담 게시판',
        ogDescription: `Q.${lawQnaDetail?.title}`,
        ogImagePath: Paths.LAWQNA,
        ogSiteName: process.env.NEXT_PUBLIC_APP_ENVIRONMENT === 'test' ? '네고시오(TEST)' : '네고시오',
        ogType: 'website',
        keyWords: `부동산 법률 상담, ${
          process.env.NEXT_PUBLIC_APP_ENVIRONMENT === 'test' ? '네고시오(TEST)' : '네고시오'
        }, 부동산, 아파트 실거래가, 아파트 시세, 오피스텔 실거래가, 오피스텔 시세, 실거래가, 시세, 호가, 단지, 매매, 전세, 월세, 원룸, 투룸, 교통, 환경, 주변`,
      };
    } catch (e) {
      return defaultMeta;
    }
  }

  if (targetRoute === Routes.LawQna) {
    return {
      title: `네고시오 부동산 법률 상담 게시판 | ${
        process.env.NEXT_PUBLIC_APP_ENVIRONMENT === 'test'
          ? '(TEST) 부동산 가격협상 앱 네고시오'
          : '부동산 가격협상 앱 네고시오'
      }`,
      description: '실제 변호사에게 답변을 받을 수 있는 부동산 상담',
      ogTitle: '네고시오 부동산 법률 상담 게시판',
      ogDescription: '실제 변호사에게 답변을 받을 수 있는 부동산 상담',
      ogImagePath: Paths.LAWQNA,
      ogSiteName: process.env.NEXT_PUBLIC_APP_ENVIRONMENT === 'test' ? '네고시오(TEST)' : '네고시오',
      ogType: 'website',
      keyWords: `부동산 법률 상담, ${
        process.env.NEXT_PUBLIC_APP_ENVIRONMENT === 'test' ? '네고시오(TEST)' : '네고시오'
      }, 부동산, 아파트 실거래가, 아파트 시세, 오피스텔 실거래가, 오피스텔 시세, 실거래가, 시세, 호가, 단지, 매매, 전세, 월세, 원룸, 투룸, 교통, 환경, 주변`,
    };
  }

  return defaultMeta;
}
