import { NavigationHeader } from '@/components/molecules';
import { AddressSearchForm } from '@/components/organisms';
import { KakaoAddressAutocompleteResponseItem } from '@/hooks/services/useKakaoAddressAutocomplete';

export interface MyAddressProps {
  onSubmit?: (value: KakaoAddressAutocompleteResponseItem) => void;
}

export default function MyAddress({ onSubmit }: MyAddressProps) {
  return (
    <div tw="h-full flex flex-col">
      <NavigationHeader>
        <NavigationHeader.Title>주소 등록</NavigationHeader.Title>
      </NavigationHeader>
      <div tw="flex-1 min-h-0">
        <AddressSearchForm onSubmit={onSubmit} />
      </div>
    </div>
  );
}
