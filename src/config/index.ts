import Paths from '@/constants/paths';

const AppConfig = {
  title:
    process.env.NEXT_PUBLIC_APP_ENVIRONMENT === 'test'
      ? '(TEST) 부동산 가격협상 앱 네고시오'
      : '부동산 가격협상 앱 네고시오',
  description: '네고가 쉬워지는 부동산 가격 협상 플랫폼, 네고시오',
  locale: 'ko',
  ogImagePath: Paths.DEFAULT_OPEN_GRAPH_IMAGE_1,

};

export default AppConfig;
