import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Page: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    const {
      kie,
      enc_data: encData,
      integrity_value: integrityValue,
      token_version_id: tokenVersionId,
      type,
    } = router.query;

    if (kie && encData && integrityValue && tokenVersionId && type) {
      window.opener?.Negocio?.callbacks?.niceResponse?.({
        kie,
        encData,
        integrityValue,
        tokenVersionId,
        type,
      });
      window.close();
    }
  }, [router]);

  return <div />;
};

export default Page;
