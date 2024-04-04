/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable func-names */
import React, { useContext, useEffect, useMemo, useRef } from 'react';

import ReactDOM from 'react-dom';

import { NaverMapContext } from '@/lib/navermapV1';

export type CustomOverlayDanjiProps = {
  id?: string;
  className?: string;
  zIndex?: number;
  position: {
    lat: number;
    lng: number;
  };
  children: React.ReactNode;
  centerDanji?: {
    lat: number;
    lng: number;
  };
  isMarker?: boolean;
};

class OverlayViewDanji extends naver.maps.OverlayView {
  private _element: HTMLElement | undefined;

  private _position: naver.maps.LatLng;

  constructor(element: HTMLElement, position: naver.maps.LatLng) {
    super();
    this._element = element;
    this._position = position;
  }

  setPosition(position: naver.maps.LatLng) {
    this._position = position;
    this.draw();
  }

  getPosition() {
    return this._position;
  }

  onAdd() {
    if (!this._element) return;
    const { overlayLayer } = this.getPanes();
    overlayLayer.appendChild(this._element);
  }

  onRemove() {
    if (!this._element) return;
    this._element.remove();
  }

  draw() {
    if (!this.getMap() || !this._element) return;
    const projection = this.getProjection();
    const position = this.getPosition();
    const pixelPosition = projection.fromCoordToOffset(position);
    const offsetX = this._element.clientWidth / 2;
    const offsetY = this._element.clientHeight / 2;

    this._element.style.position = 'absolute';
    this._element.style.left = `${pixelPosition.x - offsetX}px`;
    this._element.style.top = `${pixelPosition.y - offsetY}px`;
  }
}

export default function CustomOverlayDanji({
  id,
  className,
  position,
  children,
  centerDanji,
  zIndex,
}: CustomOverlayDanjiProps) {
  const map = useContext(NaverMapContext);
  const container = useRef(document.createElement('div'));

  const overlayPosition = useMemo(() => {
    if (!naver.maps) {
      return null;
    }

    return new naver.maps.LatLng(position.lat, position.lng);
  }, [position.lat, position.lng]);

  const overlay = useMemo(() => {
    if (overlayPosition) {
      return new OverlayViewDanji(container.current, overlayPosition);
    }

    return null;
  }, [overlayPosition]);

  const circle = useMemo(() => {
    if (overlayPosition && centerDanji) {
      return new naver.maps.Circle({
        map,
        center: { lat: centerDanji.lat, lng: centerDanji.lng },
        radius: 1000,
        fillColor: '#FF2C40',
        fillOpacity: 0.1,
        strokeColor: '#FF000B',
        strokeWeight: 0.5,
        zIndex: 0,
      });
    }

    return null;
  }, []);

  useEffect(() => {
    if (!map) return () => {};

    overlay?.setMap(map);

    naver.maps.Event.addListener(map, 'click', (e) => {
      e.point.x = 230;
    });

    return () => {
      overlay?.setMap(null);
    };
  }, [map, overlay]);

  useEffect(() => {
    if (overlayPosition) {
      overlay?.setPosition(overlayPosition);
    }
  }, [overlay, overlayPosition]);

  useEffect(() => {
    if (!map) return () => {};

    circle?.setMap(map);

    return () => {
      circle?.setMap(null);
    };
  }, [map, circle]);

  useEffect(() => {
    if (id) container.current.id = id;
  }, [id]);

  useEffect(() => {
    if (className) container.current.className = className;
  }, [className]);

  useEffect(() => {
    if (container?.current) {
      container.current.style.zIndex = `${zIndex}`;
    }
  }, [zIndex]);

  return ReactDOM.createPortal(children, container.current);
}
