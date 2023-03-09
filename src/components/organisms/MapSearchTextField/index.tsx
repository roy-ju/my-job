import SearchIcon from '@/assets/icons/search.svg';
import { Autocomplete, TextField } from '@/components/molecules';
import { useKakaoAddressAutocomplete } from '@/hooks/services';
import { KakaoAddressAutocompleteResponseItem } from '@/hooks/services/useKakaoAddressAutocomplete';
import { useControlled } from '@/hooks/utils';
import {
  ChangeEvent,
  ChangeEventHandler,
  FormEventHandler,
  useCallback,
} from 'react';
import DeleteAllIcon from '@/assets/icons/delete_all.svg';

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

  const handleClearInput = useCallback(() => {
    handleInputValueChange({
      type: 'change',
      target: {
        value: '',
      },
    } as unknown as ChangeEvent<HTMLInputElement>);
  }, [handleInputValueChange]);

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
          <TextField.Trailing tw="flex items-center">
            {value.length > 0 && (
              <button
                onClick={handleClearInput}
                type="button"
                tw="inline-flex items-center justify-center w-5 h-5 mr-4"
              >
                <DeleteAllIcon />
              </button>
            )}
            <button
              type="submit"
              tw="inline-flex items-center justify-center w-9 h-9 bg-nego rounded-lg hover:bg-nego-600 transition-colors"
            >
              <SearchIcon color="#fff" />
            </button>
          </TextField.Trailing>
        </TextField>
        <Autocomplete.Popper>
          <div tw="flex flex-col py-2 mt-2 w-full max-h-[600px] bg-white shadow rounded-lg overflow-y-auto">
            {value.length < 1 && results.length < 1 && (
              <div tw="px-4 py-4">
                <p tw="text-b2 text-gray-1000 leading-none">
                  최근 검색 기록이 없습니다.
                </p>
              </div>
            )}

            {value.length > 0 && results.length < 1 && (
              <div tw="px-4 py-4">
                <p tw="mb-2 text-b2 text-gray-1000 leading-none">
                  검색 결과가 없습니다.
                </p>
                <p tw="text-info text-gray-700 leading-none">
                  검색어를 한 번 더 확인해 주세요.
                </p>
              </div>
            )}

            {results.map((result) => (
              <Autocomplete.Option
                key={result.id}
                value={result.placeName}
                onClick={() => onSubmit?.(result)}
                tw="p-4 gap-2 min-h-[74px] hover:bg-gray-200 text-start transition-colors"
              >
                <div tw="flex items-center justify-between">
                  <span tw="text-b2 text-gray-1000">{result.placeName}</span>
                  <span tw="text-info text-gray-700">
                    {result.categoryName}
                  </span>
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
