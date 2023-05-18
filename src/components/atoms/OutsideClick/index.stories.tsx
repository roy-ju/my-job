import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { useState } from 'react';
import CharacterImage from '@/../public/static/images/character_mirror.png';
import Image from 'next/image';
import OutsideClick from '.';
import Panel from '../Panel';

export default {
  title: 'atoms/OutsideClick',
  component: OutsideClick,
} as ComponentMeta<typeof OutsideClick>;

export const Default: ComponentStory<typeof OutsideClick> = () => {
  const [description, setDescription] = useState('Click outside of this Character to unmount it');
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Panel>
      <h2 tw="p-5 text-center font-bold">{description}</h2>
      {isOpen && (
        <OutsideClick
          onOutsideClick={() => {
            setIsOpen(false);
            setDescription("You've unmounted the Character.");
          }}
        >
          <Image tw="mx-auto" src={CharacterImage} alt="character" />
        </OutsideClick>
      )}
    </Panel>
  );
};
