import tw from 'twin.macro';

import { Separator as BaseSeparator } from '@/components/atoms';

import ProfileImage from './ProfileImage';

import Name from './Name';

import Nickname from './Nickname';

import Phone from './Phone';

import EasyLogin from './EasyLogin';

import VerifyCi from './VerifyCi';

const Separator = tw(BaseSeparator)`my-10`;

const Container = tw.div``;

export default Object.assign(Container, {
  ProfileImage,
  Nickname,
  Name,
  Phone,
  EasyLogin,
  VerifyCi,
  Separator,
});
