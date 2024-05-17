import { ReactNode, useState, Children, isValidElement, cloneElement } from 'react';

import tw from 'twin.macro';

import { Separator } from '@/components/atoms';

import AgentCardItemProfile from './Profile';

import AgentCardItemDetail from './Detail';

import AgentCardItemFoldButton from './Button';

export interface AgentCardItemProps {
  children?: ReactNode;
  defaultExpanded?: boolean;
}

const AgentCardItemProfileType = (<AgentCardItemProfile profileImageFullPath="" />).type;

const AgentCardItemDetailType = (<AgentCardItemDetail />).type;

const AgentCardItemFoldButtonType = (<AgentCardItemFoldButton />).type;

const getChildComponent = (children: ReactNode, componentType: string) => {
  const childrenArray = Children.toArray(children);
  return childrenArray.filter((child) => isValidElement(child) && child.type === componentType);
};

function AgentCardItem({ children, defaultExpanded = false }: AgentCardItemProps) {
  const [expanded, setIsExpanded] = useState(defaultExpanded);

  const profileContents = getChildComponent(children, AgentCardItemProfileType);

  const detailContents = getChildComponent(children, AgentCardItemDetailType);

  const foldButton =
    isValidElement(getChildComponent(children, AgentCardItemFoldButtonType)?.[0]) &&
    cloneElement(getChildComponent(children, AgentCardItemFoldButtonType)?.[0] as any, {
      expanded,
      onClick: () => setIsExpanded(!expanded),
    });

  return (
    <div tw="flex flex-col rounded-lg border border-gray-300 pt-4 pb-3 min-h-[0px]" css={[!expanded && tw`h-auto`]}>
      <div tw="px-4 flex-1 min-h-0">
        {profileContents}
        {expanded && detailContents}
      </div>
      {foldButton ? <Separator tw="bg-gray-300 h-px mt-4" /> : null}
      {foldButton}
    </div>
  );
}

export default Object.assign(AgentCardItem, {
  Profile: AgentCardItemProfile,
  Detail: AgentCardItemDetail,
  FoldButton: AgentCardItemFoldButton,
});
