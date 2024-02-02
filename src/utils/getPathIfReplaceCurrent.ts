export default function getPathIfReplaceCurrent(depth1: string, depth2: string, targetPath: string, push = true) {
  if (depth1 && depth2) {
    return `/${depth1}/${targetPath}`;
  }

  if (depth1 && !depth2) {
    if (push) {
      return `/${depth1}/${targetPath}`;
    }

    return `/${targetPath}`;
  }

  return `/${targetPath}`;
}
