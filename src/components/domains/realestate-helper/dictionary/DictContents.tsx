import { Fragment } from 'react';

import tw, { styled } from 'twin.macro';

import { motion } from 'framer-motion';

import { GuideListItem } from '@/services/sub-home/types';

import ListItem from './ListItem';

import CategoryName from './widget/CategoryName';

import Seperator from './widget/Seperator';

type DictContentsProps = {
  item: GuideListItem;
};

const Column = styled(motion.div)`
  ${tw`flex flex-col`}
`;

export default function DictContents({ item }: DictContentsProps) {
  return (
    <Column>
      <CategoryName>{item.name}</CategoryName>
      <motion.div>
        {item.children?.map((dict) => (
          <Fragment key={dict.id}>
            <Seperator />
            <ListItem title={dict.name} thumbnail={dict.content} />
          </Fragment>
        ))}
      </motion.div>
    </Column>
  );
}
