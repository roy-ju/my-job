export default function getStep(index: number, currentIndex: number) {
  if (index === currentIndex + 1) return 'next';

  if (index === currentIndex) return 'current';

  if (index > currentIndex) return 'another';

  return 'prev';
}
