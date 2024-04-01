import { useCallback, useRef } from 'react';

import { theme } from 'twin.macro';

import { AnimatePresence, motion } from 'framer-motion';

import { OrderText, OrderWrraper } from '@/components/atoms/Order';

import ArrowDown from '@/assets/icons/arrow_down_20.svg';

import { ProcessListItem } from './types';

import {
  ListItemWrraper,
  Summary,
  SummaryTextWrraper,
  Title,
  Thumbnail,
  SummaryButton,
  Detail,
  Content,
} from './widget/ListItemWidget';

import Tip from './widget/Tip';

import Caution from './widget/Caution';

import { contentsVariants, contentVariants, itemVariants } from './constants/animations';

import { TradeProcessContainerElementId } from './constants/element_id';

type ListItemProps = {
  item: ProcessListItem;

  openListItemIdx?: number;
  handleClickListItem: (v: number) => void;
};

export default function ListItem({ item, openListItemIdx, handleClickListItem }: ListItemProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handleClickSummaryButton = useCallback(
    (v: number) => {
      if (openListItemIdx) {
        handleClickListItem(0);
      }

      if (openListItemIdx !== v) {
        handleClickListItem(v);

        setTimeout(() => {
          if (ref?.current) {
            const elementRect = ref.current.getBoundingClientRect();

            const container = document.getElementById(TradeProcessContainerElementId);

            if (container) {
              const scrollPosition = elementRect.top + container.scrollTop - 128 - 40;

              container.scrollTo({
                top: scrollPosition,
                behavior: 'smooth',
              });
            }
          }
        }, 50);
      }
    },
    [handleClickListItem, openListItemIdx],
  );

  const { order, title, thumbnail, contents, tip, caution } = item;

  const expaned = order === openListItemIdx;

  return (
    <ListItemWrraper variants={itemVariants} ref={ref}>
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
        <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} tw="overflow-hidden">
          {expaned && (
            <Detail initial="hidden" animate="visible" variants={contentsVariants}>
              <Content variants={contentVariants}>{contents}</Content>
              <Tip text={tip} />
              <Caution text={caution} />
            </Detail>
          )}
        </motion.div>
      </AnimatePresence>
    </ListItemWrraper>
  );
}
