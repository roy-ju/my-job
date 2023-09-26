import { Panel } from '@/components/atoms';
import { OverlayPresenter, Popup } from '@/components/molecules';
import { MyAddressDetail } from '@/components/templates';
import { KakaoAddressAutocompleteResponseItem } from '@/hooks/services/useKakaoAddressAutocomplete';
import { useRouter } from '@/hooks/utils';
import Routes from '@/router/routes';
import { ChangeEventHandler, memo, useCallback, useEffect, useMemo, useState } from 'react';

interface Props {
  depth: number;
  panelWidth: string;
}

export default memo(({ depth, panelWidth }: Props) => {
  const router = useRouter(depth);
  const [addressData, setAddressData] = useState<KakaoAddressAutocompleteResponseItem | null>(null);
  const [dong, setDong] = useState('');
  const [ho, setHo] = useState('');
  const [popupOpen, setPopupOpen] = useState(true);

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

  const handleSubmit = useCallback(() => {
    router.replace(Routes.MyAddressVerifying, {
      searchParams: router?.query?.redirect ? { redirect: router.query.redirect as string } : undefined,
      state: {
        addressData: router.query.addressData as string,
        dong,
        ho,
        ...(router.query.origin
          ? {
              origin: router.query.origin as string,
            }
          : {}),
      },
    });
  }, [router, dong, ho]);

  const handleBack = useCallback(() => {
    router.replace(Routes.MyAddress, {
      state: {
        ...(router.query.origin
          ? {
              origin: router.query.origin as string,
            }
          : {}),
      },
    });
  }, [router]);

  useEffect(() => {
    const { addressData: inAddressData } = router.query;
    if (!inAddressData) {
      router.replace(Routes.MyAddress, {
        state: {
          ...(router.query.origin
            ? {
                origin: router.query.origin as string,
              }
            : {}),
        },
      });
    } else {
      const parsed = JSON.parse(inAddressData as string) as KakaoAddressAutocompleteResponseItem;
      setAddressData(parsed);
    }
  }, [router]);

  const getErrorMessage = () => {
    if (router.query.errorCode === '1036') return undefined;
    if (router.query.errorCode === '2005') return '상세주소가 정확하지 않습니다. 확인 후 다시 시도해 주세요.';
    if (router.query.errorCode === '10000') return '상세주소가 정확하지 않습니다. 확인 후 다시 시도해 주세요.';
    if (router.query.errorCode) return '인터넷 등기소에서 응답을 받을 수 없습니다. 잠시 후 다시 시도해주세요.';
    return undefined;
  };

  return (
    <Panel width={panelWidth}>
      <MyAddressDetail
        addressLine1={addressLine1}
        addressLine2={addressLine2}
        errorMessage={getErrorMessage()}
        dong={dong}
        ho={ho}
        onChangeDong={handleChangeDong}
        onChangeHo={handleChangeHo}
        onSubmit={handleSubmit}
        onSearchAnotherAddress={handleBack}
      />
      {router.query.errorCode === '1036' && popupOpen && (
        <OverlayPresenter>
          <Popup>
            <Popup.ContentGroup>
              <Popup.Title>
                주소 등록을 위한 주소 확인은 하루 최대 5회까지 할 수 있습니다. 내일 다시 참여해 주세요.
              </Popup.Title>
            </Popup.ContentGroup>
            <Popup.ButtonGroup>
              <Popup.ActionButton onClick={() => setPopupOpen(false)}>확인</Popup.ActionButton>
            </Popup.ButtonGroup>
          </Popup>
        </OverlayPresenter>
      )}
    </Panel>
  );
});
