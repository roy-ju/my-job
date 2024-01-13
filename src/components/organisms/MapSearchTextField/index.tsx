import { ChangeEvent, ChangeEventHandler, useCallback } from 'react';

import { Button } from '@/components/atoms';

import { Autocomplete, TextField } from '@/components/molecules';

import useDanjiInteraction from '@/states/hooks/useDanjiInteraction';

import { useKakaoAddressAutocomplete } from '@/hooks/services';

import { KakaoAddressAutocompleteResponseItem } from '@/hooks/services/useKakaoAddressAutocomplete';

import { useControlled } from '@/hooks/utils';

import CloseIcon from '@/assets/icons/close.svg';

import DeleteAllIcon from '@/assets/icons/delete_all.svg';

import SearchIcon from '@/assets/icons/search.svg';

interface MapSearchTextFieldProps {
  value?: string;
  recentSearches?: KakaoAddressAutocompleteResponseItem[];
  onChange?: (value: string) => void;
  onSubmit?: (value: KakaoAddressAutocompleteResponseItem, isFromRecentSearch: boolean) => void;
  onClickRemoveAllRecentSearches?: () => void;
  onClickRemoveRecentSearch?: (id: string) => void;
}

export default function MapSearchTextField({
  value: valueProp,
  recentSearches,
  onSubmit,
  onChange,
  onClickRemoveAllRecentSearches,
  onClickRemoveRecentSearch,
}: MapSearchTextFieldProps) {
  const interactionStore = useDanjiInteraction({ danjiData: undefined });

  const [value, setValueState] = useControlled({
    controlled: valueProp,
    default: '',
  });

  const handleInputValueChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
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

  const handleSubmit = useCallback(() => {
    if (results && results.length > 0) {
      onSubmit?.(results[0], false);
    }
  }, [results, onSubmit]);

  const renderRecentSearches = () => {
    if (!recentSearches?.length) {
      return (
        <div tw="px-4 py-4">
          <p tw="text-b2 text-gray-1000 leading-none">최근 검색 기록이 없습니다.</p>
        </div>
      );
    }

    return (
      <div tw="pt-4">
        <div tw="flex items-center justify-between px-4">
          <span tw="text-b2 font-bold">최근 검색</span>
          <Button
            size="none"
            variant="ghost"
            tw="underline text-gray-700 text-info"
            onClick={onClickRemoveAllRecentSearches}
          >
            전체삭제
          </Button>
        </div>
        <div tw="flex flex-col py-2 mt-2 w-full">
          {recentSearches?.map((item) => (
            <Autocomplete.Option
              key={item.id}
              value={item.placeName}
              onClick={(e) => {
                e.stopPropagation();
                onSubmit?.(item, true);
                interactionStore.makeDataReset();
              }}
              tw="p-4 gap-2 min-h-[74px] hover:bg-gray-200 text-start transition-colors"
            >
              <div tw="flex items-center justify-between">
                <span tw="text-b2 text-gray-1000">{item.placeName || item.roadAddressName || item.addressName}</span>
                <span
                  role="presentation"
                  tw="text-gray-700"
                  onClick={(e) => {
                    e?.stopPropagation();
                    onClickRemoveRecentSearch?.(item.id);
                  }}
                >
                  <CloseIcon />
                </span>
              </div>
              {item.placeName && <div tw="text-info text-gray-700">{item.roadAddressName || item.addressName}</div>}
            </Autocomplete.Option>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div tw="shadow rounded-lg">
      <Autocomplete value={value} onChange={handleInputValueChange}>
        <TextField>
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
              type="button"
              onClick={handleSubmit}
              tw="inline-flex items-center justify-center w-9 h-9 bg-nego rounded-lg hover:bg-nego-600 transition-colors"
            >
              <SearchIcon color="#fff" />
            </button>
          </TextField.Trailing>
        </TextField>
        <Autocomplete.Popper>
          <div tw="flex flex-col py-2 mt-2 w-full max-h-[600px] bg-white shadow rounded-lg overflow-y-auto">
            {value.length < 1 && results.length < 1 && renderRecentSearches()}

            {value.length > 0 && results.length < 1 && (
              <div tw="px-4 py-4">
                <p tw="mb-2 text-b2 text-gray-1000 leading-none">검색 결과가 없습니다.</p>
                <p tw="text-info text-gray-700 leading-none">검색어를 한 번 더 확인해 주세요.</p>
              </div>
            )}

            {results.map((result) => (
              <Autocomplete.Option
                key={result.id}
                value={result.placeName}
                onClick={() => {
                  onSubmit?.(result, false);
                  interactionStore.makeDataReset();
                }}
                tw="p-4 gap-2 min-h-[74px] hover:bg-gray-200 text-start transition-colors"
              >
                <div tw="flex items-center justify-between">
                  <span tw="text-b2 text-gray-1000">
                    {result.placeName || result.roadAddressName || result.addressName}
                  </span>
                  <span tw="text-info text-gray-700">{result.categoryName}</span>
                </div>
                {result.placeName && (
                  <div tw="text-info text-gray-700">{result.roadAddressName || result.addressName}</div>
                )}
              </Autocomplete.Option>
            ))}
          </div>
        </Autocomplete.Popper>
      </Autocomplete>
    </div>
  );
}
