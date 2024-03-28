import Image from 'next/image';

import tw, { styled, theme } from 'twin.macro';

import ArrowRight from '@/assets/icons/arrow_right_16_1.svg';

import StarImage from '@/../public/static/images/icon_star-eyes-emoji_2.png';

const Button = styled.button`
  ${tw`[width: calc(100% - 40px)] mx-auto p-5 [box-shadow: 0px 2px 20px 0px rgba(0, 0, 0, 0.06), 0px 2px 10px 0px rgba(0, 0, 0, 0.03)] [border-radius: 12px] text-left flex justify-between items-center bg-white`}
`;

export default function GoAgentSite() {
  const handleClickAgentSite = () => {
    window.open(process.env.NEXT_PUBLIC_NEGOCIO_AGENT_CLIENT_URL, '_blank');
  };

  return (
    <Button onClick={handleClickAgentSite}>
      <Image src={StarImage.src} width={32} height={32} alt="starImage" />
      <div tw="flex flex-col ml-2.5 justify-center">
        <span tw="text-body_02 text-gray-700">중개사님 이신가요?</span>
        <span tw="text-subhead_03 text-gray-900">네고시오의 파트너가 되어주세요!</span>
      </div>
      <ArrowRight tw="ml-auto" color={theme`colors.gray.700`} />
    </Button>
  );
}
