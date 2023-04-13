export default function checkValidPhone(ele: string) {
  const regexInner: RegExp = /^[0-9|-]*$/;
  const regExp = regexInner;
  if (regExp.test(ele) === true) {
    return true;
  }
  return false;
}
