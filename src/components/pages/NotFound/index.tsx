import { useEffect } from 'react';

import { useRouter } from 'next/router';

export default function NotFound() {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.replace('/');
    });
  }, [router]);

  return <div />;
}
