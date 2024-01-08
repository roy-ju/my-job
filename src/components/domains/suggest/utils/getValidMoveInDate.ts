const getValidMoveInDate = (moveInDate: Date | null, moveInDateType: '이전' | '이후' | '당일' | '') =>
  !!(!moveInDate || !moveInDateType);

export default getValidMoveInDate;
