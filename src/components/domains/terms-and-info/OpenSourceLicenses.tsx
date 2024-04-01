import { useCallback } from 'react';

import { useRouter } from 'next/router';

import { NavigationHeader } from '@/components/molecules';

import Container from '@/components/atoms/Container';

import oss from './constants/oss';

/** Only Mobile */
export default function OpenSourceLicenses() {
  const router = useRouter();

  const handleClickBack = useCallback(() => {
    router.back();
  }, [router]);

  return (
    <Container>
      <NavigationHeader>
        <NavigationHeader.BackButton onClick={handleClickBack} />
        <NavigationHeader.Title>오픈소스 라이센스</NavigationHeader.Title>
      </NavigationHeader>

      <div tw="flex-1 overflow-auto px-5 py-10">
        <p>
          <span tw="font-bold text-b1 uppercase">OSS NOTICE</span>
          <br />
          <br />
          <span tw="font-bold uppercase text-info text-gray-700">
            The following sets forth attribution notices for third party software that may be contatined in this
            application.
          </span>
          <br />
          <span tw="text-info text-gray-700">
            We thank the open source community for all of their efforts. If you have any questions about these notices,
            please email us at info@negocio.co.kr
          </span>
        </p>
        <div tw="py-6 text-info">
          <p tw="whitespace-pre-wrap">{oss}</p>
        </div>
      </div>
    </Container>
  );
}
