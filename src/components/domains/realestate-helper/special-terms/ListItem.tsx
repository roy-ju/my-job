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
      tw="py-5 [width: calc(100% - 40px)] mx-auto"
      css={[!isLast && tw`border-b border-b-gray-200`]}
    >
      <Accordion.Summary
        isNewIconV3
        iconColor={theme`colors.gray.700`}
        iconWidth="20"
        tw="text-left text-gray-800 text-subhead_03 hover:bg-white [-webkit-transform: translateZ(0)]"
      >
        {item.title}
      </Accordion.Summary>
      <Accordion.Details css={[openTitle === item.title && tw`pt-5`]}>
        <SpecialContentsParagraph>{item.content}</SpecialContentsParagraph>
      </Accordion.Details>
    </Accordion>
  );
}

export default memo(ListItem);
