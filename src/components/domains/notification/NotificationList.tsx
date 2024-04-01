import tw from 'twin.macro';

import Loading from '@/components/atoms/Loading';

import Container from '@/components/atoms/Container';

import { NavigationHeader } from '@/components/molecules';

import useIosWebkitNoneApplySafeArea from '@/hooks/useIosWebkitNoneApplySafeArea';

import useHandleClickBack from './list/hooks/useHandleClickBack';

import useNotificationList from './list/hooks/useNotificationList';

import { defaultHeaderItems, deletingHeaderItems } from './list/constants/headerListItems';

import { List, TabWrraper } from './list/widget/ListWidget';

import Nodata from './list/Nodata';

import ListItem from './list/ListItem';

import FilterTab from './list/FilterTab';

import DeleteButton from './list/DeleteButton';

export default function NotificationList() {
  const {
    filteredNotificationsByTabIndex: notifications,
    isLoading,
    isDeleting,
    checkedState,
    isDeleteLoading,
    tabIndex,
    handleChangeTabIndex,
    handleNextPage: onNext,
    handleHeaderItemClick,
    handleNotificationChecked,
    handleNotificationClick,
    handleDelete,
  } = useNotificationList();

  const { handleClickBack } = useHandleClickBack();

  useIosWebkitNoneApplySafeArea();

  const renderContent = (() => {
    if (isLoading) {
      return <Loading tw="text-center mt-10" />;
    }

    if (notifications.length === 0) {
      return <Nodata />;
    }

    return (
      <List css={[isDeleting && tw`mb-[68px]`]} onNext={onNext}>
        {notifications.map((item) => (
          <ListItem
            key={item.id}
            item={item}
            checkbox={isDeleting}
            checked={checkedState ? Boolean(checkedState[item.id]) : undefined}
            onClick={() => handleNotificationClick(item.id)}
            onChange={(checked) => handleNotificationChecked(item.id, checked)}
          />
        ))}
      </List>
    );
  })();

  return (
    <Container tw="relative">
      <NavigationHeader>
        <NavigationHeader.BackButton onClick={handleClickBack} />
        <NavigationHeader.Title tw="text-b1">알림</NavigationHeader.Title>
        <NavigationHeader.MoreButton
          items={isDeleting ? deletingHeaderItems : defaultHeaderItems}
          onClickItem={handleHeaderItemClick}
        />
      </NavigationHeader>
      <TabWrraper>
        <FilterTab index={tabIndex} onChangeIndex={handleChangeTabIndex} />
      </TabWrraper>
      {renderContent}
      {isDeleting && <DeleteButton isLoading={isDeleteLoading} handleClick={handleDelete} />}
    </Container>
  );
}
