type OptionsArray = string[];

interface HashTagsObject {
  [key: string]: OptionsArray;
}

export default function addObjectIfKeyNotExists(
  array: HashTagsObject[],
  key: string,
  optionsArray: OptionsArray,
): void {
  const isKeyExists = array.some((obj) => Object.hasOwnProperty.call(obj, key));

  if (!isKeyExists) {
    const newObject: HashTagsObject = {};
    newObject[key] = optionsArray;
    array.push(newObject);
  }
}
