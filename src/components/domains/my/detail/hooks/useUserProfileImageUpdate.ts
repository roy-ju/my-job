import { useState, useEffect, useCallback } from 'react';

import { User } from '@/hooks/services/useAuth';

import { GetUserInfoResponse } from '@/apis/user/getUserInfo';

import { apiService } from '@/services';

type UseUserProfileImageUpdate = {
  user: Nullable<User>;
  mutateUser: (clearCache?: boolean) => Promise<undefined[]> | Promise<GetUserInfoResponse | undefined>;
};

export default function useUserProfileImageUpdate({ user, mutateUser }: UseUserProfileImageUpdate) {
  const [profileImageUrl, setProfileImageUrl] = useState('');

  const handleUploadProfileImage = useCallback(
    async (file: File) => {
      await apiService.uploadProfileImage(user?.id as number, file);
      await mutateUser(false);
    },
    [user?.id, mutateUser],
  );

  useEffect(() => {
    if (user?.profileImageUrl) {
      setProfileImageUrl(user?.profileImageUrl);
    }
  }, [user?.profileImageUrl]);

  return { profileImageUrl, handleUploadProfileImage };
}
