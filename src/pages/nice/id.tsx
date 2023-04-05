import getNiceEncData from '@/apis/user/getNiceEncData';
import { useIsomorphicLayoutEffect } from '@/hooks/utils';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useRef } from 'react';

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

  return (
    <form ref={formRef} action="https://nice.checkplus.co.kr/CheckPlusSafeModel/service.cb">
      <input type="hidden" name="m" value="service" />
      <input type="hidden" name="token_version_id" />
      <input type="hidden" name="enc_data" />
      <input type="hidden" name="integrity_value" />
    </form>
  );
};

export default Page;
