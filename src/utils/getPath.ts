interface NavigationOption {
  push?: boolean;
  replace?: boolean;
  replaceAll?: boolean;
}

const getPath = ({
  depth1,
  depth2,
  targetPath,
  option = { push: false, replace: true, replaceAll: false },
}: {
  depth1?: NegocioPath;
  depth2?: NegocioPath;
  targetPath: NegocioPath;
  option?: NavigationOption;
}) => {
  if (option.replaceAll) {
    return `/${targetPath}`;
  }

  if (!depth1) return `/${targetPath}`;

  if (option.replace) {
    if (depth1 === targetPath) {
      return `/${targetPath}`;
    }

    return `/${depth1}/${targetPath}`;
  }

  if (option.push) {
    if (depth1 && !depth2) {
      return `/${depth1}/${targetPath}`;
    }

    if (depth1 && depth2) {
      return `/${depth2}/${targetPath}`;
    }
  }
};

export default getPath;
