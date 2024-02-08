import ButtonV2 from '@/components/atoms/ButtonV2';

type EtcButtonProps = { handleClick: () => void; title: string };

export default function EtcButton({ handleClick, title }: EtcButtonProps) {
  return (
    <ButtonV2 size="none" variant="ghost" tw="text-body_01 text-gray-600 hover:text-gray-700" onClick={handleClick}>
      {title}
    </ButtonV2>
  );
}
