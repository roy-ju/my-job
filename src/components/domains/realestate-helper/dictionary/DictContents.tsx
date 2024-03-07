import { Fragment } from 'react';

import { motion } from 'framer-motion';

import { GuideListItem } from '@/services/sub-home/types';

import ListItem from './ListItem';

import { CategoryName, Column } from './widget/DictContentsWidget';

import Seperator from './widget/Seperator';

import { contentsVariants } from './constants/animations';

type DictContentsProps = {
  item: GuideListItem;
};

export default function DictContents({ item }: DictContentsProps) {
  return (
    <Column id={`negocio-dict-list-${item.name}`}>
      <CategoryName>{item.name}</CategoryName>
      <motion.div initial="hidden" animate="visible" variants={contentsVariants}>
        {item.children?.map((dict) => (
          <Fragment key={dict.id}>
            <Seperator />
            <ListItem id={dict.id} title={dict.name} thumbnail={dict.content} />
          </Fragment>
        ))}
      </motion.div>
    </Column>
  );
}
