import type { ComponentMeta, ComponentStory } from '@storybook/react';
import SearchIcon from '@/assets/icons/search.svg';
import DeleteAllIcon from '@/assets/icons/delete_all.svg';

import TextField from '.';

export default {
  title: 'molecules/TextField',
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
  <div tw="flex flex-col gap-2">
    <TextField>
      <TextField.Input />
    </TextField>
    <TextField variant="outlined">
      <TextField.Input />
    </TextField>
  </div>
);

export const Sizes: ComponentStory<typeof TextField> = () => (
  <div tw="flex flex-col gap-2">
    <TextField>
      <TextField.Input />
    </TextField>
    <TextField variant="outlined">
      <TextField.Input />
    </TextField>
    <TextField>
      <TextField.Input placeholder="플레이스홀더" />
    </TextField>
    <TextField variant="outlined">
      <TextField.Input placeholder="플레이스홀더" />
    </TextField>
    <TextField>
      <TextField.Input label="레이블" />
    </TextField>
    <TextField variant="outlined">
      <TextField.Input label="레이블" />
    </TextField>
    <TextField size="medium">
      <TextField.Input />
    </TextField>
    <TextField variant="outlined" size="medium">
      <TextField.Input />
    </TextField>
    <TextField size="medium">
      <TextField.Input placeholder="플레이스홀더" />
    </TextField>
    <TextField variant="outlined" size="medium">
      <TextField.Input placeholder="플레이스홀더" />
    </TextField>
    <TextField size="medium">
      <TextField.Input label="레이블" />
    </TextField>
    <TextField variant="outlined" size="medium">
      <TextField.Input label="레이블" />
    </TextField>
  </div>
);

export const DefaultDisabled: ComponentStory<typeof TextField> = () => (
  <div tw="flex flex-col gap-2">
    <TextField>
      <TextField.Input disabled />
    </TextField>
    <TextField variant="outlined">
      <TextField.Input disabled />
    </TextField>
    <TextField>
      <TextField.Input disabled value="기흥더샵프라임뷰" />
    </TextField>
    <TextField variant="outlined">
      <TextField.Input disabled value="기흥더샵프라임뷰" />
    </TextField>
  </div>
);

export const Label: ComponentStory<typeof TextField> = () => (
  <div tw="flex flex-col gap-2">
    <TextField>
      <TextField.Input label="단지명" />
    </TextField>
    <TextField variant="outlined">
      <TextField.Input label="단지명" />
    </TextField>
    <TextField>
      <TextField.Input label="단지명" value="기흥더샵프라임뷰" />
    </TextField>
    <TextField variant="outlined">
      <TextField.Input label="단지명" value="기흥더샵프라임뷰" />
    </TextField>
  </div>
);

export const LabelDisabled: ComponentStory<typeof TextField> = () => (
  <div tw="flex flex-col gap-2">
    <TextField>
      <TextField.Input disabled label="단지명" />
    </TextField>
    <TextField variant="outlined">
      <TextField.Input disabled label="단지명" />
    </TextField>
    <TextField>
      <TextField.Input disabled label="단지명" value="기흥더샵프라임뷰" />
    </TextField>
    <TextField variant="outlined">
      <TextField.Input disabled label="단지명" value="기흥더샵프라임뷰" />
    </TextField>
  </div>
);

export const Placeholder: ComponentStory<typeof TextField> = () => (
  <div tw="flex flex-col gap-2">
    <TextField>
      <TextField.Input placeholder="주소 또는 단지명을 입력하세요" />
    </TextField>
    <TextField variant="outlined">
      <TextField.Input placeholder="주소 또는 단지명을 입력하세요" />
    </TextField>
  </div>
);

export const PlaceholderDisabled: ComponentStory<typeof TextField> = () => (
  <div tw="flex flex-col gap-2">
    <TextField>
      <TextField.Input placeholder="주소 또는 단지명을 입력하세요" disabled />
    </TextField>
    <TextField variant="outlined">
      <TextField.Input placeholder="주소 또는 단지명을 입력하세요" disabled />
    </TextField>
  </div>
);

export const Leading: ComponentStory<typeof TextField> = () => (
  <div tw="flex flex-col gap-2">
    <TextField>
      <TextField.Leading>Leading</TextField.Leading>
      <TextField.Input placeholder="주소 또는 단지명을 입력하세요" />
    </TextField>
    <TextField>
      <TextField.Leading>Leading</TextField.Leading>
      <TextField.Input label="주소" />
    </TextField>
  </div>
);

export const Trailing: ComponentStory<typeof TextField> = () => (
  <TextField>
    <TextField.Input placeholder="주소 또는 단지명을 입력하세요" />
    <TextField.Trailing tw="flex items-center">
      <button type="button" tw="inline-flex items-center justify-center w-5 h-5 mr-4">
        <DeleteAllIcon />
      </button>
      <button type="button" tw="inline-flex items-center justify-center w-9 h-9 bg-nego rounded-lg">
        <SearchIcon color="#fff" />
      </button>
    </TextField.Trailing>
  </TextField>
);

export const Error: ComponentStory<typeof TextField> = () => (
  <div tw="flex flex-col gap-2">
    <TextField hasError>
      <TextField.Input placeholder="단지명" />
    </TextField>
    <TextField hasError variant="outlined">
      <TextField.Input label="단지명" />
    </TextField>
  </div>
);

export const Multiline: ComponentStory<typeof TextField> = () => (
  <div tw="flex flex-col gap-2">
    <TextField>
      <TextField.TextArea placeholder="주소 또는 단지명을 입력하세요" />
    </TextField>
    <TextField variant="outlined">
      <TextField.TextArea placeholder="주소 또는 단지명을 입력하세요" />
    </TextField>
    <TextField size="medium">
      <TextField.TextArea placeholder="주소 또는 단지명을 입력하세요" />
    </TextField>
    <TextField variant="outlined" size="medium">
      <TextField.TextArea placeholder="주소 또는 단지명을 입력하세요" />
    </TextField>
  </div>
);

export const MultilineError: ComponentStory<typeof TextField> = () => (
  <div tw="flex flex-col gap-2">
    <TextField hasError>
      <TextField.TextArea placeholder="주소 또는 단지명을 입력하세요" />
    </TextField>
    <TextField hasError variant="outlined">
      <TextField.TextArea placeholder="주소 또는 단지명을 입력하세요" />
    </TextField>
  </div>
);

export const MultilineDisabled: ComponentStory<typeof TextField> = () => (
  <TextField>
    <TextField.TextArea disabled placeholder="주소 또는 단지명을 입력하세요" />
  </TextField>
);

export const HelperMessages: ComponentStory<typeof TextField> = () => (
  <div tw="flex flex-col gap-4">
    <div>
      <TextField>
        <TextField.Input label="주소" />
      </TextField>
      <TextField.ErrorMessage>안녕하세요 안녕하세요 안녕하세요 안녕하세요 안녕하세요 안녕하세요</TextField.ErrorMessage>
    </div>
    <div>
      <TextField>
        <TextField.Input label="주소" />
      </TextField>
      <TextField.SuccessMessage>
        안녕하세요 안녕하세요 안녕하세요 안녕하세요 안녕하세요 안녕하세요
      </TextField.SuccessMessage>
    </div>
  </div>
);

export const Price = () => (
  <div tw="flex flex-col gap-4">
    <TextField variant="outlined">
      <TextField.PriceInput placeholder="금액" />
    </TextField>
    <TextField variant="outlined">
      <TextField.PriceInput label="금액" />
    </TextField>
    <TextField variant="outlined">
      <TextField.PriceInput label="금액" value="1000" />
    </TextField>
    <TextField variant="outlined">
      <TextField.PriceInput label="금액" value="1000" disabled />
    </TextField>
    <TextField variant="outlined" size="medium">
      <TextField.PriceInput label="금액" />
    </TextField>
    <TextField variant="outlined" size="medium">
      <TextField.PriceInput label="금액" value="1000" />
    </TextField>
    <TextField variant="outlined" size="medium">
      <TextField.PriceInput label="금액" value="1000" disabled />
    </TextField>
  </div>
);

export const PriceWithHelper = () => (
  <div tw="flex flex-col gap-4">
    <div>
      <TextField variant="outlined">
        <TextField.PriceInput label="금액" />
      </TextField>
      <TextField.HelperMessage>100억 6,000만</TextField.HelperMessage>
    </div>
    <div>
      <TextField variant="outlined" hasError>
        <TextField.PriceInput label="금액" />
      </TextField>
      <div tw="flex justify-between">
        <TextField.ErrorMessage>에러메시지</TextField.ErrorMessage>
        <TextField.HelperMessage>100억 6,000만</TextField.HelperMessage>
      </div>
    </div>
  </div>
);
