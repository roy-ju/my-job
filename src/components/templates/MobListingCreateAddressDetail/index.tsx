import { Button, PersistentBottomBar } from '@/components/atoms';
import { NavigationHeader } from '@/components/molecules';
import AddressDetailForm from '@/components/organisms/AddressDetailForm';
import { ChangeEventHandler } from 'react';

export interface MobListingCreateAddressDetailProps {
  addressLine1: string;
  addressLine2: string;
  errorMessage?: string;
  dong?: string;
  ho?: string;
  isLoading?: boolean;
  onChangeDong?: ChangeEventHandler<HTMLInputElement>;
  onChangeHo?: ChangeEventHandler<HTMLInputElement>;
  onSubmit?: () => void;
  onSearchAnotherAddress?: () => void;
}

export default function MobListingCreateAddressDetail({
  addressLine1,
  addressLine2,
  errorMessage,
  dong,
  ho,
  isLoading,
  onChangeDong,
  onChangeHo,
  onSubmit,
  onSearchAnotherAddress,
}: MobListingCreateAddressDetailProps) {
  return (
    <div tw="w-full max-w-mobile mx-auto h-full flex flex-col relative bg-white">
      <NavigationHeader>
        <NavigationHeader.BackButton onClick={onSearchAnotherAddress} />
        <NavigationHeader.Title>매물등록 신청</NavigationHeader.Title>
      </NavigationHeader>
      <div tw="flex-1 min-h-0 overflow-auto">
        <AddressDetailForm
          addressLine1={addressLine1}
          addressLine2={addressLine2}
          errorMessage={errorMessage}
          dong={dong}
          ho={ho}
          onChangeDong={onChangeDong}
          onChangeHo={onChangeHo}
          onClickSearchAnotherAddress={onSearchAnotherAddress}
        />
      </div>
      <PersistentBottomBar>
        <Button isLoading={isLoading} size="bigger" tw="w-full" onClick={onSubmit}>
          다음
        </Button>
      </PersistentBottomBar>
    </div>
  );
}
