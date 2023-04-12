import { BuyOrRent } from '@/constants/enums';
import ListingCreateResultStatus from '.';

const meta = {
  title: 'organisms/ListingCreateResultStatus',
};

export default meta;

export const VerifyingAddress = () => <ListingCreateResultStatus.VerifyingAddress />;

export const InvalidAddress = () => (
  <ListingCreateResultStatus.NoAddressFound
    addressLine1="경기도 성남시 분당구 동판교로 156"
    addressLine2="삼평동, 봇들마을9단지 금호어울림 아파트 101동 101호"
  />
);

export const WaitingForAgentCompletion = () => <ListingCreateResultStatus.WaitingForAgentCompletion />;

export const Duplicated = () => (
  <ListingCreateResultStatus.Duplicated
    addressLine1="경기도 성남시 분당구 동판교로 156"
    addressLine2="삼평동, 봇들마을9단지 금호어울림 아파트 101동 101호"
    buyOrRent={BuyOrRent.Buy}
  />
);
