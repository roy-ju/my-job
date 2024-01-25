import tw, { styled } from 'twin.macro';

import ButtonV2 from '@/components/atoms/ButtonV2';

const CtasContainer = styled.div`
  ${tw`flex flex-col w-full gap-3 px-5 pb-3`}
`;

const CTAButton = styled(ButtonV2)``;

CTAButton.defaultProps = {
  size: 'bigger',
};

export default function Ctas() {
  return (
    <CtasContainer>
      <CTAButton tw="w-full">좋아요, 본인 인증하기</CTAButton>
      <CTAButton variant="primaryOutline" tw="w-full">
        취소
      </CTAButton>
    </CtasContainer>
  );
}
