import { PageNotFound } from '@/components/templates';
import { NextPage } from 'next';

type Props = {
  statusCode?: number;
};

const Error: NextPage = ({ statusCode }: Props) => {
  switch (statusCode) {
    case 404:
      return <PageNotFound />;
    default:
      return <h1>error!</h1>;
  }
};

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
