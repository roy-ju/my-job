import { GetServerSideProps, InferGetServerSidePropsType } from 'next';

import { NextPageWithLayout } from '@/pages/_app';

import LoginWrapper from '@/components/pages/mobile/My/Login';

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
  <LoginWrapper ipAddress={ipAddress} />
);

Page.getLayout = function getLayout(page) {
  return (
    <>
      <div tw="w-[100%] absolute bg-nego-1300 h-full [z-index: -1]" />
      {page}
    </>
  );
};

export default Page;
