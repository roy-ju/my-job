export const regPhone = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;

export const detectRobot = (userAgent: string) => {
  const robots = new RegExp([/Googlebot/].map((r) => r.source).join('|'), 'i');
  return robots.test(userAgent);
};
