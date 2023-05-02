import { Button, Loading, PersistentBottomBar, Separator } from '@/components/atoms';
import { NavigationHeader } from '@/components/molecules';
import { AgentCardItem, ListingCreateResultStatus, TransactionCondition } from '@/components/organisms';
import { AgentCarouselItem } from '@/components/organisms/AgentCardCarousel';
import { AddressListItem } from '@/components/organisms/ListingCreateResultStatus/MultipleAddressesFound';
import { ListingStatus } from '@/constants/enums';

export interface ListingCreateResultProps {
  isLoading: boolean;

  agentOfficeName?: string;
  agentProfileImageFullPath?: string;
  agentName?: string;
  agentCellPhone?: string;
  agentJibunAddress?: string;
  agentRegistrationNumber?: string;
  agentDescription?: string;

  listingStatus?: number;

  addressLine1?: string;
  addressLine2?: string;

  buyOrRent?: number;
  tradePrice?: number;
  deposit?: number;
  monthlyRentFee?: number;
  interimAmount1?: number;
  interimAmount2?: number;
  interimAmount3?: number;
  interimAmountNegotiable1?: boolean;
  interimAmountNegotiable2?: boolean;
  interimAmountNegotiable3?: boolean;
  interimAmountPaymentTime1?: string;
  interimAmountPaymentTime2?: string;
  interimAmountPaymentTime3?: string;
  interimAmountPaymentTimeType1?: number;
  interimAmountPaymentTimeType2?: number;
  interimAmountPaymentTimeType3?: number;
  contractAmount?: number;
  contractAmountNegotiable?: boolean;
  remainingAmount?: number;
  remainingAmountPaymentTime?: string;
  remainingAmountPaymentTimeType?: number;
  debtSuccessions?: { name: string; amount: number }[];
  collaterals?: { name: string; amount: number }[];
  moveInDate?: string;
  moveInDateType?: number;
  rentTermYear?: number;
  rentTermMonth?: number;
  rentArea?: string;
  specialTerms?: string;
  jeonsaeLoan?: boolean;

  addressList?: AddressListItem[];
  agents?: AgentCarouselItem[];

  isSendingSms?: boolean;

  ownerName?: string;
  ownerPhone?: string;

  onClickMyListings?: () => void;
  onClickUpdateAddress?: () => void;
  onSelectAddress?: (realestateUniqueNumber: string) => void;
  onSelectAgent?: (index: number) => void;
  onClickStartOver?: () => void;
  onClickRemoveFromListings?: () => void;
  onClickSendOwnerVerification?: (name: string, phone: string) => void;
}

export default function ListingCreateResult({
  isLoading,
  agentOfficeName,
  agentProfileImageFullPath = '',
  agentName,
  agentCellPhone,
  agentJibunAddress,
  agentDescription,
  agentRegistrationNumber,
  listingStatus,
  addressLine1,
  addressLine2,
  addressList,
  agents,
  isSendingSms,

  ownerName,
  ownerPhone,

  onClickMyListings,
  onClickUpdateAddress,
  onSelectAddress,
  onSelectAgent,
  onClickStartOver,
  onClickRemoveFromListings,
  onClickSendOwnerVerification,
  ...conditionItemProps
}: ListingCreateResultProps) {
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
        <NavigationHeader.Title>매물등록 신청 결과</NavigationHeader.Title>
      </NavigationHeader>
      <div tw="flex-1 pb-10 min-h-0 overflow-auto">
        <div tw="pt-6 pb-10">
          {listingStatus === ListingStatus.VerifyOwnershipNotFound && (
            <ListingCreateResultStatus.VerifyOwnershipNotFound
              isLoading={isSendingSms}
              onClickSend={onClickSendOwnerVerification}
            />
          )}
          {listingStatus === ListingStatus.WaitingForOwnerAgreement && (
            <ListingCreateResultStatus.WaitingForOwnerAgreement
              ownerName={ownerName}
              ownerPhone={ownerPhone}
              isLoading={isSendingSms}
              onClickSend={onClickSendOwnerVerification}
            />
          )}
          {(listingStatus === ListingStatus.VerifyAddress || listingStatus === ListingStatus.VerifyOwnership) && (
            <ListingCreateResultStatus.VerifyingAddress />
          )}
          {listingStatus === ListingStatus.WaitingForAgentCompletion && (
            <ListingCreateResultStatus.WaitingForAgentCompletion />
          )}
          {listingStatus === ListingStatus.NoAddressFound && (
            <ListingCreateResultStatus.NoAddressFound
              addressLine1={addressLine1 ?? ''}
              addressLine2={addressLine2 ?? ''}
              onClickStartOver={onClickStartOver}
              onClickUpdateAddress={onClickUpdateAddress}
            />
          )}
          {listingStatus === ListingStatus.Duplicated && (
            <ListingCreateResultStatus.Duplicated
              addressLine1={addressLine1 ?? ''}
              addressLine2={addressLine2 ?? ''}
              buyOrRent={conditionItemProps.buyOrRent ?? 0}
              rentArea={conditionItemProps.rentArea}
            />
          )}
          {listingStatus === ListingStatus.MultipleAddressesFound && (
            <ListingCreateResultStatus.MultipleAddressesFound
              addressLine1={addressLine1 ?? ''}
              addressLine2={addressLine2 ?? ''}
              addressList={addressList}
              onClickItem={onSelectAddress}
            />
          )}
          {listingStatus === ListingStatus.AgentSelection && agents && (
            <ListingCreateResultStatus.AgentSelection agents={agents} onClickNext={onSelectAgent} />
          )}
        </div>
        <Separator />
        {agentName && (
          <div tw="py-10 px-5">
            <div tw="text-b1 font-bold mb-4">중개사 정보</div>
            <div tw="rounded-xl bg-gray-100">
              <AgentCardItem defaultExpanded>
                <AgentCardItem.Profile
                  officeName={agentOfficeName}
                  profileImageFullPath={agentProfileImageFullPath}
                  name={agentName}
                />
                <AgentCardItem.Detail
                  cellPhone={agentCellPhone}
                  fullJibunAddress={agentJibunAddress}
                  registrationNumber={agentRegistrationNumber}
                  description={agentDescription}
                />
                <AgentCardItem.FoldButton />
              </AgentCardItem>
            </div>
          </div>
        )}
        <Separator />
        <div tw="px-5">
          <div tw="mt-10 mb-4 text-b1 font-bold leading-none">거래조건</div>
          <TransactionCondition>
            <TransactionCondition.List>
              {!!conditionItemProps.buyOrRent && <TransactionCondition.Item label="거래종류" {...conditionItemProps} />}
              {!!(conditionItemProps.tradePrice || conditionItemProps.deposit) && (
                <TransactionCondition.Item label="희망가" {...conditionItemProps} />
              )}

              {!!(
                conditionItemProps.contractAmount ||
                conditionItemProps.interimAmount1 ||
                conditionItemProps.remainingAmount ||
                conditionItemProps.tradePrice ||
                conditionItemProps.deposit
              ) && (
                <TransactionCondition.Section title="지급일정" hasToolTip>
                  {!!conditionItemProps.contractAmount && (
                    <TransactionCondition.Item label="계약금" {...conditionItemProps} />
                  )}
                  {!!conditionItemProps.interimAmount1 && (
                    <TransactionCondition.Item label="중도금" {...conditionItemProps} />
                  )}
                  {!!conditionItemProps.remainingAmount && (
                    <TransactionCondition.Item label="잔금" {...conditionItemProps} />
                  )}
                  {!!(conditionItemProps.tradePrice || conditionItemProps.deposit) && (
                    <TransactionCondition.Item label="실제지급총액" {...conditionItemProps} />
                  )}
                </TransactionCondition.Section>
              )}

              {!!conditionItemProps.collaterals?.length && (
                <TransactionCondition.Section title="선순위 담보권" hasToolTip>
                  <TransactionCondition.Item label="선순위담보권" {...conditionItemProps} />
                </TransactionCondition.Section>
              )}
              {!!conditionItemProps.debtSuccessions?.length && (
                <TransactionCondition.Section title="채무승계 희망금액" hasToolTip>
                  <TransactionCondition.Item label="채무승계희망금액" {...conditionItemProps} />
                </TransactionCondition.Section>
              )}

              <TransactionCondition.Section title="세부정보">
                {conditionItemProps.moveInDate && (
                  <TransactionCondition.Item label="입주가능시기" {...conditionItemProps} />
                )}
                {conditionItemProps.jeonsaeLoan && (
                  <TransactionCondition.Item label="전세자금대출" {...conditionItemProps} />
                )}
                {(conditionItemProps.rentTermYear || conditionItemProps.rentTermMonth) && (
                  <TransactionCondition.Item label="임대기간" {...conditionItemProps} />
                )}
                <TransactionCondition.Item label="임대할부분" {...conditionItemProps} />
              </TransactionCondition.Section>

              {!!conditionItemProps.specialTerms && (
                <TransactionCondition.Item label="특약조건" {...conditionItemProps} />
              )}
            </TransactionCondition.List>
          </TransactionCondition>
        </div>
        {/* <div tw="py-10 flex items-center justify-center">
          <Button variant="ghost" size="none" tw="underline text-info" onClick={() => {}}>
            입력정보 수정/중개사 재선택
          </Button>
        </div> */}
      </div>
      <PersistentBottomBar>
        {listingStatus !== ListingStatus.Duplicated ? (
          <Button size="bigger" tw="w-full" onClick={onClickMyListings}>
            나의 거래 목록
          </Button>
        ) : (
          <Button size="bigger" tw="w-full" onClick={onClickRemoveFromListings}>
            목록에서 삭제
          </Button>
        )}
      </PersistentBottomBar>
    </div>
  );
}
