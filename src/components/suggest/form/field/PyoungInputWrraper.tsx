import { motion } from 'framer-motion';

import tw, { styled } from 'twin.macro';

import PyoungInputField from './PyoungInputField';

import useChangePyoungInput from '../hooks/useChangePyoungInput';

import RegionSelectedPyoungListField from './RegionSelectedPyoungListField';

const Line = styled(motion.div)`
  ${tw`bg-gray-200 w-full [height: 1px] my-6`}
`;

export default function PyoungInputWrraper() {
  const {
    isRenderPyoungInputField,
    isRenderSelectedPyoungList,
    pyoungInput,
    pyounInputLabel,
    selectedInputedPyoungList,
    handleChangePyoungInputValue,
    handleResetInputValue,
    handleClickAddPyoung,
    handleClickDeleteAddedPyoung,
  } = useChangePyoungInput();

  return (
    <>
      <Line initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} />

      <PyoungInputField
        isRender={isRenderPyoungInputField}
        value={pyoungInput}
        label={pyounInputLabel}
        handleChange={handleChangePyoungInputValue}
        handleClickAdd={handleClickAddPyoung}
        handleReset={handleResetInputValue}
      />

      <RegionSelectedPyoungListField
        isRender={isRenderSelectedPyoungList}
        list={selectedInputedPyoungList}
        handleClick={handleClickDeleteAddedPyoung}
      />
    </>
  );
}
