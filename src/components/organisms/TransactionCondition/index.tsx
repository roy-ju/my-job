import React, { ReactNode } from 'react';
import Section from './Section';
import List from './List';
import Item from './Item';

interface TransactionConditionProps {
  children: ReactNode;
}

function TransactionCondition({ children }: TransactionConditionProps) {
  return <div tw="bg-white">{children}</div>;
}

export default Object.assign(TransactionCondition, {
  Item,
  Section,
  List,
});
