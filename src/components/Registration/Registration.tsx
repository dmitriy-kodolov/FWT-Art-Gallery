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
import { changeRegistration, fetchRegistration } from '../../store/slices/registrationSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { changeIsAuth, changeIsOpenModalAuth } from '../../store/slices/authorizationSlice';

const cx = cn.bind(style);

const schema = yup.object({
  username: yup.string().email().required('Enter your email address')
    .max(50, 'Please make sure that youve entered your login and password correctly'),
  password: yup.string().required('Enter your password')
    .min(8, 'Please make sure that youve entered your login and password correctly')
    .matches(/[a-zA-Z0-9]/, 'Please make sure that youve entered your login and password correctly'),
  confirmPassword: yup.string().required('Enter your password')
    .min(8, 'Please make sure that youve entered your login and password correctly')
    .matches(/[a-zA-Z0-9]/, 'Please make sure that youve entered your login and password correctly'),
}).required();

const Registration: FC = () => {
  const dispatch = useAppDispatch();
  const { registration: { errorRegistrat } } = useAppSelector((state) => state);
  const { auth: { errorAuth } } = useAppSelector((state) => state);
  const {
    register, handleSubmit, control, setError, setValue, formState: { errors },
  } = useForm<ControlSchema>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (!errorRegistrat && !errorAuth) {
      dispatch(changeRegistration(false));
      dispatch(changeIsAuth(true));
    }
  }, [errorRegistrat]);

  const onSubmit: SubmitHandler<ControlSchema> = async (data) => {
    if (data.confirmPassword !== data.password) {
      setError('password', { type: 'matches', message: 'Password dont match' });
      setValue('password', '');
      return setValue('confirmPassword', '');
    }
    delete data.confirmPassword;

    return dispatch(fetchRegistration(data));
  };

  const ref = useRef <HTMLDivElement>(null) as React.MutableRefObject<HTMLInputElement>;

  useOutsideClick(ref, () => dispatch(changeRegistration(false)));

  const keyHandler = (e: { key: string; }) => {
    if (e.key === 'Escape') {
      dispatch(changeRegistration(false));
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
          onClick={() => dispatch(changeRegistration((false)))}
          className={style.registration__closeBtn}
        >
          <Exit />
        </Button>
        <span className={style.registration__nameModal}>СREATE YOUR PROFILE</span>
        <Input
          control={control}
          {...register('username')}
          type="email"
          name="username"
          placeholder="Email"
          className={style.registration__input}
          errorMessage={errors.username?.message || false}
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
            dispatch(changeRegistration(false));
            dispatch(changeIsOpenModalAuth(true));
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
