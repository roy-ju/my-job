import tw, { styled } from 'twin.macro';

import useCheckPlatform from '@/hooks/useCheckPlatform';

import { UserEventList } from '@/constants/user_events';

const Container = styled.div`
  ${tw`bg-gray-100`}
`;

export default function EventBanner() {
  const { platform } = useCheckPlatform();
  const eventInfo = UserEventList[0];

  if (platform === 'mobile') return null;

  return <Container>LineBaggnnerLineBaggnnerLineBaggnnerLineBaggnner</Container>;
}
