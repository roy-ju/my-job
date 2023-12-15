import { NextPageWithLayout } from '@/pages/_app';

import { fetcher } from '@/lib/swr';

import { checkPlatform } from '@/utils/checkPlatform';

import { GetServerSideProps } from 'next';

import PlatformProvider from '@/providers/PlatformProvider';

import { Container } from '@/components/container';

import DanjiDetail from '@/components/pages/Danji/detail';

import { DanjiDetailResponse } from '@/services/danji/types';

const Page: NextPageWithLayout<{ prefetchedData?: { [key: string]: any } | null; platform: string }> = ({
  prefetchedData,
  platform,
}) => (
  <PlatformProvider platform={platform}>
    <Container>
      <DanjiDetail prefetchedData={prefetchedData} />
    </Container>
  </PlatformProvider>
);

Page.getLayout = function getLayout(page) {
  return <>{page}</>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const userAgent = context.req.headers['user-agent'];

  const platform = checkPlatform(userAgent);

  let danjiDetail: Nullable<DanjiDetailResponse> = null;

  if (context.query.danjiID) {
    const response: DanjiDetailResponse = await fetcher(['/danji/detail', { danji_id: Number(context.query.danjiID) }]);

    if (response.danji_id) {
      danjiDetail = response;
    }
  }

  return {
    props: {
      ...(danjiDetail ? { prefetchedData: danjiDetail } : {}),
      platform,
    },
  };
};

export default Page;
