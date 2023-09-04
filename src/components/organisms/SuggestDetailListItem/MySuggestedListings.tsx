import ChevronDown from '@/assets/icons/chevron_down.svg';

import React, { useState } from 'react';

export default function MySuggestedListings() {
  const [showDetails, setShowDetails] = useState(true);

  return (
    <button
      tw="w-full flex justify-between gap-4 mt-10"
      type="button"
      onClick={() => {
        setShowDetails((prev) => !prev);
      }}
    >
      <p tw="text-h2 [letter-spacing: -0.25px] font-bold">내가 추천한 매물</p>
      <div>
        <ChevronDown
          role="presentation"
          style={{
            transform: showDetails ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.2s ease-in-out',
            alignSelf: 'top',
          }}
        />
      </div>
    </button>
  );
}
