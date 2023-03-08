import SearchIcon from '@/assets/icons/search.svg';
import { Autocomplete, TextField } from '@/components/molecules';
import { useKakaoAddressAutocomplete } from '@/hooks/services';
import { KakaoAddressAutocompleteResponseItem } from '@/hooks/services/useKakaoAddressAutocomplete';
import { useControlled } from '@/hooks/utils';
import { ChangeEventHandler, FormEventHandler, useCallback } from 'react';

interface MapSearchTextFieldProps {
  value?: string;
  onChange?: (value: string) => void;
  onSubmit?: (value: KakaoAddressAutocompleteResponseItem) => void;
}

export default function MapSearchTextField({
  value: valueProp,
  onSubmit,
  onChange,
}: MapSearchTextFieldProps) {
  const [value, setValueState] = useControlled({
    controlled: valueProp,
    default: '',
  });

  const handleInputValueChange = useCallback<
    ChangeEventHandler<HTMLInputElement>
  >(
    (e) => {
      setValueState(e.target.value);
      onChange?.(e.target.value);
    },
    [onChange, setValueState],
  );

  const results = useKakaoAddressAutocomplete(value);

  const handleSubmit = useCallback<FormEventHandler<HTMLFormElement>>(
    (e) => {
      e.preventDefault();
      if (results && results.length > 0) {
        onSubmit?.(results[0]);
      }
    },
    [results, onSubmit],
  );

  return (
    <form onSubmit={handleSubmit}>
      <Autocomplete value={value} onChange={handleInputValueChange}>
        <TextField tw="shadow">
          <TextField.Input placeholder="주소 또는 단지명을 입력하세요" />
          <TextField.Trailing>
            <button
              type="submit"
              tw="inline-flex items-center justify-center w-9 h-9 bg-nego rounded-lg hover:bg-nego-600 transition-colors"
            >
              <SearchIcon color="#fff" />
            </button>
          </TextField.Trailing>
        </TextField>
        <Autocomplete.Popper>
          <div tw="flex flex-col mt-2 w-full max-h-[600px] bg-white shadow rounded-lg overflow-y-auto">
            {results.map((result) => (
              <Autocomplete.Option
                key={result.id}
                value={result.placeName}
                onClick={() => onSubmit?.(result)}
                tw="p-4 gap-2 min-h-[74px] hover:bg-gray-200 rounded-lg text-start transition-colors"
              >
                <div tw="flex items-center justify-between">
                  <span tw="text-b2 text-gray-1000">{result.placeName}</span>
                  <span tw="text-info text-gray-700">기차역</span>
                </div>
                <div tw="text-info text-gray-700">
                  {result.roadAddressName || result.addressName}
                </div>
              </Autocomplete.Option>
            ))}
          </div>
        </Autocomplete.Popper>
      </Autocomplete>
    </form>
  );
}
