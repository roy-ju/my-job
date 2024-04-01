import Image from 'next/image';
import tw from 'twin.macro';

import { Flex, SubTitle } from './widget/ListingCheckListWidget';

type MainDescriptionProps = {
  tab: string;
  code: string;
  imgUrl?: string;
  title?: string;
  subTitle?: string;
};

export default function MainDescription({ tab, code, title = '', subTitle = '', imgUrl }: MainDescriptionProps) {
  return (
    <Flex css={[tab !== code && tw`[display: none]`]}>
      {imgUrl && <Image src={imgUrl} alt="mainDescriptionImage" width={48} height={48} />}
      <SubTitle>
        {title && <span>{title}</span>}
        {subTitle && <span>{subTitle}</span>}
      </SubTitle>
    </Flex>
  );
}
