import { Button } from '@/components/atoms';

import { NavigationHeader } from '@/components/molecules';

import Close from '@/assets/icons/close_18.svg';

type PhotoGalleryHeaderProps = { index: number; length: number; handleClose: () => void };

export default function PhotoGalleryHeader({ index, length, handleClose }: PhotoGalleryHeaderProps) {
  return (
    <NavigationHeader>
      <NavigationHeader.Title tw="absolute [left: 50%]">{`${index + 1}/${length}`}</NavigationHeader.Title>
      <Button variant="ghost" tw="px-0 py-0 h-[1.5rem]" onClick={handleClose}>
        <Close />
      </Button>
    </NavigationHeader>
  );
}
