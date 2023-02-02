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
      if (returnURL) {
        setTimeout(() => router.back(), 1000);
      }
    }
  }, [router]);

  return <></>;
};

export default Page;
