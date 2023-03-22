import { useIsomorphicLayoutEffect } from '@/hooks/utils';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';

const Page: NextPage = () => {
  const router = useRouter();

  useIsomorphicLayoutEffect(() => {
    const { code, state } = router.query;
    if (code && state) {
      const parsedState = JSON.parse(state as string);
      const returnURL = parsedState.returnURL as string;
      console.log(returnURL);
    }
  }, [router]);

  return <></>;
};

export default Page;
