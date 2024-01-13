import { useCallback, useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import Lottie from 'react-lottie';

import { MobVerifyCiSuccess } from '@/components/templates';

import animationData from '@/assets/icons/json/success.json';

export default function VerifyCiSuccess() {
  const [render, setRender] = useState<'default' | 'auto' | ''>('auto');

  const router = useRouter();

  const handleLeave = useCallback(() => {
    router.replace('/');
  }, [router]);

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const redirect = urlSearchParams.get('redirect');

    if (redirect) {
      setRender('auto');
      return;
    }

    setRender('default');
  }, [router]);

  const handleRedirect = useCallback(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);

    const redirect = urlSearchParams.get('redirect');

    if (redirect) {
      setTimeout(() => {
        router.replace(redirect);
      }, 100);
    }
  }, [router]);

  if (!render) return <div tw="bg-white" />;

  return render === 'auto' ? (
    <div tw="h-full flex-1 flex flex-col items-center pt-12 overflow-auto min-h-0 bg-white gap-7">
      <Lottie
        width={100}
        height={100}
        options={{
          loop: false,
          autoplay: true,
          animationData,
          rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice',
          },
        }}
        eventListeners={[
          {
            eventName: 'complete',
            callback: () => handleRedirect(),
          },
        ]}
      />
      <div tw="text-h2 font-bold mb-1 text-center">
        본인인증 완료
        <br />
        <span tw="text-info text-gray-700 mb-7">자동으로 페이지가 전환됩니다.</span>
      </div>
    </div>
  ) : (
    <MobVerifyCiSuccess onClickLeave={handleLeave} />
  );
}
