import { memo } from 'react';

import Panel from '@/components/atoms/Panel';

import ListingPhotoGallery from '@/components/domains/listings/ListingPhotoGallery';

interface Props {
  panelWidth?: string;
}

function ListingPhotoGalleryPc({ panelWidth }: Props) {
  return (
    <Panel width={panelWidth}>
      <ListingPhotoGallery />
    </Panel>
  );
}

export default memo(ListingPhotoGalleryPc);
