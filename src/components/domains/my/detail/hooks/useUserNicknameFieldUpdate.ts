import { ChangeEventHandler, useCallback, useEffect, useMemo, useState } from 'react';

import { toast } from 'react-toastify';

import { User } from '@/hooks/services/useAuth';

import { GetUserInfoResponse } from '@/apis/user/getUserInfo';

import { apiService } from '@/services';

import { NICKNAME_REGEX } from '@/constants/regex';

import NICKNAME_ERROR_MESSAGE from '../constants/nicknameErrorMessage';

type UseUserNicknameUpdateProps = {
  user: Nullable<User>;
  mutateUser: (clearCache?: boolean) => Promise<undefined[]> | Promise<GetUserInfoResponse | undefined>;
};

export default function useUserNicknameUpdate({ user, mutateUser }: UseUserNicknameUpdateProps) {
  const [nickname, setNickname] = useState('');

  const [nicknameErrMsg, setNickNameErrMsg] = useState('');

  const [nicknamePopup, setNicknamePopup] = useState(false);

  const nicknameLabel = useMemo(() => '닉네임', []);

  const nicknameUpdateButtonDisabled = useMemo(() => {
    if (user?.nickname === nickname) {
      return true;
    }

    if (nickname.length === 0) {
      return true;
    }
  }, [user?.nickname, nickname]);

  const handleChangeNickname = useCallback<ChangeEventHandler<HTMLInputElement>>((e) => {
    const newValue = e.target.value;

    if (newValue.length === 0) {
      setNickname('');
      setNickNameErrMsg('');
    } else if (newValue.length <= 16 && NICKNAME_REGEX.validCharactersRegex.test(newValue)) {
      setNickname(newValue);
    }
  }, []);

  const handleResetNickname = useCallback(() => {
    setNickname('');
    setNickNameErrMsg('');
  }, []);

  const handleOpenNicknameUpdatePopup = useCallback(async () => {
    if (nickname.length < 3) {
      setNickNameErrMsg(NICKNAME_ERROR_MESSAGE.CLIENT_INVALID);
      return;
    }

    if (!NICKNAME_REGEX.general.test(nickname)) {
      setNickNameErrMsg(NICKNAME_ERROR_MESSAGE.CLIENT_INVALID);
      return;
    }

    const checkNicknameRes = await apiService.checkNickname(nickname);

    if (checkNicknameRes?.error_code) {
      setNickNameErrMsg(NICKNAME_ERROR_MESSAGE.DUPLICATED);
      return;
    }

    setNicknamePopup(true);
    setNickNameErrMsg('');
  }, [nickname]);

  const handleCloseNicknameUpdatePopup = useCallback(() => {
    setNicknamePopup(false);
  }, []);

  const handleUpdateNickname = useCallback(async () => {
    setNicknamePopup(false);

    const checkNicknameRes = await apiService.checkNickname(nickname);

    if (checkNicknameRes?.error_code) {
      setNickNameErrMsg(NICKNAME_ERROR_MESSAGE.DUPLICATED);
      return;
    }

    const res = await apiService.updateNickname(nickname);
    if (res?.error_code) {
      setNickNameErrMsg(NICKNAME_ERROR_MESSAGE.CANNOT_UPDATE_SEVENDAYS);
    } else {
      toast.success('닉네임이 변경되었습니다.');
    }
    mutateUser(false);
  }, [nickname, mutateUser]);

  useEffect(() => {
    if (user?.nickname) {
      setNickname(user.nickname);
    }
  }, [user?.nickname]);

  return {
    nickname,
    nicknameLabel,
    nicknameErrMsg,
    nicknamePopup,
    nicknameUpdateButtonDisabled,
    handleChangeNickname,
    handleResetNickname,
    handleUpdateNickname,
    handleOpenNicknameUpdatePopup,
    handleCloseNicknameUpdatePopup,
  };
}
