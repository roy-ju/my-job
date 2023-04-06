import { ReactNode, useState, Children, isValidElement, cloneElement } from 'react';
import AgentCardItemProfile from './Profile';
import AgentCardItemDetail from './Detail';
import AgentCardItemFoldButton from './Button';

export interface AgentCardItemProps {
  children?: ReactNode;
  hasFoldButton?: true;
}

const AgentCardItemProfileType = (<AgentCardItemProfile profileImageFullPath="" />).type;
const AgentCardItemDetailType = (<AgentCardItemDetail />).type;
const AgentCardItemFoldButtonType = (<AgentCardItemFoldButton />).type;

const getChildComponent = (children: ReactNode, componentType: string) => {
  const childrenArray = Children.toArray(children);
  return childrenArray.filter((child) => isValidElement(child) && child.type === componentType);
};

function AgentCardItem({ children }: AgentCardItemProps) {
  const [expanded, setIsExpanded] = useState(false);

  const profileContents = getChildComponent(children, AgentCardItemProfileType);
  const detailContents = getChildComponent(children, AgentCardItemDetailType);
  const foldButton =
    isValidElement(getChildComponent(children, AgentCardItemFoldButtonType)?.[0]) &&
    cloneElement(getChildComponent(children, AgentCardItemFoldButtonType)?.[0] as any, {
      expanded,
      onClick: () => setIsExpanded(!expanded),
    });
  return (
    <div tw="rounded-[0.75rem] bg-gray-100 px-4 pt-4 pb-5">
      {profileContents}
      {expanded && detailContents}
      {foldButton}
    </div>
  );
}

export default Object.assign(AgentCardItem, {
  Profile: AgentCardItemProfile,
  Detail: AgentCardItemDetail,
  FoldButton: AgentCardItemFoldButton,
});
