import { Button, Input } from '@/components/atoms';
import Search from '@/assets/icons/search.svg';
import tw from 'twin.macro';

type Props = {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClickButton?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
};

function MapSearchInput({ onChange, onClickButton }: Props) {
  return (
    <Input
      divStyle={tw`w-[23.75rem] flex justify-between`}
      placeholder="주소 또는 단지명을 입력하세요"
      onChange={onChange}
    >
      <Button
        theme="secondary"
        custom={tw`h-[2.25rem] px-[0.625rem]`}
        onClick={onClickButton}
      >
        <Search />
      </Button>
    </Input>
  );
}

export default MapSearchInput;
