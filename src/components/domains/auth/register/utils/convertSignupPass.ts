export default function convertSignupPass(v?: string) {
  if (!v) return '';

  if (v === 'internet') return '인터넷 검색';
  if (v === 'sns') return 'SNS 및 블로그';
  if (v === 'appstore') return '앱스토어';
  if (v === 'friends') return '지인 소개';
  if (v === 'ad') return '광고';
  if (v === 'news') return '뉴스 기사';

  return '기타';
}
