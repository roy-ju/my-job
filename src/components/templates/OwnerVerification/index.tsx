import { NavigationHeader } from '@/components/molecules';
import CloseIcon from '@/assets/icons/close_24.svg';
import ExclamationMark from '@/assets/icons/exclamation_mark_outlined.svg';
import { Button, Checkbox, Label, Loading, PersistentBottomBar, Separator } from '@/components/atoms';
import { useControlled } from '@/hooks/utils';
import { ChangeEventHandler, useCallback } from 'react';

export interface TermsState {
  listingCreate: boolean;
  privacy: boolean;
}

export interface OwnerVerificationProps {
  isLoading?: boolean;
  address?: string;
  termsState?: TermsState;
  onChangeTermsState?: (newState: TermsState) => void;
  onClickVerify?: () => void;
}

export default function OwnerVerification({
  isLoading,
  address,
  termsState,
  onChangeTermsState,
  onClickVerify,
}: OwnerVerificationProps) {
  const [state, setState] = useControlled({
    controlled: termsState,
    default: {
      listingCreate: false,
      privacy: false,
    },
  });

  const handleChangeState = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (e) => {
      let newState = { ...state };
      if (e.target.name === 'all') {
        newState = {
          listingCreate: e.target.checked,
          privacy: e.target.checked,
        };
      }
      newState = {
        ...newState,
        [e.target.name]: e.target.checked,
      };
      setState(newState);
      onChangeTermsState?.(newState);
    },
    [state, setState, onChangeTermsState],
  );

  const { listingCreate, privacy } = state;
  const all = listingCreate && privacy;

  if (isLoading) {
    return (
      <div tw="py-20">
        <Loading />
      </div>
    );
  }

  return (
    <div tw="h-full flex flex-col">
      <NavigationHeader>
        <NavigationHeader.Title>매물등록 동의</NavigationHeader.Title>
        <NavigationHeader.Button>
          <CloseIcon />
        </NavigationHeader.Button>
      </NavigationHeader>
      <div tw="flex-1 min-h-0 overflow-auto">
        <div tw="pt-7 pb-10 px-5">
          <div tw="text-b1 font-bold mb-1">신청 대상 부동산 주소</div>
          <div tw="text-b1">{address}</div>
        </div>
        <Separator />
        <div tw="py-10 px-5">
          <div tw="mb-4">
            <div tw="text-b1 font-bold mb-1">매물등록 신청 동의</div>
            <div tw="text-info text-gray-700">
              네고시오에 매물 등록을 동의하시면 아래 체크박스를 선택하시고 본인인증 및 동의 버튼을 눌러주세요.
            </div>
          </div>
          <div tw="rounded-lg shadow">
            <div tw="p-5 border-b border-b-gray-200">
              <div tw="flex items-center justify-between">
                <Label
                  control={<Checkbox name="all" />}
                  label="전체 동의"
                  tw="font-bold"
                  checked={all}
                  onChange={handleChangeState}
                />
                <div tw="flex items-center gap-1">
                  <ExclamationMark />
                  <div tw="text-info text-gray-700">필수 선택 항목입니다.</div>
                </div>
              </div>
            </div>
            <div tw="flex flex-col gap-4 p-5">
              <Label
                control={<Checkbox name="listingCreate" />}
                label="매물등록신청에 동의합니다."
                checked={listingCreate}
                onChange={handleChangeState}
              />
              <div tw="flex items-center justify-between">
                <Label
                  control={<Checkbox name="privacy" />}
                  label="개인정보 수집 동의"
                  checked={privacy}
                  onChange={handleChangeState}
                />
                <Button variant="ghost" size="none" tw="underline font-bold text-info text-gray-500">
                  보기
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <PersistentBottomBar>
        <Button disabled={!all} size="bigger" tw="w-full" onClick={onClickVerify}>
          본인인증 및 동의
        </Button>
      </PersistentBottomBar>
    </div>
  );
}
