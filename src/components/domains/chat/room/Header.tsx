import tw from 'twin.macro';

import { NavigationHeader } from '@/components/molecules';

import useChatHeaderHandler from './hooks/useChatHeaderHandler';

export default function Header() {
  const { isExistBackButton, deregistered, headerItems, title, handleClickBack } = useChatHeaderHandler();

  return (
    <NavigationHeader>
      {isExistBackButton && <NavigationHeader.BackButton onClick={handleClickBack} />}
      <NavigationHeader.Title tw="text-subhead_03" css={[deregistered && tw`opacity-[0.4]`]}>
        {title}
      </NavigationHeader.Title>
      <NavigationHeader.MoreButton
        onClickItem={(index) => headerItems[index]?.onClick?.()}
        items={headerItems.map((item) => item.label)}
      />
    </NavigationHeader>
  );
}
