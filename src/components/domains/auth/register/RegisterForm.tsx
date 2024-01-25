import tw from 'twin.macro';

import Nickname from './Nickname';

import Email from './Email';

import FunnelInfo from './FunnelInfo';

import Terms from './Terms';

const Container = tw.div``;

export default Object.assign(Container, { Email, Nickname, Terms, FunnelInfo });
