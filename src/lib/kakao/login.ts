export default function loginWithKakao() {
  if (typeof Kakao !== 'undefined') {
    Kakao.Auth.login();
  }
}
