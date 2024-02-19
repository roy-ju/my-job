import { useEffect, useState } from 'react';

import { GetServerSideProps, InferGetServerSidePropsType } from 'next';

import type { NextPage } from 'next';

import { useRouter } from 'next/router';

import { Button, Loading } from '@/components/atoms';

import useKakaoLoginCallbackHandler from '@/hooks/useKakaoLoginCallbackHandler';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const forwarded = context.req.headers['x-forwarded-for'];
  const ip = typeof forwarded === 'string' ? forwarded.split(/, /)[0] : context.req.socket.remoteAddress;

  return {
    props: {
      ipAddress: ip ?? null,
    },
  };
};

const Page: NextPage = ({ ipAddress }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();

  const [hasOpener, setHasOpener] = useState(true);

  const { handleLogin, handleEmailUpdate } = useKakaoLoginCallbackHandler({ ipAddress });

  useEffect(() => {
    const { code, state: queryState } = router.query;

    if (!code) {
      setHasOpener(false);
    } else if (typeof code === 'string') {
      if (queryState === 'update') {
        handleEmailUpdate(code).then(() => window.close());
      } else {
        handleLogin(code).then(() => window.close());
      }
    }
  }, [handleLogin, handleEmailUpdate, router]);

  if (!hasOpener) {
    <div tw="w-full h-full flex items-center justify-center bg-white">
      <div tw="flex flex-col items-center justify-center">
        <div tw="text-h2 font-medium mb-4 text-center">비정상적인 접근입니다.</div>
        <Button variant="secondary" size="bigger" onClick={() => window.close()}>
          돌아가기
        </Button>
      </div>
    </div>;
  }

  return (
    <div tw="w-full h-full flex items-center justify-center bg-white">
      <Loading />
    </div>
  );
};

export default Page;
