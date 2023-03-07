import { Button, Label, Radio } from '@/components/atoms';
import { ButtonGroup, RadioGroup } from '@/components/molecules';
import {
  ChangeEventHandler,
  ReactNode,
  useCallback,
  useRef,
  useState,
} from 'react';
import tw, { theme } from 'twin.macro';
import SchoolIcon from '@/assets/icons/school.svg';
import StackIcon from '@/assets/icons/stack.svg';
import MapPinRoad from '@/assets/icons/map_pin_road.svg';
import NaverMapPin from '@/assets/icons/naver_map_pin.svg';
import PlusIcon from '@/assets/icons/plus.svg';
import MinusIcon from '@/assets/icons/minus.svg';
import GPSIcon from '@/assets/icons/gps.svg';
import { usePopper } from 'react-popper';
import { useOutsideClick } from '@/hooks/utils';

interface OnClickProps {
  onClick?: () => void;
}

interface SelectableProps extends OnClickProps {
  selected?: boolean;
}

const ButtonText = tw.div`text-info text-gray-1000 mt-1`;

function MapButton({ selected = false, onClick }: SelectableProps) {
  return (
    <Button onClick={onClick} custom={tw`flex-col w-10 h-14`}>
      <NaverMapPin
        color={selected ? theme`colors.nego.1000` : theme`colors.gray.800`}
      />
      <ButtonText css={[selected && tw`font-bold text-nego-1000`]}>
        지도
      </ButtonText>
    </Button>
  );
}

function RoadMapButton({ selected = false, onClick }: SelectableProps) {
  return (
    <Button onClick={onClick} custom={tw`flex-col w-10 h-14`}>
      <MapPinRoad
        color={selected ? theme`colors.nego.1000` : theme`colors.gray.800`}
      />
      <ButtonText css={[selected && tw`font-bold text-nego-1000`]}>
        로드
      </ButtonText>
    </Button>
  );
}

function MapTileButton({ selected = false, onClick }: SelectableProps) {
  return (
    <Button onClick={onClick} custom={tw`flex-col w-10 h-14`}>
      <StackIcon
        color={selected ? theme`colors.nego.1000` : theme`colors.gray.800`}
      />
      <ButtonText css={[selected && tw`font-bold text-nego-1000`]}>
        지적
      </ButtonText>
    </Button>
  );
}

interface SchoolButtonProps extends SelectableProps {
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

function SchoolButton({
  selected = false,
  value,
  onChange,
  onClick,
}: SchoolButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [referenceElement, setReferenceElement] =
    useState<HTMLButtonElement | null>(null);
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(
    null,
  );
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: 'right-start',
  });

  const outsideRef = useRef<HTMLDivElement | null>(null);

  useOutsideClick({
    ref: outsideRef,
    handler: () => {
      setIsOpen(false);
    },
  });

  const handleButtonClick = useCallback(() => {
    onClick?.();
    setIsOpen(true);
  }, [onClick]);

  return (
    <>
      <Button
        ref={setReferenceElement}
        onClick={handleButtonClick}
        custom={tw`flex-col w-10 h-14`}
      >
        <SchoolIcon
          color={selected ? theme`colors.nego.1000` : theme`colors.gray.800`}
        />
        <ButtonText css={[selected && tw`font-bold text-nego-1000`]}>
          학교
        </ButtonText>
      </Button>
      {isOpen && (
        <div
          ref={setPopperElement}
          style={styles.popper}
          {...attributes.popper}
        >
          <div ref={outsideRef}>
            <RadioGroup
              value={value}
              onChange={onChange}
              tw="w-[108px] flex flex-col bg-white mr-2 rounded-lg shadow gap-4 p-4"
            >
              <Label control={<Radio />} value="elementary" label="초등학교" />
              <Label control={<Radio />} value="middle" label="중학교" />
              <Label control={<Radio />} value="high" label="고등학교" />
            </RadioGroup>
          </div>
        </div>
      )}
    </>
  );
}

function ZoomInButton({ onClick }: OnClickProps) {
  return (
    <Button onClick={onClick} custom={tw`flex-col w-10 h-10`}>
      <PlusIcon />
    </Button>
  );
}

function ZoomOutButton({ onClick }: OnClickProps) {
  return (
    <Button onClick={onClick} custom={tw`flex-col w-10 h-10`}>
      <MinusIcon />
    </Button>
  );
}

function GPSButton({ selected = false, onClick }: SelectableProps) {
  return (
    <Button
      onClick={onClick}
      theme="ghost"
      size="none"
      custom={tw`flex-col w-10 h-10 bg-white shadow`}
    >
      <GPSIcon
        color={selected ? theme`colors.nego.1000` : theme`colors.gray.800`}
      />
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
