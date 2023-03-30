export default function loginWithKakao() {
  if (typeof Kakao !== 'undefined') {
    Kakao.Auth.authorize({
      redirectUri: `${window.location.origin}/callback/kakaoLogin`,
    });
  }
}
