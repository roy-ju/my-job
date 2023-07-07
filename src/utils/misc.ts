export function getBrowser() {
  if ((navigator.userAgent.indexOf('Opera') || navigator.userAgent.indexOf('OPR')) !== -1) {
    return 'Opera';
  }
  if (navigator.userAgent.indexOf('Chrome') !== -1) {
    return 'Chrome';
  }
  if (navigator.userAgent.indexOf('Safari') !== -1) {
    return 'Safari';
  }
  if (navigator.userAgent.indexOf('Firefox') !== -1) {
    return 'Firefox';
  }
  if (navigator.userAgent.indexOf('MSIE') !== -1 || !!(document as any).documentMode) {
    return 'IE';
  }
  return 'Unknown';
}

export function getDevice() {
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
    return 'Mobile';
  }
  return 'PC';
}


