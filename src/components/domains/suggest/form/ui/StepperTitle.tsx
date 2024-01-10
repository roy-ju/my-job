import { memo } from 'react';

import Image from 'next/image';

import { motion } from 'framer-motion';

import { v1 } from 'uuid';

import Clapping from '@/../public/static/images/suggests/Clapping Hands Light Skin Tone.png';

import { AnimationP } from './AnimationText';

type StepperTitleProps = { title: string; subTitle: string; isIcon?: boolean };

function StepperTitle({ title, subTitle, isIcon }: StepperTitleProps) {
  return (
    <>
      {isIcon ? (
        <div tw="flex items-center justify-center gap-1">
          <AnimationP key={v1()} tw="text-heading_01 text-gray-900 text-center">
            {title}
          </AnimationP>
          <motion.div
            tw="flex"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Image src={Clapping} width={20} height={20} alt="clapping" />
            <Image src={Clapping} width={20} height={20} alt="clapping" />
            <Image src={Clapping} width={20} height={20} alt="clapping" />
          </motion.div>
        </div>
      ) : (
        <AnimationP key={v1()} tw="text-heading_01 text-gray-900 text-center">
          {title}
        </AnimationP>
      )}
      <AnimationP
        key={v1()}
        transition={{ duration: 0.4 }}
        tw="text-body_02 text-gray-700 text-center mt-1 whitespace-pre-line"
      >
        {subTitle}
      </AnimationP>
    </>
  );
}

export default memo(StepperTitle);
