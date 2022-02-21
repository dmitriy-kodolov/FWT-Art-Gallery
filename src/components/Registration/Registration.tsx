import React from 'react';
import cn from 'classnames/bind';
import style from './style.module.scss';
import Input from '../Input';
import Button from '../Button';
import MyLink from '../MyLink/MyLink';
import { ReactComponent as UserLogo } from '../../assets/userLogo.svg';
import { ReactComponent as LockLogo } from '../../assets/lockLogo.svg';
import { ReactComponent as Exit } from '../../assets/smallCloseBtn.svg';

const cx = cn.bind(style);

const Registration = () => {
  const modalClassName = cx('modal');
  return (
    <div className={modalClassName}>
      <div className={style.registration}>
        <Button
          className={style.registration__closeBtn}
        >
          <Exit />
        </Button>
        <span className={style.registration__nameModal}>СREATE YOUR PROFILE</span>
        <Input type="email" placeholder="Email" className={style.registration__input}>
          <UserLogo />
        </Input>
        <Input type="text" placeholder="Password" className={style.registration__input}>
          <LockLogo />
        </Input>
        <Input type="text" placeholder="Confirm password" className={style.registration__input}>
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
    </div>
  );
};

export default Registration;
