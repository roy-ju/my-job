import type { ComponentMeta, ComponentStory } from '@storybook/react';
import SearchIcon from '@/assets/icons/search.svg';
import DeleteAllIcon from '@/assets/icons/delete_all.svg';
import TextField from '.';

export default {
  title: 'atoms/TextField',
  component: TextField,
  argTypes: {
    falsy: {
      type: 'string',
    },
    children: {
      type: 'string',
    },
  },
} as ComponentMeta<typeof TextField>;

export const Default: ComponentStory<typeof TextField> = () => (
  <TextField>
    <TextField.Input />
  </TextField>
);

export const Placeholder: ComponentStory<typeof TextField> = () => (
  <TextField>
    <TextField.Input placeholder="주소 또는 단지명을 입력하세요" />
  </TextField>
);

export const Leading: ComponentStory<typeof TextField> = () => (
  <TextField>
    <TextField.Leading>Leading</TextField.Leading>
    <TextField.Input placeholder="주소 또는 단지명을 입력하세요" />
  </TextField>
);

export const Trailing: ComponentStory<typeof TextField> = () => (
  <TextField>
    <TextField.Input placeholder="주소 또는 단지명을 입력하세요" />
    <TextField.Trailing tw="flex items-center">
      <button
        type="button"
        tw="inline-flex items-center justify-center w-5 h-5 mr-4"
      >
        <DeleteAllIcon />
      </button>
      <button
        type="button"
        tw="inline-flex items-center justify-center w-9 h-9 bg-nego rounded-lg"
      >
        <SearchIcon color="#fff" />
      </button>
    </TextField.Trailing>
  </TextField>
);
