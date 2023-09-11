import ExclamationMark from '@/assets/icons/exclamation_mark.svg';
import { Button } from '@/components/atoms';
import { ReactNode } from 'react';

interface NoDataUIProps {
  title: string;
  body: ReactNode;
  onClick?: () => void;
  buttonText?: string;
}

export default function NoDataUI({ title, body, buttonText, onClick }: NoDataUIProps) {
  return (
    <div tw="mt-7 text-center">
      <ExclamationMark tw="mx-auto" />
      <div tw="flex flex-col gap-2 mt-4">
        <div tw="text-h2 font-bold text-gray-1000">{title}</div>
        <div tw="text-gray-700 text-info">{body}</div>
      </div>
      {onClick && (
        <Button size="medium" onClick={onClick} tw="h-10 mx-auto mt-5">
          {buttonText}
        </Button>
      )}
    </div>
  );
}
