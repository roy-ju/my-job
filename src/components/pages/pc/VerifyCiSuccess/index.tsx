import { memo, useCallback, useEffect, useState } from 'react';

import { useRouter as useNextRouter } from 'next/router';

import Lottie from 'react-lottie';

import { Panel } from '@/components/atoms';

import { VerifyCiSuccess } from '@/components/templates';

import { useRouter } from '@/hooks/utils';

import animationData from '@/assets/icons/json/success.json';

interface Props {
  depth: number;
  panelWidth?: string;
}

export default memo(({ depth, panelWidth }: Props) => {
  const [render, setRender] = useState<'default' | 'auto' | ''>('');

  const router = useRouter(depth);

  const nextRouter = useNextRouter();

  const handleLeave = useCallback(() => {
    router.pop();
  }, [router]);

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const redirect = urlSearchParams.get('redirect');

    if (redirect) {
      setRender('auto');
      return;
    }

    setRender('default');
  }, [nextRouter]);

  const handleRedirect = () => {
    const urlSearchParams = new URLSearchParams(window.location.search);

    const redirect = urlSearchParams.get('redirect');

    if (redirect) {
      setTimeout(() => {
        nextRouter.replace(redirect);
      }, 100);
    }
  };

  if (!render) return null;

  return render === 'auto' ? (
    <Panel width={panelWidth}>
      <div tw="w-full h-full">
        <div tw="h-full flex-1 flex flex-col items-center pt-12 overflow-auto min-h-0 gap-7">
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
      </div>
    </Panel>
  ) : (
    <Panel width={panelWidth}>
      <VerifyCiSuccess onClickLeave={handleLeave} />
    </Panel>
  );
});
