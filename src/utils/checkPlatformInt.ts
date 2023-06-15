export function checkPlatformInt() {
  const varUA = navigator.userAgent.toLowerCase(); // userAgent 값 얻기

  if (varUA.indexOf('android') > -1) {
    return 1;
  }
  if (varUA.indexOf('iphone') > -1 || varUA.indexOf('ipad') > -1 || varUA.indexOf('ipod') > -1) {
    return 2;
  }

  return 0;
}
