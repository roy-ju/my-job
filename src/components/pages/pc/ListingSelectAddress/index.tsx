import useAPI_GetListingDetail from '@/apis/listing/getListingDetail';
import { AuthRequired, Loading, Panel } from '@/components/atoms';
import { ListingSelectAddress } from '@/components/templates';
import { useRouter } from '@/hooks/utils';
import { useRouter as useNextRouter } from 'next/router';
import Routes from '@/router/routes';
import convertPriceInputToNumber from '@/utils/convertPriceInputToNumber';
import { memo, useCallback, useEffect, useState } from 'react';
import useAPI_GetMyAddressList from '@/apis/my/getMyAddressList';
import { OverlayPresenter, Popup } from '@/components/molecules';
import { useAuth } from '@/hooks/services';

interface Props {
  depth: number;
  panelWidth?: string;
}

export default memo(({ depth, panelWidth }: Props) => {
  const router = useRouter(depth);
  const nextRouter = useNextRouter();

  const { user, isLoading: userIsLoading } = useAuth();

  const { list, isLoading } = useAPI_GetMyAddressList(true);

  const [showInActivePopup, setShowInActivePopup] = useState(false);

  const [selectedUserAddressID, setSelectedUserAddressID] = useState<number>();

  const handleClickItem = useCallback(
    (id: number) => {
      if (selectedUserAddressID === id) {
        setSelectedUserAddressID(undefined);
        return;
      }
      setSelectedUserAddressID(id);
    },
    [selectedUserAddressID],
  );

  const handleNext = useCallback(() => {
    if (!selectedUserAddressID) return;

    router.replace(Routes.ListingCreateForm, {
      searchParams: {
        danjiID: router?.query?.danjiID ? (router.query.danjiID as string) : '',
        redirect: router?.query?.redirect ? (router.query.redirect as string) : '',
        userAddressID: `${selectedUserAddressID}`,
      },
    });
  }, [router, selectedUserAddressID]);

  const handleClickHome = () => {
    nextRouter.replace('/');
  };

  const handleClickAddMyAddress = () => {
    router.replace(Routes.MyAddress);
  };

  useEffect(() => {
    if (!userIsLoading && user && user?.hasAddress === false) {
      setShowInActivePopup(true);
    }
  }, [user, userIsLoading]);

  return (
    <AuthRequired ciRequired>
      <Panel width={panelWidth}>
        {!showInActivePopup &&
          (isLoading ? (
            <div tw="py-20">
              <Loading />
            </div>
          ) : (
            <ListingSelectAddress
              list={list}
              selectedUserAddressID={selectedUserAddressID}
              onClickNext={handleNext}
              onClickItem={handleClickItem}
              onClickAddMyAddress={handleClickAddMyAddress}
            />
          ))}
      </Panel>

      {showInActivePopup && (
        <OverlayPresenter>
          <Popup>
            <Popup.ContentGroup tw="py-6">
              <Popup.SubTitle tw="text-center">
                현재 로그인 계정으로는
                <br />
                접근이 불가능한 페이지입니다.
              </Popup.SubTitle>
            </Popup.ContentGroup>
            <Popup.ButtonGroup>
              <Popup.ActionButton onClick={handleClickHome}>네고시오 홈으로 돌아가기</Popup.ActionButton>
            </Popup.ButtonGroup>
          </Popup>
        </OverlayPresenter>
      )}
    </AuthRequired>
  );
});
