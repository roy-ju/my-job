import { Button } from '@/components/atoms';
import { NavigationHeader } from '@/components/molecules';
import AddressDetailForm from '@/components/organisms/AddressDetailForm';
import { ChangeEventHandler } from 'react';

export interface ListingCreateAddressDetailProps {
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

export default function ListingCreateAddressDetail({
  addressLine1,
  addressLine2,
  errorMessage,
  dong,
  ho,
  onChangeDong,
  onChangeHo,
  onSubmit,
  onSearchAnotherAddress,
}: ListingCreateAddressDetailProps) {
  return (
    <div tw="h-full flex flex-col relative">
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
        <div tw="px-5 mt-12">
          <Button size="bigger" tw="w-full" onClick={onSubmit}>
            다음
          </Button>
        </div>
      </div>
    </div>
  );
}
