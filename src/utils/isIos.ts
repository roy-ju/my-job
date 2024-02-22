export default function isIOS() {
  const userAgent = window.navigator.userAgent;

  const result =
    /iPad|iPhone|iPod/.test(userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

  return result;
}
