import CarouselType from './CarouselType';

import ColumnType from './ColumnType';

const NewsContainer = ({ children }: { children: React.ReactNode }) => <>{children}</>;

const News = Object.assign(NewsContainer, { CarouselType, ColumnType });

export default News;
