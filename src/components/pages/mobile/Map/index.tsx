import MobMapLayout from '@/layouts/MapLayout';

export default function MobMap() {
  return (
    <>
      <div tw="w-[100%] absolute bg-nego-1300 h-full [z-index: -1]" />
      <MobMapLayout />
    </>
  );
}
