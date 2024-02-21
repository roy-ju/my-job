export const NICKNAME_REGEX = {
  general: /^[a-zA-Z0-9가-힣]{3,16}$/,
  length: /^.{3,16}$/,
  noSpecialStringRegex: /^[a-zA-Z0-9가-힣ㄱ-ㅎㅏ-ㅣ]*$/,
  validCharactersRegex: /^[가-힣ㄱ-ㅎㅏ-ㅣ0-9a-zA-Z.~!@#$%^&*()_+-=[\]{}|;:'"ㆍᆢ,.<>/?\\]*$/,
};
