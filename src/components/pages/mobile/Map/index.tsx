import MobMapLayout from '@/layouts/Mobile/MapLayout';

export default function Map() {
  return (
    <>
      <div tw="w-[100%] absolute bg-nego-1300 h-full [z-index: -1]" />
      <MobMapLayout />
    </>
  );
}
