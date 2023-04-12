import { BuyOrRent } from '@/constants/enums';
import { Panel } from '@/components/atoms';
import ListingCreateResultStatus from '.';

const meta = {
  title: 'organisms/ListingCreateResultStatus',
};

export default meta;

export const VerifyingAddress = () => (
  <Panel>
    <ListingCreateResultStatus.VerifyingAddress />
  </Panel>
);

export const InvalidAddress = () => (
  <Panel>
    <ListingCreateResultStatus.NoAddressFound
      addressLine1="경기도 성남시 분당구 동판교로 156"
      addressLine2="삼평동, 봇들마을9단지 금호어울림 아파트 101동 101호"
    />
  </Panel>
);

export const WaitingForAgentCompletion = () => (
  <Panel>
    <ListingCreateResultStatus.WaitingForAgentCompletion />
  </Panel>
);

export const Duplicated = () => (
  <Panel>
    <ListingCreateResultStatus.Duplicated
      addressLine1="경기도 성남시 분당구 동판교로 156"
      addressLine2="삼평동, 봇들마을9단지 금호어울림 아파트 101동 101호"
      buyOrRent={BuyOrRent.Buy}
    />
  </Panel>
);

const agents = [
  {
    id: 0,
    officeName: '네고시오',
    profileImageFullPath: 'https://cdn.pixabay.com/photo/2023/03/21/09/16/bird-7866804_640.jpg',
    name: '김네고',
    cellPhone: '031-2222-2222',
    fullJibunAddress: '경기도 성남시 분당구 백현동 645-12',
    registrationNumber: '12345-8219-71734',
    description: '한줄소개가 들어갑니다. 최대 50자입니다. 어디까지 가야할까요? 네고시오 화이팅 열심히',
  },
  {
    id: 0,
    officeName: 'Jay',
    profileImageFullPath: 'https://cdn.pixabay.com/photo/2023/03/21/09/16/bird-7866804_640.jpg',
    name: '제이제이',
    cellPhone: '02-2222-2222',
    fullJibunAddress: '경기도 성남시 분당구 백현동 645-12',
    registrationNumber: '12345-8219-71734',
    description: '한줄소개가 들어갑니다. 최대 50자입니다. 어디까지 가야할까요? 네고시오 화이팅 열심히',
  },
  {
    id: 0,
    officeName: 'NOOOOO',
    profileImageFullPath: 'https://cdn.pixabay.com/photo/2023/03/21/09/16/bird-7866804_640.jpg',
    name: '네임네임네임',
    cellPhone: '02-2222-2222',
    fullJibunAddress: '경기도 성남시 분당구 백현동 645-12',
    registrationNumber: '12345-8219-71734',
    description: '한줄소개가 들어갑니다. 최대 50자입니다. 어디까지 가야할까요? 네고시오 화이팅 열심히',
  },
];

export const AgentSelection = () => (
  <Panel>
    <ListingCreateResultStatus.AgentSelection agents={agents} />
  </Panel>
);
