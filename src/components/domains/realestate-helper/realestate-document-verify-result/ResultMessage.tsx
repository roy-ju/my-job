import tw, { styled } from 'twin.macro';

import ErrorIcon from '@/assets/icons/error_20_filled.svg';
import { MarginTopEighty } from '@/components/atoms/Margin';

type ResultMessageProps = {
  type: 'findAddressOverTen' | 'notFoundAddress' | 'serviceError' | '';
};

const Row = styled.div`
  ${tw`flex flex-row gap-1 items-center w-full [background: rgba(255, 226, 228, 0.60)] [padding-block: 13px] px-5`}

  span {
    ${tw`text-red-800 text-body_02`}
  }
`;

const Column = styled.div`
  ${tw`flex flex-col w-full gap-2 px-5`}

  span {
    ${tw`text-display_01`}
  }

  p {
    ${tw`text-gray-700 text-body_03`}
  }
`;

export default function ResultMessage({ type }: ResultMessageProps) {
  if (type === 'findAddressOverTen') {
    return (
      <Row>
        <ErrorIcon />
        <span>다수의 등기부가 조회되었습니다.</span>
      </Row>
    );
  }

  if (type === 'notFoundAddress') {
    return (
      <Row>
        <ErrorIcon />
        <span>입력한 주소로 등기부 조회가 되지 않습니다.</span>
      </Row>
    );
  }

  if (type === 'serviceError') {
    return (
      <>
        <MarginTopEighty />
        <Column>
          <span>네트워크 오류</span>
          <p>
            예기치 않은 오류가 발생했습니다.
            <br />
            다음에 다시 시도해주세요.
          </p>
        </Column>
      </>
    );
  }

  return null;
}
