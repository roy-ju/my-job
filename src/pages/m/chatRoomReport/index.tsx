import { GetServerSideProps } from 'next';

import { NextPageWithLayout } from '@/pages/_app';

import PlatformProvider from '@/providers/PlatformProvider';

import { Container } from '@/components/container';

import { checkPlatform } from '@/utils/checkPlatform';

import ChatRoomReport from '@/components/pages/ChatRoomReport';

const Page: NextPageWithLayout<{ platform: string }> = ({ platform }) => (
  <PlatformProvider platform={platform}>
    <Container auth>
      <ChatRoomReport />
    </Container>
  </PlatformProvider>
);

Page.getLayout = function getLayout(page) {
  return <>{page}</>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const userAgent = context.req.headers['user-agent'];
  const platform = checkPlatform(userAgent);

  return {
    props: {
      platform,
    },
  };
};

export default Page;
