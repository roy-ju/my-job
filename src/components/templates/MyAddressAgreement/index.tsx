import { Button, Separator } from '@/components/atoms';
import { NavigationHeader, TextField } from '@/components/molecules';
import useAuth from '@/hooks/services/useAuth';
import useControlled from '@/hooks/useControlled';
import { ChangeEventHandler, useMemo } from 'react';
import ErrorIcon from '@/assets/icons/error.svg';
import DeleteIcon from '@/assets/icons/close_contained.svg';
import { regPhone } from '@/utils/regex';

type AddressData = {
  addressName?: string;
  categoryName?: string;
  id?: string;
  lat?: number;
  lng?: number;
  placeName?: string;
  roadAddressName?: string;
};

export interface MyAddressAgreementProps {
  addressData?: AddressData;
  dong?: string;
  ho?: string;
  roadNameAddress?: string;
  addressDetail?: string;
  phone?: string;
  name?: string;
  isResend?: boolean;
  onChangeName?: ChangeEventHandler<HTMLInputElement>;
  onChangePhone?: ChangeEventHandler<HTMLInputElement>;
  onClickNameDeleteIcon?: () => void;
  onClickPhoneDeleteIcon?: () => void;
  onClickCTA?: () => void;
  onClickBack?: () => void;
}

export default function MyAddressAgreement({
  addressData,
  dong,
  ho,
  roadNameAddress,
  addressDetail,
  name,
  phone,
  isResend,
  onChangeName,
  onChangePhone,
  onClickNameDeleteIcon,
  onClickPhoneDeleteIcon,
  onClickCTA,
  onClickBack,
}: MyAddressAgreementProps) {
  const { user } = useAuth();

  const [nameValue, setNameValueState] = useControlled({
    controlled: name,
    default: '',
  });

  const [phoneValue, setPhoneValueState] = useControlled({
    controlled: phone,
    default: '',
  });

  const title = useMemo(() => {
    if (roadNameAddress) {
      return roadNameAddress;
    }

    if (addressData?.roadAddressName) {
      return addressData.roadAddressName;
    }

    return '';
  }, [roadNameAddress, addressData]);

  const subTitle = useMemo(() => {
    if (addressDetail) {
      return `${addressDetail}`;
    }
    if (addressData?.placeName && dong && ho) {
      return `${addressData.placeName} ${dong}동 ${ho}호`;
    }

    if (addressData?.placeName && !dong && ho) {
      return `${addressData.placeName} ${ho}호`;
    }

    if (addressData?.placeName && dong && !ho) {
      return `${addressData.placeName} ${dong}동`;
    }

    if (addressData?.placeName && !dong && !ho) {
      return `${addressData.placeName}`;
    }

    if (!addressData?.placeName && dong && ho) {
      return `${dong}동 ${ho}호`;
    }

    if (!addressData?.placeName && dong && !ho) {
      return `${dong}동 `;
    }

    if (!addressData?.placeName && !dong && ho) {
      return `${ho}호`;
    }

    return '';
  }, [addressData, dong, ho, addressDetail]);

  return (
    <div tw="h-full flex flex-col relative">
      <NavigationHeader>
        {onClickBack && <NavigationHeader.BackButton onClick={onClickBack} />}
        <NavigationHeader.Title>우리집 등록</NavigationHeader.Title>
      </NavigationHeader>
      <div tw="py-10 px-5">
        <p tw="text-b1 font-bold [line-height: 16px] mb-3">등록 신청 주소</p>
        {title && <p tw="text-b1 font-medium [line-height: 20px]">{title}</p>}
        {subTitle && <p tw="text-info text-gray-700 [line-height: 20px]">{subTitle}</p>}
      </div>
      <Separator />
      <div tw="flex-1 min-h-0 overflow-auto px-5 pt-8 pb-8">
        {isResend ? (
          <p tw="text-b1 font-bold">소유자 인증요청 문자를 재발송 하시겠습니까?</p>
        ) : (
          <p tw="text-b1 font-bold">
            등기부 조회 결과,
            <br />
            {user?.name}님이 소유자로 확인되지 않았습니다.
            <br />
            소유자의 대리인으로 우리집 등록하시겠습니까?
          </p>
        )}
        <p tw="text-info text-gray-700 my-3">우리집 등록 신청을 위해 소유자 동의가 필요합니다.</p>

        <div tw="flex flex-col gap-3">
          <TextField variant="outlined">
            <TextField.Input
              label={name ? '소유자 성명' : '소유자 성명 입력'}
              value={nameValue}
              onChange={(e) => {
                setNameValueState(e.target.value);
                onChangeName?.(e);
              }}
            />

            {name && onClickNameDeleteIcon && (
              <TextField.Trailing tw="pr-4 cursor-pointer" onClick={onClickNameDeleteIcon}>
                <DeleteIcon />
              </TextField.Trailing>
            )}
          </TextField>

          <TextField variant="outlined" hasError={phone ? !regPhone.test(phone) : false}>
            <TextField.PatternInput
              format="###-####-####"
              label={phone ? '소유자 휴대폰 번호' : '소유자 휴대폰 번호 입력'}
              value={phoneValue}
              onChange={(e) => {
                setPhoneValueState(e.target.value);
                onChangePhone?.(e);
              }}
            />

            {phone && onClickPhoneDeleteIcon && (
              <TextField.Trailing tw="pr-4 cursor-pointer" onClick={onClickPhoneDeleteIcon}>
                <DeleteIcon />
              </TextField.Trailing>
            )}
          </TextField>
        </div>

        {phone && !regPhone.test(phone) ? (
          <div tw="flex items-center gap-1 mt-2">
            <ErrorIcon />
            <span tw="text-info text-red-800 [line-height: 12px] [letter-spacing: -0.2px]">
              유효한 휴대폰 번호를 입력해주세요.
            </span>
          </div>
        ) : (
          <div tw="min-h-[24px]" />
        )}

        <p tw="text-info text-gray-700 mt-6">
          - 정보 입력 시 정당한 소유자의 대리인으로서 신청한 것으로 간주합니다.
          <br />
          - 기입하시는 휴대폰 번호로 소유자 동의 요청 문자가 발송됩니다.
          <br />
          - 소유자의 본인인증 후 동의가 가능합니다.
          <br />- 휴대폰 번호는 소유자 확인 및 동의를 받기 위한 문자 전송을 위해서 사용 됩니다.
        </p>
      </div>

      <div tw="w-full px-5 py-4 bg-white shadow-persistentBottomBar">
        <Button
          variant="secondary"
          size="bigger"
          tw="w-full"
          disabled={!name || !phone || !regPhone.test(phone)}
          onClick={onClickCTA}
        >
          소유자 정보 입력 완료
        </Button>
      </div>
    </div>
  );
}
