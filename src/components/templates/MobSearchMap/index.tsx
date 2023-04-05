import SearchIconText from '@/assets/icons/search.svg';

import { Autocomplete, TextField } from '@/components/molecules';

import useMapLayout from '@/layouts/Mobile/MapLayout/useMapLayout';

import ChveronLeftIcon from '@/assets/icons/chevron_left_24.svg';
import { Button } from '@/components/atoms';
import storage from '@/storage/stroage';
import { useState, useCallback, ChangeEventHandler, FormEventHandler } from 'react';
import { useKakaoAddressAutocomplete } from '@/hooks/services';
import useFullScreenDialogStore from '@/hooks/recoil/useFullScreenDialog';

function Guide() {
  return (
    <div>
      <div tw="text-b1 leading-none font-bold mb-3">이렇게 검색해 보세요</div>
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
  const { handleMapSearch } = useMapLayout();

  const [textValue, setTextValueState] = useState('');

  const results = useKakaoAddressAutocomplete(textValue);

  const handleInputValueChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (e) => {
      setTextValueState(e.target.value);
    },
    [setTextValueState],
  );

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

  const { closeAll } = useFullScreenDialogStore();

  return (
    <form onSubmit={handleSubmit}>
      <div tw="w-[100%] max-w-mobile mx-auto z-[1000] bg-white">
        <div tw="w-[100%] max-w-mobile fixed left-auto right-auto top-0 flex items-center gap-3 pt-4 pb-3 pr-4 pl-4 bg-white">
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
          </TextField>
        </div>
        <div tw="flex mt-[4.625rem] flex-col gap-3 pt-3 pb-3 pr-5 pl-5 overflow-y-auto">
          {textValue.length === 0 && <Guide />}
          {textValue.length < 1 && results.length < 1 && (
            <div tw="px-4 py-4">
              <p tw="text-b2 text-gray-1000 leading-none">최근 검색 기록이 없습니다.</p>
            </div>
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
              onClick={() => handleMapSearch?.(result)}
              tw="p-4 gap-2 min-h-[74px] hover:bg-gray-200 text-start transition-colors"
            >
              <div tw="flex items-center justify-between">
                <span tw="text-b2 text-gray-1000">{result.placeName}</span>
                <span tw="text-info text-gray-700">{result.categoryName}</span>
              </div>
              <div tw="text-info text-gray-700">{result.roadAddressName || result.addressName}</div>
            </Autocomplete.Option>
          ))}
        </div>
      </div>
    </form>
  );
}

export default MobSearchMap;
