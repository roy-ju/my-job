import Heart from '@/assets/icons/heart.svg';
import tw from 'twin.macro';

export default function LikeButton({ onLike, isFavorite }: { isFavorite: boolean; onLike?: () => void }) {
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onLike?.();
      }}
    >
      <Heart css={[tw`text-white stroke-1 stroke-black`, isFavorite && tw`text-red-800 stroke-0`]} />
    </button>
  );
}
