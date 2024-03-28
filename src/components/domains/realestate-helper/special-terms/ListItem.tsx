import { memo } from 'react';

import tw, { theme } from 'twin.macro';

import { Accordion } from '@/components/molecules';

import { TermsListItem } from './types';

import { SpecialContentsParagraph } from './widget/SpecialTermsWidget';

type ListItemProps = {
  item: TermsListItem;
  openTitle: string | null;
  handleChagneOpenTitle: (v: string | null) => void;
};

function ListItem({ item, openTitle, handleChagneOpenTitle }: ListItemProps) {
  return (
    <Accordion
      key={item.title}
      expanded={item.title === openTitle}
      onChange={(v) => {
        if (v) {
          handleChagneOpenTitle(item?.title);
        } else {
          handleChagneOpenTitle(null);
        }
      }}
    >
      <Accordion.Summary
        isNewIconV3
        iconColor={theme`colors.gray.700`}
        iconWidth="20"
        tw="p-5 text-left text-gray-800 text-subhead_03 hover:bg-white "
      >
        {item.title}
      </Accordion.Summary>
      <Accordion.Details tw="px-5" css={[openTitle === item.title && tw`pb-5`]}>
        <SpecialContentsParagraph>{item.content}</SpecialContentsParagraph>
      </Accordion.Details>
    </Accordion>
  );
}

export default memo(ListItem);
