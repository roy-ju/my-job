import tw, { styled } from 'twin.macro';

import Button from '@/components/atoms/Button';

import ButtonV2 from '@/components/atoms/ButtonV2';

export const Title = styled.p`
  ${tw`mb-6 whitespace-pre-wrap text-heading_02`}
`;

export const SubTitle = styled.p`
  ${tw`mb-2 font-bold text-b2`}
`;

export const CtaWrraper = styled.div`
  ${tw`w-full px-5 py-4 bg-white`}
`;

export const NextStepButton = styled(Button)`
  ${tw`underline text-info`}
`;

export const DeregisterCta = styled(ButtonV2)`
  ${tw`w-full`}
`;

export const FlexContents = styled.div`
  ${tw`flex-1 min-h-0 px-5 py-5 overflow-y-auto`}
`;

DeregisterCta.defaultProps = {
  size: 'bigger',
};

NextStepButton.defaultProps = {
  size: 'none',
  variant: 'ghost',
};
