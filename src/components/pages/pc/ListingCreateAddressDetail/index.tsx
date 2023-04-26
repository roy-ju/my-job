import checkDuplicate from '@/apis/listing/checkDuplicate';
import createListing from '@/apis/listing/createListing';
import { Panel } from '@/components/atoms';
import { OverlayPresenter, Popup } from '@/components/molecules';
import { ListingCreateAddressDetail } from '@/components/templates';
import { KakaoAddressAutocompleteResponseItem } from '@/hooks/services/useKakaoAddressAutocomplete';
import { useRouter } from '@/hooks/utils';
import { searchAddress } from '@/lib/kakao/search_address';
import Routes from '@/router/routes';
import { ChangeEventHandler, memo, useCallback, useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';

interface Props {
  depth: number;
  panelWidth: string;
}

export default memo(({ depth, panelWidth }: Props) => {
  const router = useRouter(depth);
  const [addressData, setAddressData] = useState<KakaoAddressAutocompleteResponseItem | null>(null);
  const [dong, setDong] = useState('');
  const [ho, setHo] = useState('');
  const [popup, setPopup] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const addressLine1 = useMemo(() => {
    if (addressData) {
      if (addressData.roadAddressName) {
        return addressData.roadAddressName;
      }
      return addressData.addressName;
    }
    return '';
  }, [addressData]);

  const addressLine2 = useMemo(() => {
    if (addressData && addressData.placeName) {
      return addressData.placeName;
    }
    return '';
  }, [addressData]);

  const handleChangeDong = useCallback<ChangeEventHandler<HTMLInputElement>>((e) => {
    setDong(e.target.value);
  }, []);

  const handleChangeHo = useCallback<ChangeEventHandler<HTMLInputElement>>((e) => {
    setHo(e.target.value);
  }, []);

  const handleSubmit = useCallback(async () => {
    setIsLoading(true);
    const roadNameAddress = addressData?.roadAddressName;
    if (!roadNameAddress) {
      toast.error('road_name_address is undefined');
      return;
    }

    const dupRes = await checkDuplicate({
      roadNameAddress,
      dong,
      ho,
    });

    if (!dupRes?.can_create) {
      setPopup('중복된 매물이 등록되어있습니다.');
      setIsLoading(false);
      return;
    }

    const searchRes = await searchAddress(roadNameAddress);

    if (!searchRes || !searchRes.documents[0]?.address?.b_code) {
      toast.error('unable to get bubjungdong_code from kakao');
      setIsLoading(false);
      return;
    }

    const address = searchRes.documents[0].address;
    const roadAddress = searchRes.documents[0].road_address;

    const createRes = await createListing({
      road_name_address: roadNameAddress,
      jibun_address: addressData.addressName,
      bubjungdong_code: address.b_code,
      sido: address.region_1depth_name,
      sigungu: address.region_2depth_name,
      eubmyundong: address.region_3depth_name,
      li: '',
      building_name: roadAddress?.building_name ?? '',
      long: addressData.lng,
      lat: addressData.lat,
      dong,
      ho,
    });

    if (!createRes?.listing_id) {
      toast.error('unable to create listing');
      return;
    }

    setIsLoading(false);

    router.replace(Routes.ListingCreateForm, {
      searchParams: {
        listingID: `${createRes.listing_id}`,
      },
      state: {
        addressLine1,
        addressLine2,
        addressData: router.query.addressData as string,
      },
    });
  }, [router, dong, ho, addressData, addressLine1, addressLine2]);

  const handleBack = useCallback(() => {
    router.replace(Routes.ListingCreateAddress);
  }, [router]);

  useEffect(() => {
    const { addressData: inAddressData } = router.query;
    if (!inAddressData) {
      router.replace(Routes.ListingCreateAddress);
    } else {
      const parsed = JSON.parse(inAddressData as string) as KakaoAddressAutocompleteResponseItem;
      setAddressData(parsed);
    }
  }, [router]);

  return (
    <Panel width={panelWidth}>
      <ListingCreateAddressDetail
        addressLine1={addressLine1}
        addressLine2={addressLine2}
        errorMessage={
          router.query.errorCode && router.query.errorCode !== '1036'
            ? '인터넷 등기소에서 응답을 받을 수 없습니다. 잠시 후 다시 시도해주세요.'
            : undefined
        }
        dong={dong}
        ho={ho}
        onChangeDong={handleChangeDong}
        onChangeHo={handleChangeHo}
        onSubmit={handleSubmit}
        onSearchAnotherAddress={handleBack}
        isLoading={isLoading}
      />
      {popup && (
        <OverlayPresenter>
          <Popup>
            <Popup.ContentGroup tw="py-12">
              <Popup.Title>{popup}</Popup.Title>
            </Popup.ContentGroup>
            <Popup.ButtonGroup>
              <Popup.ActionButton onClick={() => setPopup('')}>확인</Popup.ActionButton>
            </Popup.ButtonGroup>
          </Popup>
        </OverlayPresenter>
      )}
    </Panel>
  );
});
