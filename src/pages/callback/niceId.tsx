import type { NextPage } from 'next';
import { useEffect } from 'react';

const Page: NextPage = () => {
  useEffect(() => {
    window.close();
  }, []);

  return <div />;
};

export default Page;
