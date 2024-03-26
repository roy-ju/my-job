import Head from 'next/head';

import ListingCheckList from '@/components/domains/realestate-helper/ListingCheckList';

import MobAuthRequired from '@/components/atoms/MobAuthRequired';

import MobileContainer from '@/components/atoms/MobileContainer';

import Paths from '@/constants/paths';

export default function ListingCheckListMobile() {
  return (
    <>
      <Head>
        <title>매물 체크리스트</title>
        <meta
          name="description"
          content="집보는데 뭘 봐야할까? 네고시오에서 제안하는 매물 체크리스트를 참고해보세요!"
        />
        <meta property="og:title" content="매물 체크리스트" />
        <meta
          property="og:description"
          content="집보는데 뭘 봐야할까? 네고시오에서 제안하는 매물 체크리스트를 참고해보세요!"
        />
        <meta
          property="og:site_name"
          content={process.env.NEXT_PUBLIC_APP_ENVIRONMENT === 'test' ? '네고시오(TEST)' : '네고시오'}
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={Paths.DEFAULT_OPEN_GRAPH_IMAGE_1} />
      </Head>
      <MobAuthRequired>
        <MobileContainer>
          <ListingCheckList />
        </MobileContainer>
      </MobAuthRequired>
    </>
  );
}
