import tw from 'twin.macro';
// import { motion } from 'framer-motion';
import School from '../assets/school.svg';

function SchoolMarker({
  selected = false,
  type,
  name,
  onClick,
}: {
  selected?: boolean;
  type: string;
  name: string;
  onClick?: () => void;
}) {
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
    // <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
    <button
      type="button"
      onClick={onClick}
      css={[
        tw`min-w-[77px] w-fit flex items-center h-8 bg-white rounded-[26px] relative shadow-[7px 7px 7px rgba(0, 0, 0, 0.1)]`,
        selected && tw`animate-bounce`,
      ]}
    >
      <School css={[tw`absolute top-0 left-0`, createIconColor()]} />
      <span tw="text-info font-bold pl-10 pr-4 whitespace-nowrap text-gray-1000">{name}</span>
    </button>
    // </motion.div>
  );
}

export default SchoolMarker;
