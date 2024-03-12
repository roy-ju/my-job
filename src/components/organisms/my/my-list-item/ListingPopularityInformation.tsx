import View from '@/assets/icons/view.svg';

import User from '@/assets/icons/user.svg';

export default function ListingPopularityInformation({ offerCount = 0, viewCount = 0 }) {
  return (
    <div tw="flex gap-3.5 text-gray-700">
      <div tw="flex gap-1.5 items-center ">
        <View tw="w-4 h-4" />
        <span tw="text-info font-medium">{viewCount}</span>
      </div>
      <div tw="flex gap-1.5 items-center">
        <User tw="w-4 h-4" />
        <span tw="text-info font-medium">{offerCount}</span>
      </div>
    </div>
  );
}
