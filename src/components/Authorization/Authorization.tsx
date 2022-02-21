import React, {
  FC, useEffect, useRef,
} from 'react';
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

type AuthorizationProp = {
  setIsOpenAuth: (flag: boolean) => void,
};

const Authorization: FC<AuthorizationProp> = ({ setIsOpenAuth }) => {
  const modalClassName = cx('modal');
  const ref = useRef <HTMLDivElement>(null) as React.MutableRefObject<HTMLInputElement>;

  const keyHandler = (e: { key: string; }) => {
    if (e.key === 'Escape') {
      setIsOpenAuth(false);
    }
  };

  useOutsideClick(ref, () => setIsOpenAuth(false));

  useEffect(() => {
    document.addEventListener('keydown', keyHandler, false);
    return () => {
      document.removeEventListener('keydown', keyHandler, false);
    };
  }, []);

  return (
    <form className={modalClassName}>
      <div className={style.authorization} ref={ref}>
        <Button
          onClick={() => setIsOpenAuth(false)}
          className={style.authorization__closeBtn}
        >
          <Exit />
        </Button>
        <span className={style.authorization__nameModal}>AUTHORIZATION</span>
        <Input type="email" placeholder="Email" className={style.authorization__input}>
          <UserLogo />
        </Input>
        <Input type="password" placeholder="Password" className={style.authorization__input}>
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
    </form>
  );
};

export default Authorization;
