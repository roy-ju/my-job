import { styled } from 'twin.macro';

import { motion } from 'framer-motion';

const ImageContainer = styled(motion.div)`
  width: 20px;
  height: 20px;
`;

ImageContainer.defaultProps = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
};

export default ImageContainer;
