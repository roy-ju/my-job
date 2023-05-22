import { Button } from '@/components/atoms';

interface Props {
  onClickBack?: () => void;
}

export default function PageNotFound({ onClickBack }: Props) {
  return (
    <div tw="h-full flex flex-col">
      <div tw="px-5 py-10 flex-1 flex flex-col items-center justify-center">
        <p tw="py-3">요청하신 페이지를 찾을 수 없습니다.</p>
        <Button variant="secondary" size="big" tw="px-10" onClick={onClickBack}>
          돌아가기
        </Button>
      </div>
    </div>
  );
}
