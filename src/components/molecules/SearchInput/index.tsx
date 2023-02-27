import { Button } from '@/components/atoms/Button';
import { Input } from '@/components/atoms/Input';
import Search from '@/assets/icons/search.svg';
import tw from 'twin.macro';

type Props = {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClickButton?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
};

export function MapSearchInput({ onChange, onClickButton }: Props) {
  return (
    <Input
      divStyle={tw`w-[23.75rem] flex justify-between`}
      placeholder="주소 또는 단지명을 입력하세요"
      onChange={onChange}
    >
      <Button custom={tw`p-2.5`} onClick={onClickButton}>
        <Search style={{ width: '1rem' }} />
      </Button>
    </Input>
  );
}
