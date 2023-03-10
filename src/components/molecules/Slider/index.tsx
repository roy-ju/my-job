import RSlider, { ReactSliderProps } from 'react-slider';
import tw, { theme, styled } from 'twin.macro';

const StyledSlider = styled(RSlider<number[]>)`
  width: 100%;
  height: 24px;
  z-index: 3;
`;

const StyledThumb = styled.div`
  height: 24px;
  width: 24px;
  text-align: center;
  background-color: white;
  color: #fff;
  border-radius: 50%;
  cursor: grab;
  ${tw`border border-gray-300`}
`;

const StyledTrack = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  border-radius: 4px;
  height: 4px;
  width: 100%;
  padding-left: 12px;
  padding-right: 12px;
  z-index: 1;
`;

const InvisibleTrack = styled.div<{ index: number }>`
  top: 50%;
  bottom: 0;
  transform: translateY(-50%);
  background: ${(props) =>
    props.index === 1 ? theme`colors.gray.1000` : 'transparent'};
  border-radius: 4px;
  height: 4px;
  z-index: 1;
`;

const Label = styled.span`
  ${tw`text-gray-700 text-info`}
  position: absolute;
  top: 0;
  left: 50%;
  line-height: 1;
  transform: translateX(-50%) translateY(5px);
  white-space: nowrap;
`;

const Thumb: NonNullable<ReactSliderProps<number[]>['renderThumb']> = (
  props,
) => <StyledThumb {...(props as any)} />;

const Track: NonNullable<ReactSliderProps<number[]>['renderTrack']> = (
  props,
  state,
) => <InvisibleTrack {...(props as any)} index={state.index} />;

interface Props {
  min: number;
  max: number;
  step?: number;
  value?: number[];
  defaultValue?: number[];
  labels?: string[];
  minDistance?: number;
  onChange?: (value: number[], index: number) => void;
}

export default function Slider({
  min,
  max,
  step = 1,
  value,
  defaultValue,
  labels,
  minDistance = 1,
  onChange,
}: Props) {
  return (
    <div>
      <div tw="relative">
        <StyledSlider
          min={min}
          max={max}
          minDistance={minDistance}
          step={step}
          defaultValue={defaultValue}
          value={value}
          onChange={onChange}
          renderThumb={Thumb}
          renderTrack={Track}
        />
        <StyledTrack>
          <div tw="bg-gray-300 w-full h-full rounded-[4px]" />
        </StyledTrack>
      </div>
      {labels && (
        <div tw="flex justify-between px-3 pt-1 pb-3">
          {labels.map((label) => (
            <div key={label} tw="relative flex flex-col">
              <span tw="w-px h-1 bg-gray-400" />
              <Label>{label}</Label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
