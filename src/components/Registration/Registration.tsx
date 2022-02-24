import React, { FC, useEffect, useRef } from 'react';
import cn from 'classnames/bind';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import style from './style.module.scss';
import Input from '../Input';
import Button from '../Button';
import MyLink from '../MyLink/MyLink';
import { ReactComponent as UserLogo } from '../../assets/userLogo.svg';
import { ReactComponent as LockLogo } from '../../assets/lockLogo.svg';
import { ReactComponent as Exit } from '../../assets/smallCloseBtn.svg';
import useOutsideClick from '../../hooks/useOutsideClick';
import { ControlSchema } from '../../types/types';
import { fetchRegistration } from '../../store/slices/registrationSlice';
import { useAppDispatch } from '../../hooks/redux';

const cx = cn.bind(style);

type RegistrationProp = {
  setIsOpenRegistration: (flag: boolean) => void,
  changeIsAuthorization: (flag: boolean) => void,
  setIsOpenAuth: (flag: boolean) => void,
};

const schema = yup.object({
  login: yup.string().email().required('Enter your email address')
    .max(50, 'Please make sure that youve entered your login and password correctly'),
  password: yup.string().required('Enter your password')
    .min(8, 'Please make sure that youve entered your login and password correctly')
    .matches(/[a-zA-Z0-9]/, 'Please make sure that youve entered your login and password correctly'),
  confirmPassword: yup.string().required('Enter your password')
    .min(8, 'Please make sure that youve entered your login and password correctly')
    .matches(/[a-zA-Z0-9]/, 'Please make sure that youve entered your login and password correctly'),
}).required();

const Registration: FC<RegistrationProp> = ({
  changeIsAuthorization, setIsOpenAuth,
  setIsOpenRegistration,
}) => {
  const dispatch = useAppDispatch();
  const {
    register, handleSubmit, control, setError, setValue, formState: { errors },
  } = useForm<ControlSchema>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<ControlSchema> = async (data) => {
    if (data.confirmPassword !== data.password) {
      setError('password', { type: 'matches', message: 'Password dont match' });
      setValue('password', '');
      return setValue('confirmPassword', '');
    }
    delete data.confirmPassword;
    await dispatch(fetchRegistration(data));
    setIsOpenRegistration(false);
    changeIsAuthorization(true);
    return console.log(data);
  };

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

  const modalClassName = cx('modal');

  return (
    <form className={modalClassName} onSubmit={handleSubmit(onSubmit)}>
      <div className={style.registration} ref={ref}>
        <Button
          onClick={() => setIsOpenRegistration(false)}
          className={style.registration__closeBtn}
        >
          <Exit />
        </Button>
        <span className={style.registration__nameModal}>СREATE YOUR PROFILE</span>
        <Input
          control={control}
          {...register('login')}
          type="email"
          name="login"
          placeholder="Email"
          className={style.registration__input}
          errorMessage={errors.login?.message || false}
        >
          <UserLogo />
        </Input>
        <Input
          control={control}
          {...register('password')}
          name="password"
          type="password"
          placeholder="Password"
          className={style.registration__input}
          errorMessage={errors.password?.message || false}
        >
          <LockLogo />
        </Input>
        <Input
          control={control}
          {...register('confirmPassword')}
          type="password"
          name="confirmPassword"
          placeholder="Confirm password"
          className={style.registration__input}
          errorMessage={errors.confirmPassword?.message || false}
        >
          <LockLogo />
        </Input>
        <Button
          onClick={handleSubmit(onSubmit)}
          className={style.registration__logInBtn}
          isFilled
          type="submit"
        >
          REGISTRATION
        </Button>
        <span className={style.registration__link}>
          if you already have an account,
          {' '}
          <MyLink onClick={() => {
            setIsOpenRegistration(false);
            setIsOpenAuth(true);
          }}
          >
            please log in
          </MyLink>
        </span>
      </div>
    </form>
  );
};

export default Registration;
