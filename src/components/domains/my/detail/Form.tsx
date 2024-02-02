/* eslint-disable @next/next/no-img-element */
import { ChangeEventHandler, useId } from 'react';

import Image, { StaticImageData } from 'next/image';

import tw from 'twin.macro';

import { toast } from 'react-toastify';

import { Button, Separator as BaseSeparator, Ul } from '@/components/atoms';

import { TextField } from '@/components/molecules';

import { NICKNAME_REGEX } from '@/constants/regex';

interface UpdatetableTextFieldProps {
  label: string;
  value?: string;
  disabled?: boolean;
  buttonDisabled?: boolean;
  readOnly?: boolean;
  type?: 'text' | 'phone';
  onClickUpdate?: () => void;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

function UpdatableTextField({
  label,
  value,
  disabled = false,
  buttonDisabled = false,
  readOnly = false,
  type = 'text',
  onClickUpdate,
  onChange,
}: UpdatetableTextFieldProps) {
  return (
    <TextField variant="outlined">
      {type === 'text' && (
        <TextField.Input onChange={onChange} value={value} label={label} disabled={disabled} readOnly={readOnly} />
      )}
      {type === 'phone' && (
        <TextField.PatternInput
          format="###-####-####"
          onChange={onChange}
          value={value}
          label={label}
          disabled={disabled}
          readOnly={readOnly}
        />
      )}
      <TextField.Trailing>
        <Button disabled={buttonDisabled} size="small" variant="gray" onClick={onClickUpdate}>
          변경
        </Button>
      </TextField.Trailing>
    </TextField>
  );
}

function UpdatableNicknameTextField({
  label,
  value,
  disabled = false,
  buttonDisabled = false,
  readOnly = false,
  onClickUpdate,
  onChange,
}: UpdatetableTextFieldProps) {
  let errorMessage = '';
  let isValidNickname = true;

  if (value?.length) {
    if (!NICKNAME_REGEX.noSpecialStringRegex.test(value)) {
      errorMessage = '공백, 특수문자, 이모티콘 등은 사용할 수 없습니다.';
      isValidNickname = false;
    }
    if (!NICKNAME_REGEX.length.test(value)) {
      errorMessage = '닉네임은 3~20글자 이어야 합니다.';
      isValidNickname = false;
    }
    if (NICKNAME_REGEX.general.test(value)) {
      isValidNickname = true;
    }
  }

  return (
    <>
      <TextField variant="outlined" hasError={!isValidNickname}>
        <TextField.Input onChange={onChange} value={value} label={label} disabled={disabled} readOnly={readOnly} />
        <TextField.Trailing>
          <Button
            disabled={buttonDisabled || !isValidNickname || !value?.length}
            size="small"
            variant="gray"
            onClick={onClickUpdate}
          >
            변경
          </Button>
        </TextField.Trailing>
      </TextField>
      {errorMessage && <TextField.ErrorMessage>{errorMessage}</TextField.ErrorMessage>}
    </>
  );
}

interface LoginInfoProps {
  nickname?: string;
  email?: string;
  updateNicknameButtonDisabled?: boolean;
  onClickLogout?: () => void;
  onClickUpdateNickname?: () => void;
  onClickUpdateEmail?: () => void;
  onChangeNickname?: ChangeEventHandler<HTMLInputElement>;
}

function LoginInfo({
  nickname,
  email,
  updateNicknameButtonDisabled = true,
  onClickLogout,
  onClickUpdateNickname,
  onClickUpdateEmail,
  onChangeNickname,
}: LoginInfoProps) {
  return (
    <div tw="px-5">
      <div tw="flex items-center justify-between mb-4">
        <div tw="text-b1 leading-4 font-bold">로그인 정보</div>
        <Button variant="ghost" size="none" tw="text-info leading-4 underline" onClick={onClickLogout}>
          로그아웃
        </Button>
      </div>
      <div tw="flex flex-col gap-3">
        <UpdatableNicknameTextField
          label="닉네임"
          value={nickname}
          buttonDisabled={updateNicknameButtonDisabled}
          onClickUpdate={onClickUpdateNickname}
          onChange={onChangeNickname}
        />
        <UpdatableTextField label="간편 로그인" readOnly value={email} onClickUpdate={onClickUpdateEmail} />
      </div>
    </div>
  );
}

interface IdentityInfoProps {
  name?: string;
  phone?: string;
  onClickUpdate?: () => void;
  onClickVerifyCi?: () => void;
}

function IdentityInfo({ name, phone, onClickUpdate, onClickVerifyCi }: IdentityInfoProps) {
  return (
    <div tw="px-5">
      <div tw="flex flex-col gap-3 mb-4">
        <div tw="text-b1 leading-4 font-bold">본인인증 정보</div>
        <Ul>
          {!name && !phone && <li>매물등록신청, 거래 참여 등을 하기 위해서는 본인인증이 필요합니다</li>}
          {name && !phone && <li>휴대폰 번혼를 등록하시면 중요한 알림을 받으실 수 있습니다</li>}
        </Ul>
      </div>
      <div tw="flex flex-col gap-3">
        {name && (
          <TextField>
            <TextField.Input label="실명" disabled value={name} />
          </TextField>
        )}
        {!name && (
          <Button variant="secondary" tw="font-bold" onClick={onClickVerifyCi}>
            본인인증하기
          </Button>
        )}
        {phone && (
          <UpdatableTextField readOnly type="phone" label="휴대폰 번호" value={phone} onClickUpdate={onClickUpdate} />
        )}
        {name && !phone && (
          <Button variant="outlined" onClick={onClickUpdate}>
            휴대폰 번호 등록하기
          </Button>
        )}
      </div>
    </div>
  );
}

interface ProfileImageProps {
  profileImageUrl: string | StaticImageData;
  onClickUpdate?: (file: File) => void;
}

function ProfileImage({ profileImageUrl, onClickUpdate }: ProfileImageProps) {
  const id = useId();

  return (
    <div tw="px-5">
      <div tw="flex items-center justify-between mb-4">
        <div tw="text-b1 leading-4 font-bold">프로필 이미지 변경</div>
      </div>
      {profileImageUrl && (
        <Image
          src={profileImageUrl}
          alt="프로필 사진"
          width={120}
          height={120}
          tw="mx-auto rounded [object-fit: cover] mb-5 w-[120px] h-[120px] object-cover"
        />
      )}
      <label
        htmlFor={`${id}-file`}
        tw="flex items-center justify-center rounded-lg transition-colors text-white bg-nego-800 hover:bg-nego-600 disabled:bg-nego-300 disabled:text-white px-4 h-[3rem] text-b2 leading-4 cursor-pointer"
      >
        프로필 이미지 등록하기
        <input
          type="file"
          name="file"
          id={`${id}-file`}
          style={{ display: 'none' }}
          onChange={(e) => {
            if (!e.target.files) return;
            const selectedFile = e.target.files?.[0];
            const allowedTypes = ['image/png', 'image/jpg', 'image/jpeg', 'image/jfif'];
            if (!allowedTypes.includes(selectedFile?.type)) {
              toast.error('png, jpg, jpeg, jfif 확장자만 업로드 가능합니다.');
              return;
            }
            onClickUpdate?.(e.target.files[0]);
          }}
        />
      </label>
    </div>
  );
}

const Separator = tw(BaseSeparator)`my-10`;

const Container = tw.div``;

export default Object.assign(Container, {
  LoginInfo,
  IdentityInfo,
  Separator,
  ProfileImage,
});
