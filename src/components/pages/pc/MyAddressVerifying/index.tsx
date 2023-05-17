import verifyAddress from '@/apis/my/verifyAddress';
import verifyOwnership from '@/apis/my/verifyOwnership';
import { Panel } from '@/components/atoms';
import { MyAddressVerifying } from '@/components/templates';
import { KakaoAddressAutocompleteResponseItem } from '@/hooks/services/useKakaoAddressAutocomplete';
import { useRouter } from '@/hooks/utils';
import { searchAddress } from '@/lib/kakao/search_address';
import Routes from '@/router/routes';
import { memo, useCallback, useEffect } from 'react';
import { toast } from 'react-toastify';

interface Props {
  depth: number;
  panelWidth: string;
}

export default memo(({ depth, panelWidth }: Props) => {
  const router = useRouter(depth);

  const handleGoBack = useCallback(() => {
    router.replace(Routes.MyAddressDetail, {
      state: {
        addressData: router.query.addressData as string,
        ...(router.query.origin
          ? {
              origin: router.query.origin as string,
            }
          : {}),
      },
    });
  }, [router]);

  const verify = useCallback(async () => {
    const { addressData: inAddressData, dong, ho } = router.query;
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
      return;
    }

    const addressData = JSON.parse(inAddressData as string) as KakaoAddressAutocompleteResponseItem;
    let addressDetail = '';
    if (dong) {
      addressDetail += `${dong}동 `;
    }
    if (ho) {
      addressDetail += `${ho}호`;
    }

    const res = await verifyAddress({
      address_detail: addressDetail,
      jibun_address: addressData.addressName,
      road_name_address: addressData.roadAddressName,
    });

    if (res?.error_code) {
      router.replace(Routes.MyAddressDetail, {
        state: {
          addressData: router.query.addressData as string,
          errorCode: `${res.error_code}`,
          ...(router.query.origin
            ? {
                origin: router.query.origin as string,
              }
            : {}),
        },
      });
      return;
    }

    if (res?.address_list?.length === 1) {
      const verifiedAddress = res.address_list[0];
      const res2 = await searchAddress(verifiedAddress.full_road_name_address);
      if (res2 && res2?.documents[0].address?.b_code) {
        await verifyOwnership({
          realestate_unique_number: verifiedAddress.realestate_unique_number,
          address_detail: verifiedAddress.address_detail,
          bubjungdong_code: res2.documents[0].address.b_code,
          jibun_address: res2.documents[0].address.address_name,
          building_name: res2.documents[0].road_address?.building_name ?? '',
          eubmyundong: res2.documents[0].address.region_3depth_name,
          lat: addressData.lat,
          long: addressData.lng,
          li: '',
          road_name_address: addressData.roadAddressName,
          sido: res2.documents[0].address.region_1depth_name,
          sigungu: res2.documents[0].address.region_2depth_name,
        });
      }

      toast.success('주소가 성공적으로 변경되었습니다');
      router.replace(Routes.MyDetail);
    } else {
      router.replace(Routes.MyAddressDetail, {
        state: {
          addressData: router.query.addressData as string,
          errorCode: '10000',
          ...(router.query.origin
            ? {
                origin: router.query.origin as string,
              }
            : {}),
        },
      });
    }
  }, [router]);

  useEffect(() => {
    verify();
  }, [verify]);

  return (
    <Panel width={panelWidth}>
      <MyAddressVerifying onClickBack={handleGoBack} />
    </Panel>
  );
});
