import { Skeleton } from '@/components/atoms';

export default function NewsItemType2() {
  return (
    <div tw="flex flex-col text-left">
      <div tw="mb-2">
        <Skeleton width="160px" height="90px" />
      </div>
      <div tw="flex flex-col gap-1.5 [max-width: 160px]">
        <Skeleton width="160px" height="40px" />
        <div tw="ml-auto">
          <Skeleton width="60px" height="20px" />
        </div>
      </div>
    </div>
  );
}
