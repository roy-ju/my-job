import type { ComponentMeta, ComponentStory } from '@storybook/react';
import Dropdown from '.';

export default {
  title: 'molecules/Dropdown',
  component: Dropdown,
} as ComponentMeta<typeof Dropdown>;

export const Default: ComponentStory<typeof Dropdown> = (args) => (
  <div tw="flex flex-col gap-2">
    <Dropdown {...args}>
      <Dropdown.Option value="매매가격">매매가격</Dropdown.Option>
      <Dropdown.Option value="전월세가격">전월세가격</Dropdown.Option>
    </Dropdown>
  </div>
);

Default.args = {
  variant: 'outlined',
  size: 'big',
};

export const PlaceholderAndLabel: ComponentStory<typeof Dropdown> = () => (
  <div tw="flex flex-col gap-2">
    <Dropdown placeholder="가격을 선택해주세요">
      <Dropdown.Option value="매매가격">매매가격</Dropdown.Option>
      <Dropdown.Option value="전월세가격">전월세가격</Dropdown.Option>
    </Dropdown>
    <Dropdown label="가격타입">
      <Dropdown.Option value="매매가격">매매가격</Dropdown.Option>
      <Dropdown.Option value="전월세가격">전월세가격</Dropdown.Option>
    </Dropdown>
  </div>
);

export const ManyItems: ComponentStory<typeof Dropdown> = (args) => (
  <Dropdown {...args}>
    {Array(40)
      .fill(0)
      .map((_, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <Dropdown.Option key={index} value={`${index}`}>
          {index}
        </Dropdown.Option>
      ))}
  </Dropdown>
);

export const LongValue: ComponentStory<typeof Dropdown> = () => (
  <div tw="flex flex-col gap-4">
    <Dropdown
      label="가격타입"
      value="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Mollitia, doloremque eius eveniet, dolorem labore nulla dicta quaerat excepturi asperiores rerum vel inventore, repudiandae consequatur quae. Temporibus incidunt reprehenderit asperiores iste?"
    >
      <Dropdown.Option value="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Mollitia, doloremque eius eveniet, dolorem labore nulla dicta quaerat excepturi asperiores rerum vel inventore, repudiandae consequatur quae. Temporibus incidunt reprehenderit asperiores iste?">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Mollitia, doloremque eius eveniet, dolorem labore
        nulla dicta quaerat excepturi asperiores rerum vel inventore, repudiandae consequatur quae. Temporibus incidunt
        reprehenderit asperiores iste?
      </Dropdown.Option>
      <Dropdown.Option value="전월세가격">전월세가격</Dropdown.Option>
    </Dropdown>
    <Dropdown
      size="small"
      placeholder="가격타입"
      value="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Mollitia, doloremque eius eveniet, dolorem labore nulla dicta quaerat excepturi asperiores rerum vel inventore, repudiandae consequatur quae. Temporibus incidunt reprehenderit asperiores iste?"
    >
      <Dropdown.Option value="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Mollitia, doloremque eius eveniet, dolorem labore nulla dicta quaerat excepturi asperiores rerum vel inventore, repudiandae consequatur quae. Temporibus incidunt reprehenderit asperiores iste?">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Mollitia, doloremque eius eveniet, dolorem labore
        nulla dicta quaerat excepturi asperiores rerum vel inventore, repudiandae consequatur quae. Temporibus incidunt
        reprehenderit asperiores iste?
      </Dropdown.Option>
      <Dropdown.Option value="전월세가격">전월세가격</Dropdown.Option>
    </Dropdown>
  </div>
);
