import { ReactNode, useContext, useEffect, useMemo, useRef } from 'react';
import { createPortal } from 'react-dom';
import { NaverMapContext } from '../../navermapV1';

type Anchor = 'center' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

interface Props {
  position: {
    lat: number;
    lng: number;
  };
  anchor?: Anchor;
  zIndex?: number;
  children?: ReactNode;
}

function getOffset(width: number, height: number, anchor: Anchor) {
  if (anchor === 'top-left') {
    return {
      widthOffset: 0,
      heightOffset: 0,
    };
  }
  if (anchor === 'top-right') {
    return {
      widthOffset: width,
      heightOffset: 0,
    };
  }
  if (anchor === 'bottom-left') {
    return {
      widthOffset: 0,
      heightOffset: height,
    };
  }
  if (anchor === 'bottom-right') {
    return {
      widthOffset: width,
      heightOffset: height,
    };
  }
  return {
    widthOffset: width / 2,
    heightOffset: height / 2,
  };
}

export default function CustomOverlayV1({ position, zIndex = 10, anchor = 'center', children }: Props) {
  const map = useContext(NaverMapContext);
  const containerRef = useRef(document.createElement('div'));
  const overlayViewRef = useRef(new naver.maps.OverlayView());
  const pos = useMemo(() => new naver.maps.LatLng(position.lat, position.lng), [position.lat, position.lng]);

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
    container.style.zIndex = `${zIndex}`;

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

      const { widthOffset, heightOffset } = getOffset(width, height, anchor);

      const x = pixelPosition.x - widthOffset;
      const y = pixelPosition.y - heightOffset;

      container.style.position = 'absolute';
      container.style.left = `${x}px`;
      container.style.top = `${y}px`;
    };

    return () => {
      overlayView.setMap(null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [anchor]);

  useEffect(() => {
    const overlayView = overlayViewRef.current;
    overlayView.setMap(map);
  }, [map]);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.style.zIndex = `${zIndex}`;
    }
  }, [zIndex]);

  return createPortal(children, containerRef.current);
}
