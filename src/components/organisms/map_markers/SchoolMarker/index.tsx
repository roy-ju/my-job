import tw from 'twin.macro';
import School from '../assets/school.svg';

function SchoolMarker({
  name,
  onClick,
}: {
  name: string;
  onClick?: () => void;
}) {
  function createIconColor() {
    const lastWord = name.slice(-1);
    switch (lastWord) {
      case '초':
        return tw`text-yellow-700`;
      case '중':
        return tw`text-orange-700`;
      case '고':
        return tw`text-green-700`;
      default:
        return tw``;
    }
  }

  return (
    <button
      type="button"
      onClick={onClick}
      tw="min-w-[77px] w-fit flex items-center h-8 bg-white rounded-[26px] relative shadow-[0px 4px 8px rgba(0, 0, 0, 0.1)]"
    >
      <School css={[tw`absolute top-0 left-0`, createIconColor()]} />
      <span tw="text-info font-bold pl-10 pr-4">{name}</span>
    </button>
  );
}

export default SchoolMarker;
