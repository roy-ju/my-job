import React from 'react';
import FAQListItem from '@/components/organisms/FAQListItem';
import { v4 as uuidv4 } from 'uuid';

export default function MobList() {
  return (
    <div tw="bg-white py-4 overflow-y-auto">
      {Array(3)
        .fill(0)
        .map((_, i) => (
          <>
            {!!i && <div tw="border-t mx-5 border-gray-100" />}
            <FAQListItem key={uuidv4()} />
          </>
        ))}
    </div>
  );
}
