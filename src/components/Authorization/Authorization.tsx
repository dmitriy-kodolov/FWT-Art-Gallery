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

const Authorization = () => {
  const modalClassName = cx('modal');
  return (
    <div className={modalClassName}>
      <div className={style.authorization}>
        <Button
          className={style.authorization__closeBtn}
        >
          <Exit />
        </Button>
        <span className={style.authorization__nameModal}>AUTHORIZATION</span>
        <Input type="email" placeholder="Email" className={style.authorization__input}>
          <UserLogo />
        </Input>
        <Input type="text" placeholder="Password" className={style.authorization__input}>
          <LockLogo />
        </Input>
        <Button
          className={style.authorization__logInBtn}
          isFilled
        >
          LOG IN
        </Button>
        <span className={style.authorization__link}>
          if you dont have an account yet,
          {' '}
          <MyLink url="dsa">please sing up</MyLink>
        </span>

      </div>
    </div>
  );
};

export default Authorization;
