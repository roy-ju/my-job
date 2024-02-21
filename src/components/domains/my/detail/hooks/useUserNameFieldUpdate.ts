import { ChangeEventHandler, useCallback, useEffect, useMemo, useState } from 'react';

import { User } from '@/hooks/services/useAuth';

import { GetUserInfoResponse } from '@/apis/user/getUserInfo';

import { apiService } from '@/services';

type UseUserNameFieldUpdateProps = {
  user: Nullable<User>;
  mutateUser: (clearCache?: boolean) => Promise<undefined[]> | Promise<GetUserInfoResponse | undefined>;
};

export default function useUserNameFieldUpdate({ user, mutateUser }: UseUserNameFieldUpdateProps) {
  const [name, setName] = useState('');

  const [nameFieldFocus, setNameFieldFocus] = useState(false);

  const verifiedMessage = useMemo(() => {
    if (user?.isVerified) {
      return '본인인증이 완료되었습니다.';
    }

    return '';
  }, [user?.isVerified]);

  const nameInputDisabled = useMemo(() => {
    if (user?.isVerified) {
      return true;
    }

    return false;
  }, [user?.isVerified]);

  const nameUpdateButtonDisabled = useMemo(() => {
    if (user?.name === name) {
      return true;
    }

    if (name.length === 0) {
      return true;
    }
  }, [user?.name, name]);

  const nameLabel = useMemo(() => {
    if (user?.name) {
      return '이름';
    }

    if (name) {
      return '이름';
    }

    if (nameFieldFocus) {
      return '이름';
    }

    return '이름을 입력해주세요.';
  }, [name, nameFieldFocus, user?.name]);

  const handleChangeName = useCallback<ChangeEventHandler<HTMLInputElement>>((e) => {
    setName(e.target.value);
  }, []);

  const handleResetName = useCallback(() => {
    setName('');
  }, []);

  const handleUpdateName = useCallback(async () => {
    await apiService.updateName(name);
    await mutateUser(false);
  }, [mutateUser, name]);

  const handleUpdateNameFieldFocus = useCallback((v: boolean) => {
    setNameFieldFocus(v);
  }, []);

  useEffect(() => {
    if (user?.name) {
      setName(user.name);
    }
  }, [user?.name]);

  return {
    name,
    nameLabel,
    verifiedMessage,
    nameInputDisabled,
    nameUpdateButtonDisabled,
    handleChangeName,
    handleUpdateNameFieldFocus,
    handleResetName,
    handleUpdateName,
  };
}
