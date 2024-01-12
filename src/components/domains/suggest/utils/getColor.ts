import { theme } from 'twin.macro';

export default function getColor(index: number, currentIndex: number) {
  if (index <= currentIndex) return theme`colors.nego.800`;

  if (index === currentIndex + 1) return theme`colors.nego.500`;

  return theme`colors.gray.400`;
}
