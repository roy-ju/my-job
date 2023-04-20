import tw from 'twin.macro';

const colors = {
  제안중: tw`bg-green-600`,
  협의중: tw`bg-nego-600`,
};

export default function ListingStatusChip({ status = '제안중' }: { status: '제안중' | '협의중' }) {
  return (
    <div
      tw="absolute top-0 left-0 rounded-tl-lg rounded-br px-1.5 text-info font-semibold text-white"
      css={colors[status]}
    >
      제안중
    </div>
  );
}
