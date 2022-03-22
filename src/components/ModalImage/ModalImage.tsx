import React, {
  FC, useEffect, useRef, useState,
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
  submitHandler?: (data?: ControlSchema, acceptedFiles?: File) => void,
  isArtistEdit?: boolean
  paintingName?: string,
  created?: string,
  paintingSrc?: string,
  setIsOpenPaintingLoader: (flag: boolean) => void
};

const cx = cn.bind(style);

const schema = yup.object({
  name: yup.string().min(3, 'Больше 3-еx символов').required('Поле обязательно'),
  yearOfCreation: yup.string().required('Поле обязательно'),
}).required();

const baseUrl = process.env.REACT_APP_BASE_URL_DEV;
const ModalImage: FC<ModalImageProps> = ({
  setIsOpenPaintingLoader, paintingName, created, isArtistEdit, submitHandler,
  paintingSrc,
}) => {
  const ref = useRef <HTMLDivElement>(null) as React.MutableRefObject<HTMLInputElement>;
  const [myError, setMyError] = useState(true);

  useOutsideClick(ref, () => setIsOpenPaintingLoader(false));

  const keyHandler = (e: { key: string; }) => ((e.key === 'Escape') ? setIsOpenPaintingLoader(false) : null);

  const {
    register, handleSubmit, control, formState: { isValid, errors },
  } = useForm<ControlSchema>({
    defaultValues: {
      name: paintingName || '',
      yearOfCreation: created || '',
    },
    mode: 'all',
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

  const onSubmit: SubmitHandler<ControlSchema> = (data) => submitHandler!(data, acceptedFiles[0]);

  const dropZoneClassName = cx(
    'addPainting__dropZone',
    { addPainting__dropZone_addRedBorder: isDragReject },
    { addPainting__dropZone_addWhiteBorder: isDragAccept },
  );
  const infoMessageClassName = cx('addPainting__infoMessage', { addPainting__infoMessage_addRedColor: isDragReject });

  useEffect(() => {
    document.addEventListener('keydown', keyHandler);

    return () => {
      document.removeEventListener('keydown', keyHandler);
    };
  }, []);

  useEffect(() => {
    if (isArtistEdit) {
      if (acceptedFiles.length) return setMyError(false);

      return setMyError(true);
    }
    if (isValid && (!!acceptedFiles.length || paintingSrc)) return setMyError(false);

    return setMyError(true);
  }, [isValid, acceptedFiles]);

  return (
    <form className={style.modal} onSubmit={handleSubmit(onSubmit)}>
      <div className={style.addPainting} ref={ref}>
        <div className={style.addPainting__header}>
          <ImageLogo />
          <Button
            onClick={(e) => {
              e.stopPropagation();
              setIsOpenPaintingLoader(false);
            }}
            className={style.addPainting__closeBtn}
          >
            <Exit />
          </Button>
          <span>Image</span>
        </div>
        {!isArtistEdit
        && (
        <div className={style.addPainting__descriptionPainting}>
          <Input
            myPlaceholder="The name of the picture"
            className={style.addPainting__inputPlaceholder}
            {...register('name')}
            placeholder="Enter a name"
            isDarkTheme
            control={control}
            value=""
            name="name"
            errorMessage={errors.name?.message || false}
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
            errorMessage={errors.yearOfCreation?.message || false}
          />
        </div>
        )}
        <div {...getRootProps({ className: dropZoneClassName })}>
          {paintingSrc && <img src={`${baseUrl!}${paintingSrc}`} alt="" className={style.addPainting__painting} />}
          {acceptedFiles[0] && <img src={URL.createObjectURL(acceptedFiles[0])} alt="" className={style.addPainting__painting} />}
          {!acceptedFiles[0] && !paintingSrc && (
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
            type="submit"
            disabled={myError}
            onClick={() => (!isArtistEdit
              ? handleSubmit(onSubmit)
              : submitHandler!({} as ControlSchema, acceptedFiles[0]))}
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
