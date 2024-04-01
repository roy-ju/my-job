import ButtonV2 from '@/components/atoms/ButtonV2';

import { TextField } from '@/components/molecules';

import useCheckPlatform from '@/hooks/useCheckPlatform';

import Keys from '@/constants/storage_keys';

import CopyIcon from '@/assets/icons/copy.svg';

type EtcsProps = {
  handleCopyToken?: (v: string) => void;
  handleUpdateCurrentPosition?: () => void;
};

export default function Etcs({ handleCopyToken, handleUpdateCurrentPosition }: EtcsProps) {
  const token = window?.localStorage?.getItem(Keys.ACCESS_TOKEN)?.slice(1, -1) ?? '';

  const { platform } = useCheckPlatform();

  if (platform === 'pc' && token) {
    return (
      <div tw="relative">
        <ButtonV2
          tw="ml-auto mb-4"
          size="small"
          onClick={() => {
            handleCopyToken?.(token);
          }}
        >
          <CopyIcon tw="w-fit h-6 mr-1" />
          <span>토큰 복사하기</span>
        </ButtonV2>

        <TextField variant="outlined">
          <TextField.TextArea tw="break-all" disabled label="액세스 토큰" value={token ?? ''} />
        </TextField>
      </div>
    );
  }

  if (platform === 'mobile') {
    return <ButtonV2 onClick={handleUpdateCurrentPosition}>현재 위치 가지고 오기</ButtonV2>;
  }

  return null;
}
