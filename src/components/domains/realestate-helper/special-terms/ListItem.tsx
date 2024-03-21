import { useState } from 'react';

import tw, { theme } from 'twin.macro';

import { Accordion } from '@/components/molecules';

import { TermsListItem } from './types';

import { SpecialContentsParagraph } from './widget/SpecialTermsWidget';

type ListItemProps = { item: TermsListItem };

export default function ListItem({ item }: ListItemProps) {
  const [open, setOpen] = useState(false);

  return (
    <Accordion
      key={item.title}
      onChange={(v) => {
        setOpen(v);
      }}
    >
      <Accordion.Summary
        isCustomIcon
        iconColor={theme`colors.gray.700`}
        iconWidth="20"
        tw="p-5 text-left text-gray-800 text-subhead_03 hover:bg-white "
      >
        {item.title}
      </Accordion.Summary>
      <Accordion.Details tw="px-5" css={[open && tw`pb-5`]}>
        <SpecialContentsParagraph>{item.content}</SpecialContentsParagraph>
      </Accordion.Details>
    </Accordion>
  );
}
