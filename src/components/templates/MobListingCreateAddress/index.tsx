import { NavigationHeader } from '@/components/molecules';
import { AddressSearchForm } from '@/components/organisms';
import { KakaoAddressAutocompleteResponseItem } from '@/hooks/services/useKakaoAddressAutocomplete';

export interface MobListingCreateAddressProps {
  onSubmit?: (value: KakaoAddressAutocompleteResponseItem) => void;
  onClickBack?: () => void;
}

export default function MobListingCreateAddress({ onSubmit, onClickBack }: MobListingCreateAddressProps) {
  return (
    <div tw="w-full max-w-mobile mx-auto h-full flex flex-col bg-white">
      <NavigationHeader>
        <NavigationHeader.BackButton onClick={onClickBack} />
        <NavigationHeader.Title>매물등록 신청</NavigationHeader.Title>
      </NavigationHeader>
      <div tw="flex-1 min-h-0">
        <AddressSearchForm onSubmit={onSubmit} />
      </div>
    </div>
  );
}
