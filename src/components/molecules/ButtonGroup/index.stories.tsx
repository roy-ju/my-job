import { Button } from '@/components/atoms';
import type { ComponentMeta, ComponentStory } from '@storybook/react';
import SchoolIcon from '@/assets/icons/school.svg';
import StackIcon from '@/assets/icons/stack.svg';
import MapPinRoad from '@/assets/icons/map_pin_road.svg';
import ButtonGroup from '.';

export default {
  title: 'molecules/ButtonGroup',
  component: ButtonGroup,
} as ComponentMeta<typeof ButtonGroup>;

export const Default: ComponentStory<typeof ButtonGroup> = (args) => (
  <div tw="inline-flex flex-col gap-2">
    <ButtonGroup {...args}>
      <Button>버튼1</Button>
      <Button>버튼2</Button>
      <Button>버튼3</Button>
    </ButtonGroup>
    <ButtonGroup {...args}>
      <Button>버튼1</Button>
      <Button>버튼2</Button>
    </ButtonGroup>
    <ButtonGroup {...args}>
      <Button>버튼1</Button>
    </ButtonGroup>
  </div>
);

Default.storyName = '기본';
Default.args = {
  orientation: 'horizontal',
  separated: false,
  variant: 'primary',
  size: 'default',
};

export const CustomStyles: ComponentStory<typeof ButtonGroup> = (args) => (
  <div tw="inline-flex flex-col gap-2">
    <ButtonGroup {...args}>
      <Button tw="flex-col w-10 h-14">
        <MapPinRoad />
        <p tw="text-info mt-1 leading-[14px]">로드</p>
      </Button>
      <Button tw="flex-col w-10 h-14">
        <StackIcon />
        <p tw="text-info mt-1 leading-[14px]">지적</p>
      </Button>
      <Button tw="flex-col w-10 h-14">
        <SchoolIcon />
        <p tw="text-info mt-1 leading-[14px]">학교</p>
      </Button>
    </ButtonGroup>
    <ButtonGroup {...args}>
      <Button tw="flex-col w-10 h-14">
        <StackIcon />
        <p tw="text-info mt-1 leading-[14px]">지적</p>
      </Button>
      <Button tw="flex-col w-10 h-14">
        <SchoolIcon />
        <p tw="text-info mt-1 leading-[14px]">학교</p>
      </Button>
    </ButtonGroup>
    <ButtonGroup {...args}>
      <Button tw="flex-col w-10 h-14">
        <SchoolIcon />
        <p tw="text-info mt-1 leading-[14px]">학교</p>
      </Button>
    </ButtonGroup>
  </div>
);

CustomStyles.storyName = '커스텀 스타일';
CustomStyles.args = {
  orientation: 'horizontal',
  separated: false,
  variant: 'primary',
  size: 'none',
};
