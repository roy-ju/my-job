import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Page: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    console.log(router.query);
  }, [router.query]);

  return <div />;
};

export default Page;
