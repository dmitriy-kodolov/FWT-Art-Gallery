/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FC, ReactNode, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import style from './style.module.scss';
import { ReactComponent as Exit } from '../../assets/smallCloseBtn.svg';
import { ReactComponent as ImageLogo } from '../../assets/imageLogo.svg';
import Button from '../Button';

type ModalImageProps = {
  children?: ReactNode
};

const ModalImage: FC<ModalImageProps> = ({ children }) => {
  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className={style.modal}>
      <div className={style.addPainting}>
        <div className={style.addPainting__header}>
          <ImageLogo />
          <Exit />
          <span>Image</span>
        </div>
        {children}
        <div>

          {/* <div className={style.addPainting__footer}> */}
          {/* <span> .jpg .png</span> */}
          {/* <Button className={style.addPainting__acceptBtn} /> */}
          {/* </div> */}
        </div>
      </div>
    </div>
  );
};

export default ModalImage;
