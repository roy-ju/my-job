import { Button } from '@/components/atoms';
import { ButtonGroup } from '@/components/molecules';
import type { ReactNode } from 'react';
import tw from 'twin.macro';
import SchoolIcon from '@/assets/icons/school.svg';
import StackIcon from '@/assets/icons/stack.svg';
import MapPinRoad from '@/assets/icons/map_pin_road.svg';
import NaverMapPin from '@/assets/icons/naver_map_pin.svg';
import PlusIcon from '@/assets/icons/plus.svg';
import MinusIcon from '@/assets/icons/minus.svg';
import GPSIcon from '@/assets/icons/gps.svg';

const ButtonText = tw.div`text-info text-gray-1000 mt-1`;

function MapButton() {
  return (
    <Button custom={tw`flex-col w-10 h-14`}>
      <NaverMapPin />
      <ButtonText>지도</ButtonText>
    </Button>
  );
}

function RoadMapButton() {
  return (
    <Button custom={tw`flex-col w-10 h-14`}>
      <MapPinRoad />
      <ButtonText>로드</ButtonText>
    </Button>
  );
}

function MapTileButton() {
  return (
    <Button custom={tw`flex-col w-10 h-14`}>
      <StackIcon />
      <ButtonText>지적</ButtonText>
    </Button>
  );
}

function SchoolButton() {
  return (
    <Button custom={tw`flex-col w-10 h-14`}>
      <SchoolIcon />
      <ButtonText>학교</ButtonText>
    </Button>
  );
}

function ZoomInButton() {
  return (
    <Button custom={tw`flex-col w-10 h-10`}>
      <PlusIcon />
    </Button>
  );
}

function ZoomOutButton() {
  return (
    <Button custom={tw`flex-col w-10 h-10`}>
      <MinusIcon />
    </Button>
  );
}

function GPSButton() {
  return (
    <Button
      theme="ghost"
      size="none"
      custom={tw`flex-col w-10 h-10 bg-white shadow`}
    >
      <GPSIcon />
    </Button>
  );
}

function Group({ children }: { children?: ReactNode }) {
  return (
    <ButtonGroup
      separated
      theme="ghost"
      orientation="vertical"
      size="none"
      containerStyle={tw`bg-white rounded-lg shadow`}
    >
      {children}
    </ButtonGroup>
  );
}

function MapControls() {
  return null;
}

export default Object.assign(MapControls, {
  Group,
  MapButton,
  RoadMapButton,
  MapTileButton,
  SchoolButton,
  ZoomInButton,
  ZoomOutButton,
  GPSButton,
});
