import { useCallback } from 'react';

import { useRouter } from 'next/router';

import tw, { styled } from 'twin.macro';

import { motion } from 'framer-motion';

import useCheckPlatform from '@/hooks/useCheckPlatform';

import Routes from '@/router/routes';

import Title from './widget/Title';

import Thumbnail from './widget/Thumbnail';

type ListItemProps = {
  id: number;
  title: string;
  thumbnail: string;
};

const ListItemButton = styled(motion.button)`
  ${tw`flex flex-col gap-2 py-4 text-left`}
`;

export default function ListItem({ id, title, thumbnail }: ListItemProps) {
  const router = useRouter();

  const { platform } = useCheckPlatform();

  const handleClickListItem = useCallback(() => {
    if (platform === 'pc') {
      router.push({ pathname: `/${Routes.My}/${Routes.DictionaryDetail}`, query: { dictID: `${id}` } });
    }

    if (platform === 'mobile') {
      router.push(`/${Routes.EntryMobile}/${Routes.DictionaryDetail}?dictID=${id}`);
    }
  }, [id, platform, router]);

  return (
    <ListItemButton onClick={handleClickListItem}>
      <Title>{title}</Title>
      <Thumbnail>{thumbnail}</Thumbnail>
    </ListItemButton>
  );
}
