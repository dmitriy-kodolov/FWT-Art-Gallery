import React, {
  FC, ReactNode, useEffect, useRef,
} from 'react';
import { useDropzone } from 'react-dropzone';
import cn from 'classnames/bind';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import style from './style.module.scss';
import { ReactComponent as Exit } from '../../assets/smallCloseBtn.svg';
import { ReactComponent as ImageLogo } from '../../assets/imageLogo.svg';
import { ReactComponent as DropIcon } from '../../assets/UploadIcon.svg';
import Button from '../Button';
import Input from '../Input';
import { ControlSchema } from '../../types/types';
import useOutsideClick from '../../hooks/useOutsideClick';

type ModalImageProps = {
  children?: ReactNode,
  setIsOpenPaintingLoader: (flag: boolean) => void
};

const cx = cn.bind(style);

const schema = yup.object({
  paintingName: yup.string().required(),
  yearOfCreation: yup.number().required(),
}).required();

const ModalImage: FC<ModalImageProps> = ({ setIsOpenPaintingLoader }) => {
  const ref = useRef <HTMLDivElement>(null) as React.MutableRefObject<HTMLInputElement>;

  useOutsideClick(ref, () => setIsOpenPaintingLoader(false));

  const keyHandler = (e: { key: string; }) => {
    if (e.key === 'Escape') {
      setIsOpenPaintingLoader(false);
    }
  };

  const {
    register, handleSubmit, control,
  } = useForm<ControlSchema>({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  const {
    open,
    getRootProps,
    getInputProps,
    isDragAccept,
    isDragReject,
    acceptedFiles,
  } = useDropzone({
    maxFiles: 1, maxSize: 3145728, noClick: true, accept: 'image/png, image/jpg',
  });

  const onSubmit: SubmitHandler<ControlSchema> = async (data) => {
    if (acceptedFiles[0]) console.log(data, URL.createObjectURL(acceptedFiles[0]));
  };

  const dropZoneClassName = cx(
    'addPainting__dropZone',
    { addPainting__dropZone_addRedBorder: isDragReject },
    { addPainting__dropZone_addWhiteBorder: isDragAccept },
  );
  const infoMessageClassName = cx('addPainting__infoMessage', { addPainting__infoMessage_addRedColor: isDragReject });

  useEffect(() => {
    document.addEventListener('keydown', keyHandler, false);

    return () => {
      document.removeEventListener('keydown', keyHandler, false);
    };
  }, []);

  return (
    <form className={style.modal} onSubmit={handleSubmit(onSubmit)}>
      <div className={style.addPainting} ref={ref}>
        <div className={style.addPainting__header}>
          <ImageLogo />
          <Button
            onClick={() => setIsOpenPaintingLoader(false)}
            className={style.addPainting__closeBtn}
          >
            <Exit />
          </Button>
          <span>Image</span>
        </div>
        {/* TODO снизу это будет children либо по условию отображаться */}
        <div className={style.addPainting__descriptionPainting}>
          <Input
            myPlaceholder="The name of the picture"
            className={style.addPainting__inputPlaceholder}
            {...register('paintingName')}
            placeholder="Enter a name"
            isDarkTheme
            control={control}
            name="paintingName"
          />
          <Input
            myPlaceholder="Year of creation"
            className={style.addPainting__inputPlaceholder}
            {...register('yearOfCreation')}
            placeholder="Enter the year"
            isDarkTheme
            control={control}
            type="number"
            name="yearOfCreation"
          />
        </div>
        <div {...getRootProps({ className: dropZoneClassName })}>
          {acceptedFiles[0] && <img src={URL.createObjectURL(acceptedFiles[0])} alt="" className={style.addPainting__painting} />}
          {!acceptedFiles[0] && (
          <div className={style.addPainting__dropZoneInfo}>
            <DropIcon />
            <span>Drag and Drop file here</span>
            <Button onClick={open} className={style.addPainting__acceptBtn}>select file</Button>
            <span className={infoMessageClassName}>Image weight must be less than 3 MB</span>
          </div>
          )}
          <input type="file" {...getInputProps()} />
        </div>
        <div className={style.addPainting__footer}>
          <span>.jpg .png</span>
          <Button
            disabled
            onClick={handleSubmit(onSubmit)}
            className={style.addPainting__acceptBtn}
          >
            save
          </Button>
        </div>
      </div>
    </form>
  );
};

export default ModalImage;
