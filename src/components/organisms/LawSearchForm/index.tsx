import { TextField } from '@/components/molecules';
import SearchIcon from '@/assets/icons/search.svg';
import { Button } from '@/components/atoms';
import { ChangeEventHandler, FormEventHandler, useCallback, useState } from 'react';
import DeleteAllIcon from '@/assets/icons/delete_all.svg';

import useControlled from '@/hooks/useControlled';
import storage from '@/storage/recentLawQnaSearch';
import Close from '@/assets/icons/close.svg';

import ChevronLeftIcon from '@/assets/icons/chevron_left_24.svg';
import { useRouter } from 'next/router';

function BackButton({ onClick }: { onClick?: () => void }) {
  return (
    <button type="button" onClick={onClick} tw="h-full pr-3">
      <ChevronLeftIcon tw="text-inherit" />
    </button>
  );
}

export interface LawSearchFormProps {
  value?: string;
  onChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
  onClickBack?: () => void;
}

export default function LawSearchForm({ value: valueProp, onChange, onSubmit, onClickBack }: LawSearchFormProps) {
  const router = useRouter();

  const [recentSearches, setRecentSearches] = useState(
    storage.getRecentSearches().sort((a, b) => new Date(b.createdTime).getTime() - new Date(a.createdTime).getTime()),
  );

  const [value, setValueState] = useControlled({
    controlled: valueProp,
    default: router?.query?.q ? (router.query.q as string) : '',
  });

  const handleInputValueChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (e) => {
      setValueState(e.target.value);
      onChange?.(e.target.value);
    },
    [onChange, setValueState],
  );

  const handleSubmit = useCallback<FormEventHandler<HTMLFormElement>>(
    (e) => {
      e.preventDefault();
      // 엔터키를 이용한 submit 이 사용자에게 어색한 경험을 주는듯하여 뺀다

      if (value) {
        storage.addRecentSearch({ query: { search: value } });
      }

      onSubmit?.(value);
    },
    [onSubmit, value],
  );

  const handleClearRecentSearches = useCallback(() => {
    setRecentSearches([]);
    storage.clearRecentSearches();
  }, []);

  return (
    <form tw="bg-white h-full flex flex-col" onSubmit={handleSubmit}>
      <div tw="flex flex-row items-center px-5 pt-6 pb-10">
        {onClickBack && <BackButton onClick={onClickBack} />}
        <TextField variant="outlined" size="medium" tw="[width: 100%]">
          <TextField.Leading tw="pl-4 -mr-2">
            <SearchIcon />
          </TextField.Leading>
          <TextField.Input
            placeholder="검색어를 입력해 주세요."
            value={value}
            onChange={handleInputValueChange}
            autoComplete="off"
          />
          {value && (
            <TextField.Trailing tw="w-5 h-5 mr-4">
              <button
                onClick={() => {
                  setValueState('');
                }}
                type="button"
                tw="inline-flex items-center justify-center w-5 h-5"
              >
                <DeleteAllIcon />
              </button>
            </TextField.Trailing>
          )}
        </TextField>
      </div>

      <div tw="flex-1 flex flex-col min-h-0 overflow-y-auto">
        <div tw="px-5 pb-2 flex items-center">
          <p tw="text-b2 [line-height: 1] [letter-spacing: -0.4px] font-bold whitespace-nowrap">최근 검색</p>
          <Button variant="ghost" tw="ml-auto p-0 h-0" onClick={handleClearRecentSearches}>
            <p tw="text-info text-gray-700 [line-height: 1] [letter-spacing: -0.4px] [text-decoration: underline]">
              전체삭제
            </p>
          </Button>
        </div>

        {recentSearches &&
          recentSearches.length > 0 &&
          recentSearches.map((result) => (
            <button
              type="button"
              key={result.id}
              value={result.query.search}
              onClick={(e) => {
                onSubmit?.(e.currentTarget.value);
              }}
              tw="p-4 px-5 gap-2 min-h-[0px] hover:bg-gray-200 text-start transition-colors"
            >
              <div tw="flex items-center justify-between">
                <span tw="text-b2 [line-height: 16px] text-gray-1000">{result.query.search}</span>

                <Button
                  variant="ghost"
                  tw="min-h-0 h-0 p-0 pl-3"
                  onClick={(e) => {
                    e?.stopPropagation();
                    setRecentSearches((prev) => prev.filter((p) => p.id !== result.id));
                    storage.removeRecentSearch(result.id);
                  }}
                >
                  <Close style={{ color: '#ADB5BD' }} />
                </Button>
              </div>
            </button>
          ))}

        {(!recentSearches || (recentSearches && recentSearches.length === 0)) && (
          <div tw="px-5 py-5">
            <p tw="mb-2 text-b2 text-gray-1000 leading-none text-left">최근 검색어가 없습니다.</p>
          </div>
        )}
      </div>
    </form>
  );
}
