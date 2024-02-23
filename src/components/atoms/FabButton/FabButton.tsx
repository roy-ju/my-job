import tw, { styled } from 'twin.macro';

import ButtonV2 from '../ButtonV2';

const FabButton = styled(ButtonV2)<{ type: 'extended' | 'none' }>`
  ${tw`bg-nego-800 ml-auto mr-4 transition-none [box-shadow: 0px 0px 16px 0px #0000001F] hover:bg-nego-600 focus:bg-nego-900 active:bg-nego-1000`}

  ${({ type }) =>
    type === 'extended'
      ? tw`flex items-center gap-1 [border-radius: 100px] px-4 h-12`
      : tw`w-12 h-12 [border-radius: 50%] px-0`}
`;

export default FabButton;
