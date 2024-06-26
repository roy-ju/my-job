import { useEffect } from 'react';

import { useRouter } from 'next/router';

export default function Error404() {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.replace('/');
    });
  }, [router]);

  return <div />;
}
