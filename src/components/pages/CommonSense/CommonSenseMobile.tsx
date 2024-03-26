import Head from 'next/head';

import CommonSense from '@/components/domains/realestate-helper/CommonSense';

import MobAuthRequired from '@/components/atoms/MobAuthRequired';

import MobileContainer from '@/components/atoms/MobileContainer';

import Paths from '@/constants/paths';

export default function CommonSenseMobile() {
  return (
    <>
      <Head>
        <title>
          {`부동산 상식 | ${
            process.env.NEXT_PUBLIC_APP_ENVIRONMENT === 'test'
              ? '(TEST) 부동산 가격협상 앱 네고시오'
              : '부동산 가격협상 앱 네고시오'
          }`}
        </title>
        <meta name="description" content="가장 중요하지만, 가장 어려운 부동산 상식의 모든 것을 알려드릴게요!" />
        <meta property="og:title" content="부동산 상식" />
        <meta property="og:description" content="가장 중요하지만, 가장 어려운 부동산 상식의 모든 것을 알려드릴게요!" />
        <meta
          property="og:site_name"
          content={process.env.NEXT_PUBLIC_APP_ENVIRONMENT === 'test' ? '네고시오(TEST)' : '네고시오'}
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={Paths.DEFAULT_OPEN_GRAPH_IMAGE_1} />
      </Head>
      <MobAuthRequired>
        <MobileContainer>
          <CommonSense />
        </MobileContainer>
      </MobAuthRequired>
    </>
  );
}
