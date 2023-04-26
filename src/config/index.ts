const AppConfig = {
  title: process.env.NEXT_PUBLIC_APP_ENVIRONMENT === 'test' ? '네고시오 테스트' : '네고시오',
  description: '네고가 쉬워지는 부동산 가격 협상 플랫폼',
  locale: 'ko',
};

export default AppConfig;
