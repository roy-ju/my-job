import tw from 'twin.macro';
import School from '../assets/school.svg';

function SchoolMarker({ type, name, onClick }: { type: number; name: string; onClick?: () => void }) {
  function createIconColor() {
    switch (type) {
      case 0:
        return tw`text-yellow-700`;
      case 1:
        return tw`text-orange-700`;
      case 2:
        return tw`text-green-700`;
      default:
        return '';
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
