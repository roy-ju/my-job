import Header from './login/Header';

import Title from './login/Title';

import ImageContent from './login/ImageContent';

import Ctas from './login/Ctas';

type LoginProps = { depth?: number; ipAddress?: string };

export default function Login({ depth, ipAddress }: LoginProps) {
  return (
    <div tw="flex flex-col h-full relative">
      <Header />
      <div tw="flex-1 flex flex-col h-full min-h-0 gap-10 pt-10 pb-12 overflow-y-auto">
        <Title />
        <ImageContent />
        <Ctas depth={depth} ipAddress={ipAddress} />
      </div>
    </div>
  );
}
