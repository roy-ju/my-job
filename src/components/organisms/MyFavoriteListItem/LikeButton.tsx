import Heart from '@/assets/icons/heart.svg';

export default function LikeButton({ onLike = () => {}, isLiked = false }) {
  return (
    <button type="button" onClick={onLike}>
      <Heart tw="text-red-800" />
    </button>
  );
}
