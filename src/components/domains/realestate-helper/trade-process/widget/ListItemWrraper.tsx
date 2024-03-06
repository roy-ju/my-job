import tw, { styled } from 'twin.macro';

import { motion } from 'framer-motion';

const ListItemWrraper = styled(motion.div)`
  ${tw`relative pb-10`}

  p {
    ${tw`whitespace-pre-line`}
  }
`;

export default ListItemWrraper;
