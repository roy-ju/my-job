export function isKakaoSDKLoaded() {
  return typeof Kakao !== 'undefined';
}

export { default as loginWithKakao } from './login';

export { default as searchKeyword } from './search_keyword';

export { default as coordToRegion } from './coord_to_region';
