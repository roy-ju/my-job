import { ChangeEvent } from 'react';

import { TextFieldV2 } from '@/components/molecules';

import SearchIcon from '@/assets/icons/search_24_2.svg';

import { KakaoAddressAutocompleteResponseItem } from '@/hooks/services/useKakaoAddressAutocomplete';

import { SearchWrraper } from './widget/RealestateDocumentSearchAddressWidget';

type SearchProps = {
  value: string;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit?: (value: KakaoAddressAutocompleteResponseItem) => void;
};

export default function Search({ value, handleChange }: SearchProps) {
  return (
    <SearchWrraper>
      <TextFieldV2 variant="outlined" borderType="gray">
        <TextFieldV2.Leading tw="pl-4">
          <SearchIcon />
        </TextFieldV2.Leading>
        <TextFieldV2.Input
          id="realesate-document-search-address"
          value={value}
          onChange={handleChange}
          tw="py-4 pl-3 h-6 placeholder-gray-600"
          placeholder="주소 또는 단지명을 입력하세요."
          autoComplete="off"
        />
      </TextFieldV2>
    </SearchWrraper>
  );
}
