import BulbIcon from '@/assets/icons/bulb_20.svg';

import { MiddleContainer, Flex } from './widget/DetailMiddelWidget';

import { contentVariants } from './constants/animations';

type DetailMiddleProps = {
  content: string;
};

export default function DetailMiddle({ content }: DetailMiddleProps) {
  if (!content) return null;

  return (
    <MiddleContainer variants={contentVariants}>
      <Flex>
        <BulbIcon />
        <span>참고사항</span>
      </Flex>
      <p>{content}</p>
    </MiddleContainer>
  );
}
