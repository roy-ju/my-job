import { useState, useCallback, ChangeEventHandler, FormEventHandler, ChangeEvent } from 'react';

import tw from 'twin.macro';

import { Button } from '@/components/atoms';

import { Autocomplete, TextField } from '@/components/molecules';

import useMobileMapLayout from '@/hooks/useMobileMapLayout';

import useFullScreenDialog from '@/states/hooks/useFullScreenDialog';

import useMobKakaoAddressAutocomplete from '@/hooks/services/useMobKakaoAddressAutoComplete';

import storage from '@/storage/mob/stroage';

import { checkPlatform } from '@/utils/checkPlatform';

import SearchIconText from '@/assets/icons/search.svg';

import ChveronLeftIcon from '@/assets/icons/chevron_left_24.svg';

import Close from '@/assets/icons/close.svg';

import DeleteAllIcon from '@/assets/icons/delete_all.svg';

function Guide() {
  return (
    <div tw="p-4 mt-[1.5rem]">
      <div tw="text-b1 leading-none font-bold mb-3">이렇게 검색해보세요.</div>
      <div tw="h-14 flex flex-col justify-center">
        <div tw="text-b2 leading-none mb-2">도로명 + 건물번호</div>
        <div tw="text-info leading-none text-gray-700">예) 판교역로 235, 제주 첨단로 242</div>
      </div>
      <div tw="h-14 flex flex-col justify-center">
        <div tw="text-b2 leading-none mb-2">지역명(동/리) + 번지</div>
        <div tw="text-info leading-none text-gray-700">예) 삼평동 681, 제주 영평동 2181</div>
      </div>
      <div tw="h-14 flex flex-col justify-center">
        <div tw="text-b2 leading-none mb-2">아파트 단지명</div>
        <div tw="text-info leading-none text-gray-700">예) 광교중흥S클래스, 한화꿈에그린프레스티지</div>
      </div>
    </div>
  );
}

export function MobSearchMap() {
  const { handleMapSearch } = useMobileMapLayout();

  const [textValue, setTextValueState] = useState('');

  const results = useMobKakaoAddressAutocomplete(textValue);

  const handleInputValueChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (e) => {
      setTextValueState(e.target.value);
    },
    [setTextValueState],
  );

  const handleClearInput = useCallback(() => {
    handleInputValueChange({
      type: 'change',
      target: {
        value: '',
      },
    } as unknown as ChangeEvent<HTMLInputElement>);
  }, [handleInputValueChange]);

  const handleSubmit = useCallback<FormEventHandler<HTMLFormElement>>(
    (e) => {
      e.preventDefault();
      if (results && results.length > 0) {
        handleMapSearch?.(results[0]);
      }
    },
    [results, handleMapSearch],
  );

  const [recentSearches, setRecentSearches] = useState(
    storage.getRecentSearches().sort((a, b) => new Date(b.createdTime).getTime() - new Date(a.createdTime).getTime()),
  );

  const { closeAll } = useFullScreenDialog();

  return (
    <form onSubmit={handleSubmit}>
      <div tw="fixed top-0 left-auto right-auto w-full mx-auto bg-white">
        <div tw="w-full sticky top-0 left-auto right-auto flex items-center gap-3 pt-4 pb-3 pr-4 pl-4 bg-white">
          <Button variant="ghost" tw="px-0" onClick={closeAll}>
            <ChveronLeftIcon />
          </Button>
          <TextField variant="outlined" size="medium" tw="w-[100%]">
            <TextField.Leading tw="pl-4 -mr-2">
              <SearchIconText />
            </TextField.Leading>
            <TextField.Input
              placeholder="주소 또는 단지명을 입력하세요."
              value={textValue}
              onChange={handleInputValueChange}
              tw="border-gray-300"
            />
            <TextField.Trailing tw="flex items-center">
              {textValue.length > 0 && (
                <button
                  onClick={handleClearInput}
                  type="button"
                  tw="inline-flex items-center justify-center w-5 h-5 mr-4"
                >
                  <DeleteAllIcon />
                </button>
              )}
            </TextField.Trailing>
          </TextField>
        </div>

        <div
          tw="flex flex-col bg-white overflow-y-auto"
          css={[checkPlatform() === 'mobile' ? tw`h-[calc(100vh-12rem)]` : tw`h-[calc(100vh-4.75rem)]`]}
        >
          {!(recentSearches && recentSearches.length >= 1) && textValue.length === 0 && <Guide />}

          {textValue.length === 0 && recentSearches && recentSearches.length >= 1 && (
            <>
              <div tw="flex pt-7 pb-2 px-4 items-center justify-between">
                <span tw="font-bold [line-height: 0.875rem]">최근 검색</span>
                <Button
                  variant="ghost"
                  tw="h-0 p-0"
                  onClick={() => {
                    setRecentSearches([]);
                    storage.clearRecentSearches();
                  }}
                >
                  <span tw="text-gray-700 [text-decoration-line: underline]">전체 삭제</span>
                </Button>
              </div>

              {recentSearches.map(({ id, query }) => (
                <Autocomplete.Option
                  key={id}
                  value={query.placeName}
                  onClick={() => {
                    handleMapSearch?.(query);
                    closeAll();
                  }}
                  tw="p-4 gap-2 hover:bg-gray-200 text-start transition-colors"
                >
                  <div tw="flex items-center justify-between mb-2">
                    <span tw="text-b2 text-gray-1000 [line-height: 0.875rem]">{query.placeName}</span>
                    <Button
                      variant="ghost"
                      tw="px-0 py-0 h-0"
                      onClick={(e) => {
                        e?.stopPropagation();
                        setRecentSearches((prev) => prev.filter((p) => p.id !== id));
                        storage.removeRecentSearch(id);
                      }}
                    >
                      <Close style={{ color: '#ADB5BD' }} />
                    </Button>
                  </div>
                  <div tw="text-info text-gray-700 [line-height: 0.75rem]">
                    {query.roadAddressName || query.addressName}
                  </div>
                </Autocomplete.Option>
              ))}
            </>
          )}

          {textValue.length > 0 && results.length < 1 && (
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
                storage.addRecentSearch({ query: result });
                handleMapSearch?.(result);
                closeAll();
              }}
              tw="p-4 gap-2 hover:bg-gray-200 text-start transition-colors"
            >
              <div tw="flex items-center justify-between mb-2">
                <span tw="text-b2 text-gray-1000 [line-height: 0.875rem]">{result.placeName}</span>
                <span tw="text-info text-gray-700 [line-height: 0.875rem]">{result.categoryName}</span>
              </div>
              <div tw="text-info text-gray-700 [line-height: 0.75rem]">
                {result.roadAddressName || result.addressName}
              </div>
            </Autocomplete.Option>
          ))}
        </div>
      </div>
      {/* </div> */}
    </form>
  );
}

export default MobSearchMap;
