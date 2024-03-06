import tw, { styled } from 'twin.macro';

import { motion } from 'framer-motion';

const Detail = styled(motion.div)`
  ${tw`flex flex-col gap-8 p-6 mt-5 bg-gray-100 ml-9 rounded-2xl`}
`;

export default Detail;
