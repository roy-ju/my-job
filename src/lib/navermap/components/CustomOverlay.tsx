import { ReactNode, useContext, useEffect, useMemo, useRef } from 'react';
import { createPortal } from 'react-dom';
import { NaverMapContext } from './Map';

type Props = {
  position: {
    lat: number;
    lng: number;
  };
  children?: ReactNode;
};

export default function CustomOverlay({ position, children }: Props) {
  const map = useContext(NaverMapContext);
  const containerRef = useRef(document.createElement('div'));
  const overlayViewRef = useRef(new naver.maps.OverlayView());
  const pos = useMemo(
    () => new naver.maps.LatLng(position.lat, position.lng),
    [position.lat, position.lng],
  );

  useEffect(() => {
    const overlayView = overlayViewRef.current;
    overlayView.position = pos;
    if (overlayView.getMap()) {
      overlayView.draw();
    }
  }, [pos]);

  useEffect(() => {
    const overlayView = overlayViewRef.current;
    const container = containerRef.current;

    container.style.width = 'fit-content';
    container.style.zIndex = '10';

    overlayView.onAdd = () => {
      const { overlayLayer } = overlayView.getPanes();
      overlayLayer.appendChild(containerRef.current);
    };

    overlayView.onRemove = () => {
      containerRef.current.remove();
    };

    overlayView.draw = () => {
      if (!overlayView.getMap() && overlayView.position) return;

      const projection = overlayView.getProjection();
      const pixelPosition = projection.fromCoordToOffset(overlayView.position!);

      const width = container.clientWidth;
      const height = container.clientHeight;

      const x = pixelPosition.x - width / 2;
      const y = pixelPosition.y - height / 2;

      container.style.position = 'absolute';
      container.style.left = `${x}px`;
      container.style.top = `${y}px`;
    };

    return () => {
      overlayView.setMap(null);
    };
  }, []);

  useEffect(() => {
    const overlayView = overlayViewRef.current;
    overlayView.setMap(map);
  }, [map]);

  return createPortal(children, containerRef.current);
}
