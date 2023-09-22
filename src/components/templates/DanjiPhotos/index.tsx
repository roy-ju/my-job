/* eslint-disable @next/next/no-img-element */
import { GetDanjiPhotosResponse } from '@/apis/danji/danjiPhotos';
import { NavigationHeader } from '@/components/molecules';
import React, { useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import OutsideClick from '@/components/atoms/OutsideClick';
import CloseIcon from '@/assets/icons/close_24.svg';
import { Button } from '@/components/atoms';
import MapLayout from '../MapLayout';

const Popup = ({
  danjiName,
  filePath,
  handleClose,
}: {
  danjiName?: string;
  filePath: string;
  handleClose: () => void;
}) => (
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

export default function DanjiPhotos({
  danjiName,
  danjiPhotos,
  onClickBack,
}: {
  danjiName?: string;
  danjiPhotos?: GetDanjiPhotosResponse;
  onClickBack?: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [filePath, setFilePath] = useState('');
  return (
    <div tw="relative h-full flex flex-col">
      <NavigationHeader>
        {onClickBack && <NavigationHeader.BackButton onClick={onClickBack} />}
        <NavigationHeader.Title>
          단지 사진ff <span tw="text-nego-1000 font-bold">{danjiPhotos?.danji_photos?.length || 0}</span>
        </NavigationHeader.Title>
      </NavigationHeader>
      <div tw="overflow-auto pb-5">
        {danjiPhotos?.danji_photos &&
          danjiPhotos.danji_photos.length > 0 &&
          danjiPhotos.danji_photos.map((item) => (
            <Image
              onClick={() => {
                setOpen(true);
                setFilePath(item.full_file_path);
              }}
              key={item.id}
              width={380}
              height={256}
              alt=""
              src={item.full_file_path}
              style={{ width: '380px', height: '256px' }}
            />
          ))}
      </div>
      {open && (
        <Popup
          danjiName={danjiName}
          filePath={filePath}
          handleClose={() => {
            setOpen(false);
          }}
        />
      )}
    </div>
  );
}
