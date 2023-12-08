import { GetDanjiDetailResponse } from '@/apis/danji/danjiDetail';
import { DanjiDetail } from '@/components/pages/mobile';
import { fetcher } from '@/lib/swr';
import { NextPageWithLayout } from '@/pages/_app';
import { checkPlatform } from '@/utils/checkPlatform';
import { GetServerSideProps } from 'next';

const Page: NextPageWithLayout<{ prefetchedData?: { [key: string]: any } | null }> = ({ prefetchedData }) => (
  <DanjiDetail prefetchedData={prefetchedData} />
);

Page.getLayout = function getLayout(page) {
  return <>{page}</>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const userAgent = context.req.headers['user-agent'];
  const platform = checkPlatform(userAgent);

  let danjiDetail: GetDanjiDetailResponse | null = null;

  if (context.query.danjiID) {
    const response: GetDanjiDetailResponse = await fetcher([
      '/danji/detail',
      { danji_id: Number(context.query.danjiID) },
    ]);

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

// import { GetServerSideProps } from 'next';

// import { NextPageWithLayout } from '@/pages/_app';

// import PlatformProvider from '@/providers/PlatformProvider';

// import { Container } from '@/components/container';

// import { checkPlatform } from '@/utils/checkPlatform';

// import { fetcher } from '@/lib/swr';

// import { GetDanjiDetailResponse } from '@/apis/danji/danjiDetail';

// import DanjiDetail from '@/components/pages/DanjiDetail';

// const Page: NextPageWithLayout<{
//   platform: string;
//   danjiID: number | null;
//   prefetchedData?: { [key: string]: any } | null;
// }> = ({ platform, danjiID, prefetchedData }) => (
//   <PlatformProvider platform={platform}>
//     <Container>
//       <DanjiDetail prefetchedData={prefetchedData} danjiID={danjiID} />
//     </Container>
//   </PlatformProvider>
// );

// Page.getLayout = function getLayout(page) {
//   return <>{page}</>;
// };

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const userAgent = context.req.headers['user-agent'];
//   const platform = checkPlatform(userAgent);

//   let danjiDetail: GetDanjiDetailResponse | null = null;
//   let danjiID: number | null = null;

//   if (context.query.danjiID) {
//     const response: GetDanjiDetailResponse = await fetcher([
//       '/danji/detail',
//       { danji_id: Number(context.query.danjiID) },
//     ]);

//     if (response.danji_id) {
//       danjiID = response.danji_id;
//       danjiDetail = response;
//     }
//   }

//   return {
//     props: {
//       platform,
//       ...(danjiID ? { danjiID } : {}),
//       ...(danjiDetail ? { prefetchedData: danjiDetail } : {}),
//     },
//   };
// };

// export default Page;
