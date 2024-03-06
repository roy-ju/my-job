import tw, { styled } from 'twin.macro';

import { motion } from 'framer-motion';

import Title from './widget/Title';

import Thumbnail from './widget/Thumbnail';

type ListItemProps = {
  title: string;
  thumbnail: string;
};

const ListItemButton = styled(motion.button)`
  ${tw`flex flex-col gap-2 py-4 text-left`}
`;

export default function ListItem({ title, thumbnail }: ListItemProps) {
  return (
    <ListItemButton>
      <Title>{title}</Title>
      <Thumbnail>{thumbnail}</Thumbnail>
    </ListItemButton>
  );
}
