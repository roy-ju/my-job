import { TextFieldV2 } from '@/components/molecules';

interface EmailProps {
  value: string;
}

export default function Email({ value }: EmailProps) {
  return (
    <div tw="px-5">
      <p tw="text-heading_01 mb-1">계정 이메일</p>
      <p tw="text-body_01 text-gray-700 mb-4">선택한 간편 로그인 서비스 계정의 이메일이 사용됩니다.</p>
      <TextFieldV2 variant="outlined">
        <TextFieldV2.Input label="이메일" disabled value={value} />
      </TextFieldV2>
    </div>
  );
}
