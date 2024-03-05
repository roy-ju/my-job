import { ChatRoomType } from '@/constants/enums';

import { UserAgentSummary } from './UserAgentSummary';

import { BuyerSellerSummary } from './BuyerSellerSummary';

import useClientAccordionHandler from './hooks/useClientAccordionHandler';

export default function SubHeader() {
  const { chatRoomType } = useClientAccordionHandler();

  return (
    <>
      {chatRoomType === ChatRoomType.Agent && <UserAgentSummary />}
      {chatRoomType === ChatRoomType.BuyerSeller && <BuyerSellerSummary />}
    </>
  );
}
