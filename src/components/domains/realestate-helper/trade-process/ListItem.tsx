import { useCallback } from 'react';

import { theme } from 'twin.macro';

import { AnimatePresence, motion } from 'framer-motion';

import { OrderText, OrderWrraper } from '@/components/atoms/Order';

import ArrowDown from '@/assets/icons/arrow_down_20.svg';

import { ProcessListItem } from './types';

import ListItemWrraper from './widget/ListItemWrraper';

import Summary from './widget/Summary';

import SummaryTextWrraper from './widget/SummaryTextWrraper';

import Title from './widget/Title';

import Thumbnail from './widget/Thumbnail';

import SummaryButton from './widget/SummaryButton';

import Detail from './widget/Detail';

import Content from './widget/Content';

import Tip from './widget/Tip';

import Caution from './widget/Caution';

import { contentsVariants, contentVariants, itemVariants } from './constants/animations';

type ListItemProps = {
  item: ProcessListItem;

  openListItemIdx?: number;
  handleClickListItem: (v: number) => void;
};

export default function ListItem({ item, openListItemIdx, handleClickListItem }: ListItemProps) {
  const handleClickSummaryButton = useCallback(
    (v: number) => {
      if (openListItemIdx) {
        handleClickListItem(0);
      }

      if (openListItemIdx !== v) {
        handleClickListItem(v);
      }
    },
    [handleClickListItem, openListItemIdx],
  );

  const { order, title, thumbnail, contents, tip, caution } = item;

  const expaned = order === openListItemIdx;

  return (
    <ListItemWrraper variants={itemVariants}>
      <Summary onClick={() => handleClickSummaryButton(order)} tw="cursor-pointer">
        <OrderWrraper tw="[margin-top: 1px]">
          <OrderText>{order}</OrderText>
        </OrderWrraper>

        <SummaryTextWrraper>
          <Title>{title}</Title>
          <Thumbnail>{thumbnail}</Thumbnail>
        </SummaryTextWrraper>

        <SummaryButton>
          <ArrowDown
            color={theme`colors.gray.700`}
            style={{
              transform: expaned ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.15s',
            }}
          />
        </SummaryButton>
      </Summary>

      <AnimatePresence initial={false}>
        {expaned && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            transition={{ type: 'just' }}
            tw="overflow-hidden"
          >
            <Detail initial="hidden" animate="visible" variants={contentsVariants}>
              <Content variants={contentVariants}>{contents}</Content>
              <Tip text={tip} />
              <Caution text={caution} />
            </Detail>
          </motion.div>
        )}
      </AnimatePresence>
    </ListItemWrraper>
  );
}
