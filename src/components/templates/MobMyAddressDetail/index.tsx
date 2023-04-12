import { Button } from '@/components/atoms';
import { NavigationHeader } from '@/components/molecules';
import AddressDetailForm from '@/components/organisms/AddressDetailForm';
import { ChangeEventHandler } from 'react';

export interface MobMyAddressDetailProps {
  addressLine1: string;
  addressLine2: string;
  errorMessage?: string;
  dong?: string;
  ho?: string;
  onChangeDong?: ChangeEventHandler<HTMLInputElement>;
  onChangeHo?: ChangeEventHandler<HTMLInputElement>;
  onSubmit?: () => void;
  onSearchAnotherAddress?: () => void;
}

export default function MobMyAddressDetail({
  addressLine1,
  addressLine2,
  errorMessage,
  dong,
  ho,
  onChangeDong,
  onChangeHo,
  onSubmit,
  onSearchAnotherAddress,
}: MobMyAddressDetailProps) {
  return (
    <div tw="fixed top-0 right-0 left-0 w-full max-w-mobile mx-auto h-full flex flex-col bg-white">
      <NavigationHeader>
        <NavigationHeader.BackButton onClick={onSearchAnotherAddress} />
        <NavigationHeader.Title>주소 등록</NavigationHeader.Title>
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
      <div tw="w-full px-5 py-4 bg-white shadow-persistentBottomBar">
        <Button variant="secondary" size="bigger" tw="w-full" onClick={onSubmit}>
          주소 등록하기
        </Button>
      </div>
    </div>
  );
}
