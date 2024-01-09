import dynamic from 'next/dynamic';

import usePopupHandler from '../hooks/usePopupHandler';

const ReselectConfirmPopup = dynamic(() => import('./ReselectConfirmPopup'), { ssr: false });

const RegionListPopup = dynamic(() => import('@/components/organisms/popups/RegionListPopup'), { ssr: false });

const DanjiListPopup = dynamic(() => import('@/components/organisms/popups/DanjiListPopup'), { ssr: false });

const QuitConfirmPopup = dynamic(() => import('./QuitConfirmPopup'), { ssr: false });

const BuyOrRentChangePopup = dynamic(() => import('./BuyOrRentChangePopup'), { ssr: false });

const RealestateTypeChangePopup = dynamic(() => import('./RealestateTypeChangePopup'), { ssr: false });

export default function Popups() {
  const {
    popup,
    handleUpdatePopup,
    handleUpdateAddressAndBubjungdong,
    handleUpdateDanjiInfo,
    handleQuitForm,
    handleUpdateFormReset,
    handleConfirmChangeBuyOrRent,
    handleConfirmChangeRealestateType,
  } = usePopupHandler();

  if (popup === 'regionList') {
    return <RegionListPopup onClickClose={() => handleUpdatePopup('')} onSubmit={handleUpdateAddressAndBubjungdong} />;
  }

  if (popup === 'danjiList') {
    return <DanjiListPopup onClickClose={() => handleUpdatePopup('')} onSubmitV2={handleUpdateDanjiInfo} />;
  }

  if (popup === 'reselectRegionOrDanji') {
    return <ReselectConfirmPopup onClickClose={() => handleUpdatePopup('')} onClickComfirm={handleUpdateFormReset} />;
  }

  if (popup === 'quit') {
    return <QuitConfirmPopup onClickClose={() => handleUpdatePopup('')} onClickConfirm={handleQuitForm} />;
  }

  if (popup === 'buyOrRent') {
    return (
      <BuyOrRentChangePopup onClickClose={() => handleUpdatePopup('')} onClickConfirm={handleConfirmChangeBuyOrRent} />
    );
  }

  if (popup === 'realestateTypes') {
    return (
      <RealestateTypeChangePopup
        onClickClose={() => handleUpdatePopup('')}
        onClickConfirm={handleConfirmChangeRealestateType}
      />
    );
  }

  return null;
}
