import { memo } from 'react';

import { motion } from 'framer-motion';

import { Label, Checkbox } from '@/components/atoms';

type NegotiableFieldProps = {
  isRender: boolean;
  negotiable: boolean;
  handleChange: (e?: NegocioChangeEvent<HTMLInputElement>) => void;
};

function NegotiableField({ isRender, negotiable, handleChange }: NegotiableFieldProps) {
  console.log('render NegotiableField');
  if (!isRender) return null;

  return (
    <div id="negotiable_field" tw="mt-3 ml-auto">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        whileHover={{ scale: 1.04 }}
      >
        <Label
          checked={negotiable}
          onChange={handleChange}
          label="금액 협의 가능해요."
          control={<Checkbox name="negotiable" iconType="circle" />}
        />
      </motion.div>
    </div>
  );
}

export default memo(NegotiableField);
