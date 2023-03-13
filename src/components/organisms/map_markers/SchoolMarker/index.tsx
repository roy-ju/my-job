import tw from 'twin.macro';
import School from '../assets/school.svg';

function SchoolMarker({ type, name, onClick }: { type: string; name: string; onClick?: () => void }) {
  function createIconColor() {
    switch (type) {
      case 'elementary':
        return tw`text-yellow-700`;
      case 'middle':
        return tw`text-orange-700`;
      case 'high':
        return tw`text-green-700`;
      default:
        return '';
    }
  }

  return (
    <button
      type="button"
      onClick={onClick}
      tw="min-w-[77px] w-fit flex items-center h-8 bg-white rounded-[26px] relative shadow-[7px 7px 7px rgba(0, 0, 0, 0.1)]"
    >
      <School css={[tw`absolute top-0 left-0`, createIconColor()]} />
      <span tw="text-info font-bold pl-10 pr-4 whitespace-nowrap text-gray-1000">{name}</span>
    </button>
  );
}

export default SchoolMarker;
