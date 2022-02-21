import React, { FC, useEffect, useRef } from 'react';
import cn from 'classnames/bind';
import style from './style.module.scss';
import Input from '../Input';
import Button from '../Button';
import MyLink from '../MyLink/MyLink';
import { ReactComponent as UserLogo } from '../../assets/userLogo.svg';
import { ReactComponent as LockLogo } from '../../assets/lockLogo.svg';
import { ReactComponent as Exit } from '../../assets/smallCloseBtn.svg';
import useOutsideClick from '../../hooks/useOutsideClick';

const cx = cn.bind(style);

type RegistrationProp = {
  setIsOpenRegistration: (flag: boolean) => void,
};

const Registration: FC<RegistrationProp> = ({ setIsOpenRegistration }) => {
  const modalClassName = cx('modal');
  const ref = useRef <HTMLDivElement>(null) as React.MutableRefObject<HTMLInputElement>;
  useOutsideClick(ref, () => setIsOpenRegistration(false));

  const keyHandler = (e: { key: string; }) => {
    if (e.key === 'Escape') {
      setIsOpenRegistration(false);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', keyHandler, false);

    return () => {
      document.removeEventListener('keydown', keyHandler, false);
    };
  }, []);

  return (
    <form
      className={modalClassName}
    >
      <div className={style.registration} ref={ref}>
        <Button
          onClick={() => setIsOpenRegistration(false)}
          className={style.registration__closeBtn}
        >
          <Exit />
        </Button>
        <span className={style.registration__nameModal}>СREATE YOUR PROFILE</span>
        <Input type="email" placeholder="Email" className={style.registration__input}>
          <UserLogo />
        </Input>
        <Input type="password" placeholder="Password" className={style.registration__input}>
          <LockLogo />
        </Input>
        <Input type="password" placeholder="Confirm password" className={style.registration__input}>
          <LockLogo />
        </Input>
        <Button
          className={style.registration__logInBtn}
          isFilled
        >
          REGISTRATION
        </Button>
        <span className={style.registration__link}>
          if you already have an account,
          {' '}
          <MyLink url="dsa">please log in</MyLink>
        </span>
      </div>
    </form>
  );
};

export default Registration;
