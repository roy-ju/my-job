import { NavigationHeader } from '@/components/molecules';
import { AddressSearchForm } from '@/components/organisms';
import { KakaoAddressAutocompleteResponseItem } from '@/hooks/services/useKakaoAddressAutocomplete';

export interface ListingCreateAddressProps {
  onSubmit?: (value: KakaoAddressAutocompleteResponseItem) => void;
  onClickBack?: () => void;
}

export default function ListingCreateAddress({ onSubmit, onClickBack }: ListingCreateAddressProps) {
  return (
    <div tw="h-full flex flex-col">
      <NavigationHeader>
        {onClickBack && <NavigationHeader.BackButton onClick={onClickBack} />}
        <NavigationHeader.Title>매물등록 신청</NavigationHeader.Title>
      </NavigationHeader>
      <div tw="flex-1 min-h-0">
        <AddressSearchForm onSubmit={onSubmit} />
      </div>
    </div>
  );
}
