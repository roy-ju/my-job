import { NavigationHeader, Table } from '@/components/molecules';
import CloseIcon from '@/assets/icons/close_24.svg';
import ExclamationMark from '@/assets/icons/exclamation_mark_outlined.svg';
import { Button, Checkbox, Label, Loading, Numeral, PersistentBottomBar, Separator } from '@/components/atoms';
import { useControlled } from '@/hooks/utils';
import { ChangeEventHandler, useCallback } from 'react';
import tw, { styled } from 'twin.macro';
import { BuyOrRentString } from '@/constants/strings';
import { BuyOrRent } from '@/constants/enums';
import { useRouter } from 'next/router';
import Routes from '@/router/routes';

const StyledTable = styled.table`
  ${tw`w-full text-b2`}
  th {
    ${tw`py-1 text-gray-1000`}
    width: unset;
    white-space: nowrap;
  }
  td {
    ${tw`py-1 text-end`}
    width: unset;
    word-break: keep-all;
  }
  tr:not(:last-of-type) {
    ${tw`border-b border-b-gray-300`}
  }
`;

export interface TermsState {
  listingCreate: boolean;
  privacy: boolean;
}

export interface OwnerVerificationProps {
  isLoading?: boolean;
  address?: string;
  requestorName?: string;
  buyOrRent?: number;
  price?: number;
  monthlyRentFee?: number;
  termsState?: TermsState;
  onChangeTermsState?: (newState: TermsState) => void;
  onClickVerify?: () => void;
}

export default function OwnerVerification({
  isLoading,
  address,
  requestorName,
  buyOrRent,
  price,
  monthlyRentFee,
  termsState,
  onChangeTermsState,
  onClickVerify,
}: OwnerVerificationProps) {
  const router = useRouter();

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
        <NavigationHeader.Button onClick={() => router.replace(`/${Routes.EntryMobile}`)}>
          <CloseIcon />
        </NavigationHeader.Button>
      </NavigationHeader>
      <div tw="flex-1 min-h-0 overflow-auto">
        <div
          tw="h-[200px] bg-no-repeat bg-cover bg-center"
          style={{
            backgroundImage: `url('https://negocio-common.s3.ap-northeast-2.amazonaws.com/user_mobile/owner_banner.png')`,
          }}
        />
        <div tw="pt-7 pb-10 px-5">
          <div tw="text-b1 font-bold mb-1">매물등록 동의 정보</div>
          <StyledTable>
            <Table.Body>
              <Table.Row>
                <Table.Head>
                  신청 대상
                  <br />
                  부동산 주소
                </Table.Head>
                <Table.Data>{address}</Table.Data>
              </Table.Row>
              <Table.Row>
                <Table.Head>등록 요청자</Table.Head>
                <Table.Data>{requestorName}</Table.Data>
              </Table.Row>
              <Table.Row>
                <Table.Head>거래 유형</Table.Head>
                <Table.Data>{BuyOrRentString[buyOrRent ?? 0]}</Table.Data>
              </Table.Row>
              <Table.Row>
                <Table.Head>거래 가격</Table.Head>
                <Table.Data>
                  {buyOrRent === BuyOrRent.Buy && (
                    <span>
                      매매가: <Numeral koreanNumber>{price ?? 0}</Numeral>
                    </span>
                  )}
                  {buyOrRent === BuyOrRent.Jeonsae && (
                    <span>
                      전세가: <Numeral koreanNumber>{price ?? 0}</Numeral>
                    </span>
                  )}
                  {buyOrRent === BuyOrRent.Wolsae && (
                    <span>
                      보증금: <Numeral koreanNumber>{price ?? 0}</Numeral>
                      월차임: <Numeral koreanNumber>{monthlyRentFee ?? 0}</Numeral>
                    </span>
                  )}
                </Table.Data>
              </Table.Row>
            </Table.Body>
          </StyledTable>
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
        <Button variant="secondary" disabled={!all} size="bigger" tw="w-full" onClick={onClickVerify}>
          본인인증 및 동의
        </Button>
      </PersistentBottomBar>
    </div>
  );
}
