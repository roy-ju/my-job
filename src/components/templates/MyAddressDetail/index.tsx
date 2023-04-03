import { Button } from '@/components/atoms';
import { NavigationHeader } from '@/components/molecules';
import AddressDetailForm from '@/components/organisms/AddressDetailForm';

export interface MyAddressDetailProps {
  addressLine1: string;
  addressLine2: string;
  onSearchAnotherAddress?: () => void;
}

export default function MyAddressDetail({ addressLine1, addressLine2, onSearchAnotherAddress }: MyAddressDetailProps) {
  return (
    <div tw="h-full flex flex-col relative">
      <NavigationHeader>
        <NavigationHeader.BackButton onClick={onSearchAnotherAddress} />
        <NavigationHeader.Title>주소 등록</NavigationHeader.Title>
      </NavigationHeader>
      <div tw="flex-1 min-h-0">
        <AddressDetailForm
          addressLine1={addressLine1}
          addressLine2={addressLine2}
          onClickSearchAnotherAddress={onSearchAnotherAddress}
        />
      </div>
      <div tw="absolute left-0 bottom-0 w-full px-5 py-4 bg-white shadow-persistentBottomBar">
        <Button variant="secondary" size="bigger" tw="w-full">
          주소 등록하기
        </Button>
      </div>
    </div>
  );
}
