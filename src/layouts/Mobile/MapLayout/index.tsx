import OutsideClick from '@/components/atoms/OutsideClick';

import { Map } from '@/lib/navermap';
import { ReactNode, useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from '@/hooks/utils';
import Routes from '@/router/routes';
import MobLayoutMapContainer from '@/components/templates/MobMapLayout';
import { MapFilter } from '@/components/organisms';
import useMapLayout from './useMapLayout';
import Markers from './Markers';

interface Props {
  children?: ReactNode;
}

function MapWrapper() {
  const {
    morphToCurrentLocation,
    handleChangeMapType,
    handleChangeMapLayer,
    handleChangeSchoolType,
    handleMapSearch,
    handleChangeFilter,
    handleChangeMapToggleValue,
    handleChangePriceType,
    handleCloseStreetView,
    mapType,
    mapLayer,
    schoolType,
    centerAddress,
    bounds,
    filter,
    markers,
    schoolMarkers,
    mapToggleValue,
    listingCount,
    selectedDanjiSummary,
    selectedSchoolID,
    priceType,
    streetViewEvent,
    ...props
  } = useMapLayout();

  return (
    <>
      <MobLayoutMapContainer
        mapLayer={mapLayer}
        mapType={mapType}
        schoolType={schoolType}
        priceType={priceType}
        filter={filter}
        centerAddress={centerAddress}
        mapToggleValue={mapToggleValue}
        onClickCurrentLocation={morphToCurrentLocation}
        onChangeMapType={handleChangeMapType}
        onClickMapLayerCadastral={() => handleChangeMapLayer('cadastral')}
        onClickMapLayerStreet={() => handleChangeMapLayer('street')}
        onChangeSchoolType={handleChangeSchoolType}
        onMapSearchSubmit={handleMapSearch}
        onChangeFilter={handleChangeFilter}
        onChangeMapToggleValue={handleChangeMapToggleValue}
        onChangePriceType={handleChangePriceType}
      >
        <Map {...props}>
          <Markers
            mapLevel={bounds?.mapLevel ?? 4}
            markers={markers}
            schoolMarkers={schoolMarkers}
            selectedDanjiSummary={selectedDanjiSummary}
            selectedSchoolID={selectedSchoolID}
          />
        </Map>
      </MobLayoutMapContainer>
      <AnimatePresence>
        {streetViewEvent && (
          // <Layout.Overlay tw="flex items-center justify-center">
          //   <OutsideClick onOutsideClick={handleCloseStreetView}>
          //     <motion.div
          //       initial={{ scale: 0, opacity: 0 }}
          //       animate={{ scale: 1, opacity: 1 }}
          //       exit={{ scale: 0, opacity: 0 }}
          //     >
          //       <div tw="w-[780px] max-h-[960px] h-[85vh] bg-white rounded-lg">
          //         <MapStreetView
          //           position={{ lat: streetViewEvent.latlng.lat(), lng: streetViewEvent.latlng.lng() }}
          //           title={streetViewEvent.address}
          //           onClickBackButton={handleCloseStreetView}
          //         >
          //           <MapStreetView.Panorama />
          //           <MapStreetView.Map />
          //         </MapStreetView>
          //       </div>
          //     </motion.div>
          //   </OutsideClick>
          // </Layout.Overlay>
          <div />
        )}
      </AnimatePresence>
    </>
  );
}

export default function MobMapLayout() {
  return <MapWrapper />;
}
