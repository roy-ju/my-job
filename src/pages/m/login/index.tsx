import { GetServerSideProps, InferGetServerSidePropsType } from 'next';

import { NextPageWithLayout } from '@/pages/_app';

import Login from '@/components/pages/mobile/My/Login';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const forwarded = context.req.headers['x-forwarded-for'];
  const ip = typeof forwarded === 'string' ? forwarded.split(/, /)[0] : context.req.socket.remoteAddress;

  return {
    props: {
      ipAddress: ip ?? null,
    },
  };
};

const Page: NextPageWithLayout = ({ ipAddress }: InferGetServerSidePropsType<typeof getServerSideProps>) => (
  <Login ipAddress={ipAddress} />
);

Page.getLayout = function getLayout(page) {
  return <>{page}</>;
};

export default Page;
