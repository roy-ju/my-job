import React from 'react';

import tw, { styled } from 'twin.macro';

import Button from '@/components/atoms/Button';

import SearchIcon from '@/assets/icons/search.svg';

import DeleteIcon from '@/assets/icons/delete_all.svg';

const Container = styled.div`
  ${tw`flex items-center p-4 leading-4 border border-gray-300 rounded-lg [min-width: 308px]`}
`;

type QueryResultProps = {
  query: string;
  handleClickContainer: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  handleClickDeleteButton: (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

export default function QueryResult({ query, handleClickContainer, handleClickDeleteButton }: QueryResultProps) {
  return (
    <Container
      tw="flex items-center p-4 leading-4 border border-gray-300 rounded-lg [min-width: 308px]"
      onClick={handleClickContainer}
    >
      <SearchIcon tw="mr-2" />
      <span tw="font-normal [text-overflow: ellipsis] overflow-hidden whitespace-nowrap">{query}</span>
      <Button variant="ghost" tw="ml-auto p-0 pl-2 [height: 16px]" onClick={handleClickDeleteButton}>
        <DeleteIcon />
      </Button>
    </Container>
  );
}
