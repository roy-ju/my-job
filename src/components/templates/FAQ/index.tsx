import { NavigationHeader, Dropdown } from '@/components/molecules';
import { useState } from 'react';
import List from './List';

export default function FAQ() {
  const [selectedValue, setSelectedValue] = useState('거래에 참여하고 싶어요.');

  return (
    <div tw="flex flex-col h-full">
      <NavigationHeader>
        <NavigationHeader.Title>자주 묻는 질문</NavigationHeader.Title>
      </NavigationHeader>
      <div tw="px-5 bg-white pt-6 pb-10">
        <Dropdown value={selectedValue} onChange={setSelectedValue} variant="outlined" size="big">
          <Dropdown.Option value="거래에 참여하고 싶어요.">거래에 참여하고 싶어요.</Dropdown.Option>
          <Dropdown.Option value="매물을 내놓고 싶어요.">매물을 내놓고 싶어요.</Dropdown.Option>
          <Dropdown.Option value="회원정보">회원정보</Dropdown.Option>
          <Dropdown.Option value="기타">기타</Dropdown.Option>
          <Dropdown.Option value="네고머니">네고머니</Dropdown.Option>
          <Dropdown.Option value="매물찾기">매물찾기</Dropdown.Option>
          <Dropdown.Option value="서비스">서비스</Dropdown.Option>
          <Dropdown.Option value="신고">신고</Dropdown.Option>
          <Dropdown.Option value="채팅">채팅</Dropdown.Option>
        </Dropdown>
      </div>
      <div tw="h-3 bg-gray-100 shrink-0" />
      <List />
    </div>
  );
}
