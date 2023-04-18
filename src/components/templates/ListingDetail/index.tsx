import { GetListingDetailResponse } from '@/apis/listing/getListingDetail';
import { Loading, PersistentBottomBar } from '@/components/atoms';
import { NavigationHeader } from '@/components/molecules';
import { ListingCtaButtons } from '@/components/organisms';

export interface ListingDetailProps {
  listing?: GetListingDetailResponse['listing'];
  visitUserType?: number;
  isLoading?: boolean;
  onClickCta?: () => void;
}

export default function ListingDetail({ listing, visitUserType, isLoading, onClickCta }: ListingDetailProps) {
  if (isLoading)
    return (
      <div tw="py-20">
        <Loading />
      </div>
    );

  return (
    <div tw="flex flex-col h-full">
      <NavigationHeader>
        <NavigationHeader.Title>{listing?.listing_title}</NavigationHeader.Title>
      </NavigationHeader>
      <div tw="flex-1 min-h-0" />
      <PersistentBottomBar>
        <ListingCtaButtons visitUserType={visitUserType ?? 0} buttonSize="bigger" onClick={onClickCta} />
      </PersistentBottomBar>
    </div>
  );
}
