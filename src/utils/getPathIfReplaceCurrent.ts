export default function getPathIfReplaceCurrent(
  depth1: string,
  depth2: string,
  replacePath: string,
  targetPath: string,
) {
  if (depth1 && depth2) {
    if (depth1 === replacePath) {
      return `/${targetPath}/${depth2}`;
    }

    if (depth2 === replacePath) {
      return `/${depth1}/${targetPath}`;
    }

    return `/${depth1}/${targetPath}`;
  }

  if (depth1 && !depth2) {
    return `/${targetPath}`;
  }

  return `/${targetPath}`;
}
