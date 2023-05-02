import { NavigationHeader, Dropdown } from '@/components/molecules';
import { useState } from 'react';
import { FaqList } from '@/components/organisms';
import useAPI_Internal_GetFaqList from '@/apis/internal/getFaq';

export default function FAQ() {
  const [category, setCategory] = useState('거래에 참여하고 싶어요.');

  const { data } = useAPI_Internal_GetFaqList(category);

  return (
    <div tw="flex flex-col h-full">
      <NavigationHeader>
        <NavigationHeader.Title>자주 묻는 질문</NavigationHeader.Title>
      </NavigationHeader>
      <div tw="px-5 bg-white pt-6 pb-10">
        <Dropdown value={category} onChange={setCategory} variant="outlined" size="big">
          <Dropdown.Option value="매물을 등록하고 싶어요.">매물을 등록하고 싶어요.</Dropdown.Option>
          <Dropdown.Option value="거래 방법이 궁금해요.">거래 방법이 궁금해요.</Dropdown.Option>
          <Dropdown.Option value="원하는 매물을 찾고 싶어요.">원하는 매물을 찾고 싶어요.</Dropdown.Option>
          <Dropdown.Option value="서비스">서비스</Dropdown.Option>
          <Dropdown.Option value="신고">신고</Dropdown.Option>
          <Dropdown.Option value="채팅">채팅</Dropdown.Option>
          <Dropdown.Option value="회원정보">회원정보</Dropdown.Option>
          <Dropdown.Option value="서비스">서비스</Dropdown.Option>
          <Dropdown.Option value="신고">신고</Dropdown.Option>
          <Dropdown.Option value="채팅">채팅</Dropdown.Option>
        </Dropdown>
      </div>
      <div tw="h-3 bg-gray-100 shrink-0" />
      <div tw="py-5">
        <FaqList list={data} />
      </div>
    </div>
  );
}
