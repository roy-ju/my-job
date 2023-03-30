import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Page: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    const { code } = router.query;
    if (code) {
      // get access token using the code.
      // login with the access token.
    }
    // window.close();
  }, [router]);

  return <div />;
};

export default Page;
