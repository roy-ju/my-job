import { motion } from 'framer-motion';

import tw, { styled } from 'twin.macro';

import PyoungInputField from './PyoungInputField';

import useChangePyoungInput from '../hooks/useChangePyoungInput';

import SelectedPyoungListField from './SelectedPyoungListField';

const Line = styled(motion.div)`
  ${tw`bg-gray-200 w-full [height: 1px] my-6`}
`;

export default function PyoungInputWrraper() {
  const {
    isRenderAccordion,
    isRenderPyoungInputField,
    isRenderSelectedPyoungList,
    pyoungInput,
    pyoungInputLabel,
    pyoungInputOpen,
    selectedInputedPyoungList,
    errorMessagePyoungInput,
    disableAddButton,
    handleOpenAccordion,
    handleCloseAccordion,
    handleChangePyoungInputValue,
    handleClickAddPyoung,
    handleResetInputValue,
    handleClickDeleteAddedPyoung,
  } = useChangePyoungInput();

  return (
    <>
      <Line
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        css={[!isRenderAccordion && tw`hidden`]}
      />

      <PyoungInputField
        isRenderAccordion={isRenderAccordion}
        isRender={isRenderPyoungInputField}
        value={pyoungInput}
        label={pyoungInputLabel}
        open={pyoungInputOpen}
        disabled={disableAddButton}
        errorMessage={errorMessagePyoungInput}
        handleOpen={handleOpenAccordion}
        handleClose={handleCloseAccordion}
        handleChange={handleChangePyoungInputValue}
        handleClickAdd={handleClickAddPyoung}
        handleReset={handleResetInputValue}
      />

      <SelectedPyoungListField
        isRender={isRenderSelectedPyoungList}
        list={selectedInputedPyoungList}
        handleClick={handleClickDeleteAddedPyoung}
      />
    </>
  );
}
