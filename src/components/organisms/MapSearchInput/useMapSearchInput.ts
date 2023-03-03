import { useContext } from 'react';
import MapSearchInputContext from './MapSearchInputContext';

export default function useMapSearchInput() {
  return useContext(MapSearchInputContext);
}
