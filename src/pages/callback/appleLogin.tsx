import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useCallback, useEffect } from 'react';

const Page: NextPage = () => {
  const router = useRouter();

  const handleLogin = useCallback(async (code: string) => {
    console.log(code);
  }, []);

  const handleEmailUpdate = useCallback(async (code: string) => {
    console.log(code);
  }, []);

  useEffect(() => {
    const { code, state: queryState } = router.query;
    if (typeof code === 'string') {
      if (queryState === 'update') {
        handleEmailUpdate(code);
      } else {
        handleLogin(code);
      }
    }
  }, [handleLogin, handleEmailUpdate, router]);

  return <div />;
};

export default Page;
