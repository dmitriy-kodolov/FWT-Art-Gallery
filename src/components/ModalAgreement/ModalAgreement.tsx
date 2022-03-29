import React, { FC } from 'react';
import Button from '../Button';
import style from './style.module.scss';

type ModalAgreementProps = {
  deleteHandler?: () => void,
  closeModalHandler: () => void
};

const ModalAgreement: FC<ModalAgreementProps> = (
  { children, deleteHandler, closeModalHandler },
) => (
  <div className={style.modal}>
    <div className={style.modalAgreement}>
      <span className={style.modalAgreement__text}>
        Do you want to delete this
        {' '}
        {children}
      </span>
      <div className={style.modalAgreement__btns}>
        <Button
          isFilled
          className={style.modalAgreement__cancelBtn}
          onClick={closeModalHandler}
        >
          CANCEL
        </Button>
        <Button
          isFilled
          isDarkTheme
          className={style.modalAgreement__deleteBtn}
          onClick={deleteHandler}
        >
          DELETE
        </Button>
      </div>

    </div>
  </div>
);

export default ModalAgreement;
