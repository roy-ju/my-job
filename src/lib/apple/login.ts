export default function loginWithApple(state?: string) {
  window.AppleID.auth.init({
    clientId: 'kr.co.negocio.service',
    scope: 'email name',
    redirectURI: `${window.location.origin}/callback/appleLogin`,
    state: state ?? '',
    usePopup: false,
  });
  window.AppleID.auth.signIn();
}
