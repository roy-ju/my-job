const getValidBuyPurpose = (
  purpose: '' | '실거주' | '투자',
  investAmount: string,
  moveInDate: Date | null,
  moveInDateType: '이전' | '이후' | '당일' | '',
) => {
  if (!purpose) return true;

  if (purpose === '투자') {
    return !investAmount;
  }

  if (purpose === '실거주') {
    return !!(!moveInDate || !moveInDateType);
  }

  return false;
};

export default getValidBuyPurpose;
