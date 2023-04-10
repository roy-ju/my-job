export function checkPlatform(ua?: string) {
  if (ua === undefined) {
    ua = window.navigator.userAgent;
  }

  ua = ua.toLowerCase();
  const platform: { [x: string]: boolean } = {};
  const matched = {
    platform: '',
  };
  let userPlatform = 'pc';
  const platformMatch =
    /(ipad)/.exec(ua) ||
    /(ipod)/.exec(ua) ||
    /(windows phone)/.exec(ua) ||
    /(iphone)/.exec(ua) ||
    /(kindle)/.exec(ua) ||
    /(silk)/.exec(ua) ||
    /(android)/.exec(ua) ||
    /(win)/.exec(ua) ||
    /(mac)/.exec(ua) ||
    /(linux)/.exec(ua) ||
    /(cros)/.exec(ua) ||
    /(playbook)/.exec(ua) ||
    /(bb)/.exec(ua) ||
    /(blackberry)/.exec(ua) ||
    [];

  matched.platform = platformMatch[0] || '';

  if (matched.platform) {
    platform[matched.platform] = true;
  }

  if (
    platform.android ||
    platform.bb ||
    platform.blackberry ||
    platform.ipad ||
    platform.iphone ||
    platform.ipod ||
    platform.kindle ||
    platform.playbook ||
    platform.silk ||
    platform['windows phone']
  ) {
    userPlatform = 'mobile';
  }

  if (platform.cros || platform.mac || platform.linux || platform.win) {
    userPlatform = 'pc';
  }

  return userPlatform;
}
