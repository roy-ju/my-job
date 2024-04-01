import { useState } from 'react';

import Heart from '@/assets/icons/heart.svg';

import HeartOutlinedIcon from '@/assets/icons/heart_outlined.svg';

export default function LikeButton({
  onLike,
  isFavorite,
}: {
  isFavorite: boolean;
  onLike?: (active: boolean) => void;
}) {
  const [active, setActive] = useState(isFavorite);

  return (
    <span
      role="presentation"
      onClick={(e) => {
        e.stopPropagation();
        const val = !active;
        onLike?.(val);
        setActive(val);
      }}
    >
      {active ? <Heart tw="text-red-800" /> : <HeartOutlinedIcon tw="text-gray-1000" />}
    </span>
  );
}
