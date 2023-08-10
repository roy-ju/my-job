import { Button } from '@/components/atoms';
import { customAlphabet } from 'nanoid';
import React from 'react';
import emojis, { EmojiType } from './emojis';

interface EmojiProps {
  onClickEmoji?: (val: string) => void;
}

function Emoji({ name, icon, onClickEmoji }: EmojiType & EmojiProps) {
  return (
    <Button variant="ghost" tw="py-[6px] px-[6px] h-fit hover:bg-gray-800" onClick={() => onClickEmoji?.(icon)}>
      <span role="img" aria-label={name}>
        {icon}
      </span>
    </Button>
  );
}

function EmojiCollection({
  handleChangeIcon,
  selectedType,
}: {
  handleChangeIcon?: (val: string) => void;
  selectedType?: number;
}) {
  const nanoId = customAlphabet('1234567890abcdefghijklmn');

  return (
    <div tw="flex flex-row items-center flex-wrap gap-0 pb-4 [max-height: 108px] overflow-scroll px-5 py-3 bg-gray-100">
      {selectedType === 0
        ? emojis.map((emoji) => (
            <Emoji
              key={nanoId()}
              type={emoji.type}
              name={emoji.name}
              icon={emoji.icon}
              onClickEmoji={handleChangeIcon}
            />
          ))
        : emojis
            .filter((ele) => ele.type === selectedType)
            .map((emoji) => (
              <Emoji
                key={nanoId()}
                type={emoji.type}
                name={emoji.name}
                icon={emoji.icon}
                onClickEmoji={handleChangeIcon}
              />
            ))}
    </div>
  );
}

export default EmojiCollection;
