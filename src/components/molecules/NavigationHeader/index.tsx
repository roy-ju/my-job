import tw from 'twin.macro';
import ChevronLeftIcon from '@/assets/icons/chevron_left_24.svg';

const NavigationHeader = tw.div`w-full h-14 bg-white px-4 flex items-center shrink-0`;

function BackButton({ onClick }: { onClick?: () => void }) {
  return (
    <button type="button" onClick={onClick} tw="h-full pr-3">
      <ChevronLeftIcon />
    </button>
  );
}

const Button = tw.button`relative h-full`;

const Title = tw.div`text-h3 text-gray-1000 font-bold`;

export default Object.assign(NavigationHeader, {
  BackButton,
  Title,
  Button,
});
