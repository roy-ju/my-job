import { useEffect, useState } from 'react';

const useSuffixPosition = (
  inputRef: React.RefObject<HTMLInputElement>,
  suffixRef: React.RefObject<HTMLSpanElement>,
  targetText: string,
  suffix: string,
) => {
  const [suffixPosition, setSuffixPosition] = useState<number>(0);

  useEffect(() => {
    if (inputRef?.current && suffixRef?.current && targetText) {
      const ctx = document.createElement('canvas').getContext('2d');
      if (!ctx) return;

      const style = window.getComputedStyle(inputRef.current);
      ctx.font = `${style.fontStyle} ${style.fontVariant} ${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;

      const textWidth = ctx.measureText(targetText).width;
      const padding = 20;
      setSuffixPosition(textWidth + padding);
    }
  }, [inputRef, suffixRef, targetText]);

  return { left: suffixPosition, top: 10, suffix };
};

export default useSuffixPosition;
