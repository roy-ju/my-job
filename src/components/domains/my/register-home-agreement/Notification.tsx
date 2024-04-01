import React from 'react';

export default function Notification() {
  return (
    <p tw="text-info text-gray-700 mt-6">
      - 정보 입력 시 정당한 소유자의 대리인으로서 신청한 것으로 간주합니다.
      <br />
      - 기입하시는 휴대폰 번호로 소유자 동의 요청 문자가 발송됩니다.
      <br />
      - 소유자의 본인인증 후 동의가 가능합니다.
      <br />- 휴대폰 번호는 소유자 확인 및 동의를 받기 위한 문자 전송을 위해서 사용 됩니다.
    </p>
  );
}
