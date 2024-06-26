import { TopContainer } from './widget/DetailTopWidget';

import { contentVariants } from './constants/animations';

type DetailTopProps = {
  name: string;
  content: string;
};

export default function DetailTop({ name, content }: DetailTopProps) {
  return (
    <TopContainer variants={contentVariants}>
      <span>{name}</span>
      <p>{content}</p>
    </TopContainer>
  );
}
