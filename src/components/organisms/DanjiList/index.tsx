import { ChangeEventHandler, FormEventHandler, useCallback, useMemo } from 'react';

import tw from 'twin.macro';

import { Separator, InfiniteScroll } from '@/components/atoms';

import { NavigationHeader, TextField } from '@/components/molecules';

import useControlled from '@/hooks/useControlled';

import useNegocioAddressAutocomplete from '@/hooks/services/useNegocioAddressAutocomplete';

import { RealestateTypeString } from '@/constants/strings';

import { SearchDanjiResponseItem } from '@/apis/danji/searchDanji';

import CloseIcon from '@/assets/icons/close_24.svg';

import SearchIcon from '@/assets/icons/search.svg';

function Guide() {
  return (
    <div tw="py-10 px-5">
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

export interface AddressSearchFormProps {
  isFilter?: boolean;
  query?: number;
  value?: string;
  onChange?: (value: string) => void;
  onSubmit?: (value: number) => void;
  onSubmitV2?: (value: SearchDanjiResponseItem) => void;
}

function AddressSearchForm({
  isFilter,
  query,
  value: valueProp,
  onChange,
  onSubmit,
  onSubmitV2,
}: AddressSearchFormProps) {
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

  const { results, handleChangePage } = useNegocioAddressAutocomplete(value);

  const handleSubmit = useCallback<FormEventHandler<HTMLFormElement>>((e) => {
    e.preventDefault();
  }, []);

  const convertedResults = useMemo(() => {
    if (isFilter && query) {
      return results.filter((ele) => ele.realestate_type === query);
    }
    return results;
  }, [query, isFilter, results]);

  return (
    <form tw="bg-white h-full flex flex-col rounded-b-[8px] overflow-hidden" onSubmit={handleSubmit}>
      <div tw="px-5 pt-6 pb-10">
        <div tw="leading-none font-bold mb-4">단지 검색</div>
        <TextField variant="outlined" size="medium">
          <TextField.Leading tw="pl-4 -mr-2">
            <SearchIcon />
          </TextField.Leading>
          <TextField.Input
            placeholder="주소 또는 단지명을 입력하세요."
            value={value}
            onChange={handleInputValueChange}
            autoComplete="off"
          />
        </TextField>
      </div>
      <Separator />
      <InfiniteScroll
        tw="flex-1 flex flex-col min-h-0 overflow-y-auto"
        onNext={results.length >= 10 ? handleChangePage : undefined}
      >
        {!results?.length && <Guide />}

        {convertedResults?.map((result) => (
          <button
            type="button"
            key={result.danji_id}
            onClick={() => {
              onSubmit?.(result.danji_id);
              onSubmitV2?.(result);
            }}
            tw="p-4 gap-2 min-h-[74px] hover:bg-gray-200 text-start transition-colors"
          >
            <div tw="flex items-center justify-between">
              <span tw="text-b2 text-gray-1000">{result.name}</span>
              <span tw="text-info text-gray-700">{RealestateTypeString[result.realestate_type]}</span>
            </div>
            {result.name && <div tw="text-info text-gray-700">{result.address}</div>}
          </button>
        ))}
      </InfiniteScroll>
    </form>
  );
}

const Container = tw.div`flex flex-col`;

function Header({ title = '단지 검색', onClickClose }: { title?: string; onClickClose?: () => void }) {
  return (
    <div>
      <NavigationHeader tw="bg-transparent px-5">
        <NavigationHeader.Title>{title}</NavigationHeader.Title>
        <NavigationHeader.Button onClick={onClickClose}>
          <CloseIcon />
        </NavigationHeader.Button>
      </NavigationHeader>
    </div>
  );
}

export default Object.assign(Container, { Header, AddressSearchForm });
