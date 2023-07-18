import { useCallback } from 'react';
import tw from 'twin.macro';
import ComparisonZero from '@/assets/icons/selected_danji_one.svg';
import ComparisonOne from '@/assets/icons/selected_danji_two.svg';
import ComparisonTwo from '@/assets/icons/selected_danji_three.svg';
import ComparisonThree from '@/assets/icons/selected_danji_four.svg';
import ComparisonFour from '@/assets/icons/selected_danji_five.svg';
import ComparisonFive from '@/assets/icons/selected_danji_six.svg';
import { Button } from '@/components/atoms';

type ListItemDanji = { name: string; danjiID: number; rt: number };

const Wrraper = tw.div``;

const commonIconStyle = {};

export const SelectedDanjiListItem = ({
  listLength,
  item,
  index,
  title,
  isDefaultDanji = false,
  removeDanji,
}: {
  listLength?: number;
  item?: ListItemDanji;
  index: string;
  title: string;
  isDefaultDanji?: boolean;
  removeDanji?: (item: ListItemDanji) => void;
}) => {
  const getRenderIcon = useCallback((idx: string) => {
    if (idx === '#FF542D') return <ComparisonZero style={commonIconStyle} />;
    if (idx === '#20C764') return <ComparisonOne style={commonIconStyle} />;
    if (idx === '#EA2323') return <ComparisonTwo style={commonIconStyle} />;
    if (idx === '#FFCD4E') return <ComparisonThree style={commonIconStyle} />;
    if (idx === '#4C6EF5') return <ComparisonFour style={commonIconStyle} />;
    if (idx === '#7048E8') return <ComparisonFive style={commonIconStyle} />;

    return null;
  }, []);

  return (
    <Wrraper
      tw="flex flex-row items-center py-3"
      css={[
        isDefaultDanji ? tw`gap-1` : tw`gap-1 cursor-pointer`,
        !!listLength && tw`[border-bottom: 1px solid #F8F9FA]`,
      ]}
      onClick={removeDanji && item ? () => removeDanji(item) : () => {}}
    >
      {getRenderIcon(index)}
      <span
        tw="ml-2 text-info [line-height: 1.25rem] text-gray-1000"
        style={isDefaultDanji ? { color: '#FF542D', fontWeight: 700 } : {}}
      >
        {title}
      </span>
      {!isDefaultDanji && item && (
        <Button
          variant="ghost"
          tw="h-0 pr-0 ml-auto [text-decoration: underline]  text-gray-700"
          onClick={() => {
            removeDanji?.(item);
          }}
        >
          삭제
        </Button>
      )}
    </Wrraper>
  );
};
