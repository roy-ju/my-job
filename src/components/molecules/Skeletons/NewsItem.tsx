import { Skeleton } from '@/components/atoms';

export default function NewsItem() {
  return (
    <div tw="flex flex-col text-left py-3 px-5">
      <div tw="mb-2">
        <Skeleton width="280px" height="1.375rem" />
      </div>
      <div tw="flex gap-4 ">
        <Skeleton width="80px" height="80px" />

        <div tw=" flex flex-col justify-between gap-2 max-w-[240px] [width: 240px]">
          <Skeleton height="40px" />

          <Skeleton width="60px" height="20px" />
        </div>
      </div>
    </div>
  );
}
