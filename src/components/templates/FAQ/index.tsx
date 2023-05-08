import { NavigationHeader, Dropdown } from '@/components/molecules';
import { useEffect, useMemo, useState } from 'react';
import { FaqList } from '@/components/organisms';
import useAPI_Internal_GetFaqList from '@/apis/internal/getFaq';
import { Loading } from '@/components/atoms';

export default function FAQ({ onClickBack }: { onClickBack?: () => void }) {
  const [category, setCategory] = useState('');

  const { data } = useAPI_Internal_GetFaqList();

  const categories = useMemo(() => {
    if (!data) return [];
    if (data) {
      return Object.keys(data);
    }
  }, [data]);

  useEffect(() => {
    if (categories?.length) setCategory(categories[0]);
  }, [categories]);

  if (!data) {
    return (
      <div tw="py-20">
        <Loading />
      </div>
    );
  }

  return (
    <div tw="flex flex-col h-full">
      <NavigationHeader>
        {onClickBack && <NavigationHeader.BackButton onClick={onClickBack} />}
        <NavigationHeader.Title>자주 묻는 질문</NavigationHeader.Title>
      </NavigationHeader>
      <div tw="px-5 bg-white pt-6 pb-10">
        <Dropdown value={category} onChange={setCategory} variant="outlined" size="big">
          {categories?.map((item) => (
            <Dropdown.Option key={item} value={item}>
              {item}
            </Dropdown.Option>
          ))}
        </Dropdown>
      </div>
      <div tw="h-3 bg-gray-100 shrink-0" />
      <div tw="py-5">
        <FaqList list={data?.[category] ?? []} />
      </div>
    </div>
  );
}
