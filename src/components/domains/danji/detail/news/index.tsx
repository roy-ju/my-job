import List from './List';

const NewsContainer = ({ children }: { children: React.ReactNode }) => <>{children}</>;

const News = Object.assign(NewsContainer, { List });

export default News;
