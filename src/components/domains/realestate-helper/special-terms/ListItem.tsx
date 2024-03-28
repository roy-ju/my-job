import { memo } from 'react';

import tw, { theme } from 'twin.macro';

import { Accordion } from '@/components/molecules';

import { TermsListItem } from './types';

import { SpecialContentsParagraph } from './widget/SpecialTermsWidget';

type ListItemProps = {
  item: TermsListItem;
  openTitle: string | null;
  isLast: boolean;
  handleChagneOpenTitle: (v: string | null) => void;
};

function ListItem({ item, openTitle, isLast, handleChagneOpenTitle }: ListItemProps) {
  const expanded = item.title === openTitle;

  return (
    <Accordion
      key={item.title}
      expanded={expanded}
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
        tw="py-5 text-left text-gray-800 text-subhead_03 hover:bg-white mx-auto [width: calc(100% - 40px)]"
        css={[!expanded && !isLast && tw`border-b border-b-gray-200`]}
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
