import { RegisterSuccessType } from './types';

type MessageProps = { type: RegisterSuccessType };

export default function Message({ type }: MessageProps) {
  if (!type) return null;

  return (
    <div tw="px-5">
      {type === 'onlyLogin' ? (
        <p tw="text-display_01 mt-20 mb-2">회원가입이 완료되었어요!</p>
      ) : (
        <p tw="text-display_01 mt-20 mb-2">
          회원가입이 완료되었어요!
          <br />
          하지만...
        </p>
      )}
      {type === 'onlyLogin' ? (
        <p tw="text-body_03 text-gray-700">
          지금 바로 네고시오에서
          <br />
          다양한 부동산 서비스를 이용해보세요!
        </p>
      ) : (
        <p tw="text-body_03 text-gray-700">
          본인 인증을 완료해야 이 서비스를 이용할 수 있어요!
          <br />
          지금 <span tw="text-nego-800 text-subhead_03">본인인증</span> 하러 갈까요?
        </p>
      )}
    </div>
  );
}
