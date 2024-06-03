import Head from 'next/head';

import SpecialTerms from '@/components/domains/realestate-helper/SpecialTerms';

import MobileContainer from '@/components/atoms/MobileContainer';

import AppConfig from '@/config';

import Routes from '@/router/routes';

export default function SpecialTermsMobile() {
  const metasInfo = {
    title: `계약서 및 특약사항 | ${
      process.env.NEXT_PUBLIC_APP_ENVIRONMENT === 'test'
        ? '(TEST) 부동산 가격협상 앱 네고시오'
        : '부동산 가격협상 앱 네고시오'
    }`,

    description: `계약서 작성부터 꼭 필요한 특약사항까지 모두 알려드려요!`,

    keyWords: `계약서 및 특약사항, ${
      process.env.NEXT_PUBLIC_APP_ENVIRONMENT === 'test' ? '네고시오(TEST)' : '네고시오'
    }, 부동산, 아파트 실거래가, 아파트 시세, 오피스텔 실거래가, 오피스텔 시세, 실거래가, 시세, 호가, 단지, 매매, 전세, 월세, 원룸, 투룸, 교통, 환경, 주변`,

    ogTitle: '계약서 및 특약사항',

    ogSiteName: process.env.NEXT_PUBLIC_APP_ENVIRONMENT === 'test' ? '네고시오(TEST)' : '네고시오',

    ogImagePath: AppConfig.ogImagePath,

    ogType: 'website',

    ogUrl: `${process.env.NEXT_PUBLIC_NEGOCIO_BASE_URL}/${Routes.EntryMobile}/${Routes.CommonSense}`,
  };

  return (
    <>
      <Head>
        <title>{metasInfo.title}</title>
        <meta name="description" content={metasInfo.description} />
        <meta property="keywords" content={metasInfo.keyWords} />
        <meta property="og:title" content={metasInfo.ogTitle} />
        <meta property="og:description" content={metasInfo.description} />
        <meta property="og:site_name" content={metasInfo.ogSiteName} />
        <meta property="og:type" content={metasInfo.ogType} />
        <meta property="og:image" content={metasInfo.ogImagePath} />
        {process.env.NEXT_PUBLIC_APP_ENVIRONMENT !== 'test' && <meta property="og:url" content={metasInfo.ogUrl} />}
      </Head>
      <MobileContainer>
        <SpecialTerms />
      </MobileContainer>
    </>
  );
}
