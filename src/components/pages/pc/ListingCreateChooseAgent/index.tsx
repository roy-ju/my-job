import { Panel } from '@/components/atoms';
import { ListingCreateChooseAgent } from '@/components/templates';
import { memo } from 'react';

interface Props {
  depth: number;
  panelWidth?: string;
}

const mock = [
  {
    officeName: '네고시오',
    profileImageFullPath: 'https://cdn.pixabay.com/photo/2023/03/21/09/16/bird-7866804_640.jpg',
    name: '김네고',
    cellPhone: '031-2222-2222',
    fullJibunAddress: '경기도 성남시 분당구 백현동 645-12',
    registrationNumber: '12345-8219-71734',
    description: '한줄소개가 들어갑니다. 최대 50자입니다. 어디까지 가야할까요? 네고시오 화이팅 열심히',
  },
  {
    officeName: 'Jay',
    profileImageFullPath: 'https://cdn.pixabay.com/photo/2023/03/21/09/16/bird-7866804_640.jpg',
    name: '제이제이',
    cellPhone: '02-2222-2222',
    fullJibunAddress: '경기도 성남시 분당구 백현동 645-12',
    registrationNumber: '12345-8219-71734',
    description: '한줄소개가 들어갑니다. 최대 50자입니다. 어디까지 가야할까요? 네고시오 화이팅 열심히',
  },
  {
    officeName: 'NOOOOO',
    profileImageFullPath: 'https://cdn.pixabay.com/photo/2023/03/21/09/16/bird-7866804_640.jpg',
    name: '네임네임네임',
    cellPhone: '02-2222-2222',
    fullJibunAddress: '경기도 성남시 분당구 백현동 645-12',
    registrationNumber: '12345-8219-71734',
    description: '한줄소개가 들어갑니다. 최대 50자입니다. 어디까지 가야할까요? 네고시오 화이팅 열심히',
  },
];

export default memo(({ panelWidth }: Props) => (
  <Panel width={panelWidth}>
    <ListingCreateChooseAgent agents={mock} />
  </Panel>
));
