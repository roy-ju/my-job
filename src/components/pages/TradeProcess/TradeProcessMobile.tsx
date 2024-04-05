import Head from 'next/head';

import TradeProcess from '@/components/domains/realestate-helper/TradeProcess';

import MobileContainer from '@/components/atoms/MobileContainer';

import Paths from '@/constants/paths';

export default function TradeProcessMobile() {
  return (
    <>
      <Head>
        <title>부동산 거래 절차</title>
        <meta name="description" content="어렵기만한 거래 절차, A부터 Z까지 모두 다 알려드려요!" />
        <meta property="og:title" content="부동산 거래 절차" />
        <meta property="og:description" content="어렵기만한 거래 절차, A부터 Z까지 모두 다 알려드려요!" />
        <meta
          property="og:site_name"
          content={process.env.NEXT_PUBLIC_APP_ENVIRONMENT === 'test' ? '네고시오(TEST)' : '네고시오'}
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={Paths.DEFAULT_OPEN_GRAPH_IMAGE_1} />
      </Head>
      <MobileContainer>
        <TradeProcess />
      </MobileContainer>
    </>
  );
}
