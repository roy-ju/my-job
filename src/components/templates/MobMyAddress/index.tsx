import { NavigationHeader } from '@/components/molecules';
import { AddressSearchForm } from '@/components/organisms';
import { KakaoAddressAutocompleteResponseItem } from '@/hooks/services/useKakaoAddressAutocomplete';

export interface MyAddressProps {
  onClickBack?: () => void;
  onSubmit?: (value: KakaoAddressAutocompleteResponseItem) => void;
}

export default function MobMyAddress({ onSubmit, onClickBack }: MyAddressProps) {
  return (
    <div tw="w-full mx-auto h-full flex flex-col bg-white">
      <NavigationHeader>
        <NavigationHeader.BackButton onClick={onClickBack} />
        <NavigationHeader.Title>우리집 등록</NavigationHeader.Title>
      </NavigationHeader>
      <div tw="flex-1 min-h-0 overflow-auto">
        <AddressSearchForm onSubmit={onSubmit} />
      </div>
    </div>
  );
}
