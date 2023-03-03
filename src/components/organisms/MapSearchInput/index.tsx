import { ChangeEvent, ReactNode } from 'react';

import { Button, Input } from '@/components/atoms';
import Search from '@/assets/icons/search.svg';
import tw, { styled } from 'twin.macro';
import Close from '@/assets/icons/close.svg';
import DeleteAll from '@/assets/icons/delete_all.svg';

import {
  MapSearchInputProvider,
  useMapSearchInputAction,
  useMapSearchInputValue,
} from './MapSearchInputContext';

function MapSearchInput({ children }: { children: ReactNode }) {
  return (
    <MapSearchInputProvider>
      <div tw="w-fit drop-shadow-[0px 12px 20px rgba(0, 0, 0, 0.1)]">
        {children}
      </div>
    </MapSearchInputProvider>
  );
}

function SearchInput({
  onChange,
  onClickButton,
}: {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onClickButton?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
}) {
  const { setFocused, setInputValue } = useMapSearchInputAction();
  const { inputValue } = useMapSearchInputValue();

  // to do : add debounce
  return (
    <Input
      value={inputValue || ''}
      divStyle={tw`w-[23.75rem] flex justify-between`}
      placeholder="주소 또는 단지명을 입력하세요"
      onFocus={() => setFocused(true)}
      // onBlur={() => setFocused(false)}
      onChange={(e) => {
        setInputValue(e.currentTarget.value);
        onChange(e);
      }}
    >
      <div tw="flex items-center gap-4">
        {inputValue && (
          <button type="button" onClick={() => setInputValue('')}>
            <DeleteAll />
          </button>
        )}
        <Button
          theme="secondary"
          custom={tw`h-[2.25rem] px-[0.625rem]`}
          onClick={onClickButton}
        >
          <Search />
        </Button>
      </div>
    </Input>
  );
}

/** 최근 검색 목록 */
function CurrentSearch({
  currentSearchList,
  onClickClose,
  onClickItem,
}: {
  currentSearchList?: any[];
  onClickClose: () => void;
  onClickItem?: () => void;
}) {
  const { isFocused, inputValue } = useMapSearchInputValue();

  // 포커스 되었고 / input value가 없을 때만 최근 검색 목록을 보여준다.
  if (!isFocused || !!inputValue) return null;

  return (
    <div tw="w-[23.75rem]  bg-white mt-2 rounded-[0.5rem] py-2">
      {currentSearchList ? (
        <div>
          <div tw="flex items-center justify-between px-4 pt-4 pb-2 ">
            <span tw="text-b2 font-bold">최근 검색</span>
            <button type="button">
              <span tw="text-info text-gray-700 underline">전체삭제</span>
            </button>
          </div>
          <div tw="h-fit max-h-[43rem] flex-none overflow-y-auto">
            <button
              type="button"
              tw="w-full flex flex-col p-4 hover:bg-gray-200 "
              onClick={onClickItem}
            >
              <div tw="w-full flex items-center justify-between mb-2">
                <span tw="text-b2 leading-[14px]">죽전아이뷰아파트</span>
                <Close
                  onClick={(e: any) => {
                    e.stopPropagation();
                    onClickClose();
                  }}
                />
              </div>
              <span tw="text-info leading-[12px] text-gray-700">
                경기 용인시 수지구 현암로 3
              </span>
            </button>
          </div>
        </div>
      ) : (
        <div tw="px-4 py-4">
          <span tw="text-b2">최근 검색 기록이 없습니다.</span>
        </div>
      )}
    </div>
  );
}

const Container = styled.div`
  border-radius: 0px;
  button:first-of-type {
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }
`;

/** 검색 결과 목록 */
function SearchList({
  SearchItemList,
  onClickItem,
}: {
  SearchItemList?: any[];
  onClickItem?: () => void;
}) {
  const { isFocused, inputValue } = useMapSearchInputValue();

  // 포커스 되었고 / input value가 있을 때만 검색 결과 목록을 보여준다.
  if (!isFocused || !inputValue || inputValue === '') return null;

  return (
    <div tw="w-[23.75rem] min-h-[4.1rem] h-fit bg-white mt-2 rounded-[0.5rem] pb-2">
      {!SearchItemList ? (
        <Container tw="h-fit max-h-[43rem] flex-none overflow-y-auto">
          <button
            type="button"
            tw="w-full flex flex-col p-4 hover:bg-gray-200"
            onClick={onClickItem}
          >
            <div tw="w-full flex items-center justify-between mb-2">
              <span tw="text-b2 leading-[14px]">판교역</span>
              <span tw="text-info text-gray-700 leading-[12px]">기차역</span>
            </div>
            <span tw="text-info text-gray-700 leading-[12px]">
              경기 성남시 분당구 현암로 3
            </span>
          </button>
          <button
            type="button"
            tw="w-full flex flex-col p-4 hover:bg-gray-200"
            onClick={onClickItem}
          >
            <div tw="w-full flex items-center justify-between mb-2">
              <span tw="text-b2 leading-[14px]">판교역</span>
              <span tw="text-info text-gray-700 leading-[12px]">기차역</span>
            </div>
            <span tw="text-info text-gray-700 leading-[12px]">
              경기 성남시 분당구 현암로 3
            </span>
          </button>
        </Container>
      ) : (
        <div tw="flex flex-col px-4 pt-6 pb-4 ">
          <span tw="text-b2">검색 결과가 없습니다.</span>
          <span tw="text-info text-gray-700">
            검색어를 한 번 더 확인해 주세요.
          </span>
        </div>
      )}
    </div>
  );
}

MapSearchInput.SearchInput = SearchInput;
MapSearchInput.CurrentSearch = CurrentSearch;
MapSearchInput.SearchList = SearchList;

export default MapSearchInput;
