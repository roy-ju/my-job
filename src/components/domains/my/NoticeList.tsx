import Container from '@/components/atoms/Container';

import { NavigationHeader } from '@/components/molecules';

import useIosWebkitNoneApplySafeArea from '@/hooks/useIosWebkitNoneApplySafeArea';

import useHandleClickBack from './notice-list/hooks/useHandleClickBack';

import List from './notice-list/List';

export default function NoticeList() {
  const { handleClickBack } = useHandleClickBack();

  useIosWebkitNoneApplySafeArea();

  return (
    <Container>
      <NavigationHeader>
        <NavigationHeader.BackButton onClick={handleClickBack} />
        <NavigationHeader.Title>공지사항</NavigationHeader.Title>
      </NavigationHeader>
      <List />
    </Container>
  );
}
