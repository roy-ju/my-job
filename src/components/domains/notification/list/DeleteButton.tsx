import { Button } from '@/components/atoms';

type DeleteButtonProps = { isLoading: boolean; handleClick: () => Promise<void> };

export default function DeleteButton({ isLoading, handleClick }: DeleteButtonProps) {
  return (
    <div tw="absolute left-0 bottom-0 w-full px-5 py-4 bg-white shadow-persistentBottomBar">
      <Button isLoading={isLoading} variant="secondary" size="bigger" tw="w-full" onClick={handleClick}>
        삭제하기
      </Button>
    </div>
  );
}
