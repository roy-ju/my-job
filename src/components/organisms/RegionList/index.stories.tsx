import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { Panel, Separator } from '@/components/atoms';
import RegionList from '.';

export default {
  title: 'organisms/RegionList',
  component: RegionList,
} as ComponentMeta<typeof RegionList>;

const sidoList = [
  {
    name: '서울특별시',
    code: '11',
  },
  {
    name: '부산광역시',
    code: '26',
  },
  {
    name: '대구광역시',
    code: '27',
  },
  {
    name: '인천광역시',
    code: '28',
  },
  {
    name: '광주광역시',
    code: '29',
  },
  {
    name: '대전광역시',
    code: '30',
  },
  {
    name: '울산광역시',
    code: '31',
  },
  {
    name: '세종특별자치시',
    code: '36',
  },
  {
    name: '경기도',
    code: '41',
  },
  {
    name: '강원도',
    code: '42',
  },
  {
    name: '충청북도',
    code: '43',
  },
  {
    name: '충청남도',
    code: '44',
  },
  {
    name: '전라북도',
    code: '45',
  },
  {
    name: '전라남도',
    code: '46',
  },
  {
    name: '경상북도',
    code: '47',
  },
  {
    name: '경상남도',
    code: '48',
  },
  {
    name: '제주특별자치도',
    code: '50',
  },
];

const sigunguList = [
  {
    name: '종로구',
    code: '11110',
  },
  {
    name: '중구',
    code: '11140',
  },
  {
    name: '용산구',
    code: '11170',
  },
  {
    name: '성동구',
    code: '11200',
  },
  {
    name: '서울특별시 광진구',
    code: '11215',
  },
  {
    name: '동대문구',
    code: '11230',
  },
  {
    name: '중랑구',
    code: '11260',
  },
  {
    name: '성북구',
    code: '11290',
  },
  {
    name: '서울특별시 강북구',
    code: '11305',
  },
  {
    name: '도봉구',
    code: '11320',
  },
  {
    name: '노원구',
    code: '11350',
  },
  {
    name: '은평구',
    code: '11380',
  },
  {
    name: '서대문구',
    code: '11410',
  },
  {
    name: '마포구',
    code: '11440',
  },
  {
    name: '양천구',
    code: '11470',
  },
  {
    name: '강서구',
    code: '11500',
  },
  {
    name: '구로구',
    code: '11530',
  },
  {
    name: '서울특별시 금천구',
    code: '11545',
  },
  {
    name: '영등포구',
    code: '11560',
  },
  {
    name: '동작구',
    code: '11590',
  },
  {
    name: '관악구',
    code: '11620',
  },
  {
    name: '서초구',
    code: '11650',
  },
  {
    name: '강남구',
    code: '11680',
  },
  {
    name: '송파구',
    code: '11710',
  },
  {
    name: '강동구',
    code: '11740',
  },
];

const dongList = [
  {
    name: '역삼동',
    code: '1168010100',
  },
  {
    name: '개포동',
    code: '1168010300',
  },
  {
    name: '청담동',
    code: '1168010400',
  },
  {
    name: '삼성동',
    code: '1168010500',
  },
  {
    name: '대치동',
    code: '1168010600',
  },
  {
    name: '신사동',
    code: '1168010700',
  },
  {
    name: '논현동',
    code: '1168010800',
  },
  {
    name: '압구정동',
    code: '1168011000',
  },
  {
    name: '세곡동',
    code: '1168011100',
  },
  {
    name: '자곡동',
    code: '1168011200',
  },
  {
    name: '율현동',
    code: '1168011300',
  },
  {
    name: '일원동',
    code: '1168011400',
  },
  {
    name: '수서동',
    code: '1168011500',
  },
  {
    name: '도곡동',
    code: '1168011800',
  },
];

export const Default: ComponentStory<typeof RegionList> = () => (
  <Panel>
    <RegionList tw="h-full">
      <RegionList.Header />
      <Separator tw="h-px" />
      <RegionList.Breadcrumbs />
      <Separator tw="h-px" />
      <RegionList.List
        list1={sidoList}
        list2={sigunguList}
        list3={dongList}
        value1={{
          name: '서울특별시',
          code: '11',
        }}
        value2={{
          name: '종로구',
          code: '11110',
        }}
        value3={{
          name: '역삼동',
          code: '1168010100',
        }}
      />
      <RegionList.Submit />
    </RegionList>
  </Panel>
);

Default.args = {};
