import tw, { styled } from 'twin.macro';

import { motion } from 'framer-motion';

const AdditionalConditionWrraper = styled(motion.div)`
  ${tw`text-body_01 [border-radius: 100px] border [border-color: #646464] [height: 26px] [padding-inline: 7px] flex items-center justify-center`}
`;

export default AdditionalConditionWrraper;
