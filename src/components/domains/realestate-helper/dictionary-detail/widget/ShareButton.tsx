import ShareIcon from '@/assets/icons/share_24.svg';

export default function ShareButton({ handleClick }: { handleClick?: () => void }) {
  return (
    <button type="button" tw="h-full" onClick={handleClick}>
      <ShareIcon />
    </button>
  );
}
