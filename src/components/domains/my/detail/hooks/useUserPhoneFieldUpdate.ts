import { useCallback, useEffect, useState, useMemo } from 'react';

import { useRouter } from 'next/router';

import { User } from '@/hooks/services/useAuth';

import useCheckPlatform from '@/hooks/useCheckPlatform';

import Routes from '@/router/routes';

import { autoHyphenPhone } from '@/utils/autoHypenPhone';

type UseUserPhoneUpdateProps = {
  user: Nullable<User>;
};

export default function useUserPhoneUpdate({ user }: UseUserPhoneUpdateProps) {
  const router = useRouter();

  const [phone, setPhone] = useState('');

  const [noPhoneText, setNoPhoneText] = useState('');

  const { platform } = useCheckPlatform();

  const phoneLabel = useMemo(() => '전화번호', []);

  const handleClickUpdatePhone = useCallback(() => {
    if (platform === 'pc') {
      const depth1 = router.query.depth1;

      const query = router.query;

      delete query.depth1;
      delete query.depth2;

      router.push({ pathname: `/${depth1}/${Routes.UpdatePhone}`, query });
    }

    if (platform === 'mobile') {
      router.push(`/${Routes.EntryMobile}/${Routes.UpdatePhone}`);
    }
  }, [platform, router]);

  useEffect(() => {
    if (user && user?.phone) {
      setPhone(user.phone);
    }

    if (user && !user?.phone) {
      setNoPhoneText('전화번호를 등록해주세요.');
    }
  }, [user]);

  return { phone: autoHyphenPhone(phone), phoneLabel, noPhoneText, handleClickUpdatePhone };
}
