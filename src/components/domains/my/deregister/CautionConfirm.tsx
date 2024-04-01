import Ul from '@/components/atoms/Ul';

import { Title, SubTitle } from './widget/DeregisterWidget';

export default function CautionConfirm() {
  return (
    <>
      <Title>탈퇴를 진행하시기 위해</Title>

      <SubTitle>매물 등록을 취소해 주세요.</SubTitle>
      <Ul tw="mb-4">
        {[
          '등록이 완료된 매물이 있는 경우 탈퇴할 수 없어요.',
          '거래를 마무리해 주시거나, 매물등록을 취소해 주세요.',
          '등록을 신청 중인 매물 정보는 자동으로 삭제돼요.',
        ].map((item) => (
          <li key={item}>{item}</li>
        ))}
      </Ul>

      <SubTitle>거래가 성사된 매물은 거래를 완료해 주세요.</SubTitle>
      <Ul tw="mb-9">
        {[
          '가계약금이 입금된 상태의 매물거래 당사자는 탈퇴할 수 없어요.',
          '매물의 거래를 완료해 주시거나, 중개사님께 거래 무산을 요청해 주세요.',
        ].map((item) => (
          <li key={item}>{item}</li>
        ))}
      </Ul>

      <SubTitle>계약체결 7일 뒤에 가능해요.</SubTitle>
      <Ul tw="mb-9">
        <li>계약 체결된 매물이 있다면, 7일 뒤에 시도해 주세요.</li>
      </Ul>
    </>
  );
}
