import useAPI_Internal_GetFaqList from '@/apis/internal/getFaq';
import { Loading } from '@/components/atoms';
import { Dropdown } from '@/components/molecules';
import { FaqList, MobGlobalHeader } from '@/components/organisms';
import { useEffect, useMemo, useState } from 'react';

export default function MobFAQ() {
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
      <MobGlobalHeader title="자주 묻는 질문" />
      <div tw="px-5 bg-white pt-6 pb-10 mt-[3.5rem]">
        <Dropdown value={category} onChange={setCategory} variant="outlined" size="big">
          {categories?.map((item) => (
            <Dropdown.Option key={item} value={item}>
              {item}
            </Dropdown.Option>
          ))}
        </Dropdown>
      </div>
      <div tw="h-3 bg-gray-100 shrink-0" />
      <div tw="py-5 flex-1 min-h-0 overflow-auto">
        <FaqList list={data?.[category] ?? []} />
      </div>
    </div>
  );
}
