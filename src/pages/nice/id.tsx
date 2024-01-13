import { useRef } from 'react';

import { useRouter } from 'next/router';

import type { NextPage } from 'next';

import useIsomorphicLayoutEffect from '@/hooks/useIsomorphicLayoutEffect';

import getNiceEncData from '@/apis/user/getNiceEncData';

const Page: NextPage = () => {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement | null>(null);

  useIsomorphicLayoutEffect(() => {
    if (!router.query.type) return;

    getNiceEncData({
      returnUrl: `${window.location.origin}/callback/niceId?type=${router.query.type}`,
      type: Number(router.query.type),
    }).then((res) => {
      const form = formRef.current;
      if (form && res?.token_version_id && res?.integrity_value && res?.enc_data) {
        form.token_version_id.value = res.token_version_id;
        form.enc_data.value = res.enc_data;
        form.integrity_value.value = res.integrity_value;
        form.submit();
      }
    });
  }, [router]);

  if (!router.query.type) return null;

  const requestUrl =
    router.query.type === '1'
      ? 'https://nice.checkplus.co.kr/CheckPlusSafeModel/service.cb' // 나이스 휴대폰 본인인증
      : 'https://cert.vno.co.kr/ipin.cb'; // 나이스 아이핀 본인인증

  return (
    <form ref={formRef} action={requestUrl}>
      <input type="hidden" name="m" value="service" />
      <input type="hidden" name="token_version_id" />
      <input type="hidden" name="enc_data" />
      <input type="hidden" name="integrity_value" />
    </form>
  );
};

export default Page;
