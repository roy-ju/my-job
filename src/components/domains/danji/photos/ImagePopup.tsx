import { AnimatePresence, motion } from 'framer-motion';

import { Button } from '@/components/atoms';

import OutsideClick from '@/components/atoms/OutsideClick';

import MapLayout from '@/components/templates/MapLayout';

import CloseIcon from '@/assets/icons/close_24.svg';

export default function ImagePopup({
  danjiName,
  filePath,
  handleClose,
}: {
  danjiName?: string;
  filePath: string;
  handleClose: () => void;
}) {
  return (
    <AnimatePresence>
      <MapLayout.Overlay tw="flex items-center justify-center">
        <OutsideClick onOutsideClick={handleClose}>
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
          >
            <div tw="w-[780px] max-h-[56px] h-[56px] bg-white rounded-lg [border-bottom-left-radius: 0] [border-bottom-right-radius: 0] relative overflow-hidden py-4 px-5 flex content-between justify-between">
              <p tw="text-b1 font-bold">{danjiName}</p>
              <Button variant="ghost" tw="p-0 h-6" onClick={handleClose}>
                <CloseIcon />
              </Button>
            </div>
            <div
              tw="w-[780px] max-h-[960px] h-[0] bg-white rounded-lg [border-top-left-radius: 0] [border-top-right-radius: 0] relative overflow-hidden [padding-top: 66.64%]"
              style={{
                backgroundImage: `url('${filePath}')`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'contain',
                backgroundPosition: 'center',
              }}
            />
          </motion.div>
        </OutsideClick>
      </MapLayout.Overlay>
    </AnimatePresence>
  );
}
