import React, {
  FC, useEffect, useRef,
} from 'react';
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
import { changeIsAuth, changeIsOpenModalAuth, fetchAuthorization } from '../../store/slices/authorizationSlice';
import { useAppDispatch } from '../../hooks/redux';
import { changeRegistration } from '../../store/slices/registrationSlice';

const cx = cn.bind(style);

const schema = yup.object({
  email: yup.string().email().required('Enter your email address')
    .max(50, 'Please make sure that youve entered your login and password correctly'),
  password: yup.string().required('Enter your password')
    .min(8, 'Password must be more than 8 symbols and have at least one number, one capital letter and one special symbol')
    .matches(/[a-zA-Z0-9]/, 'Password must be more than 8 symbols and have at least one number, one capital letter and one special symbol'),
}).required();

const Authorization: FC = () => {
  const dispatch = useAppDispatch();
  const {
    register, handleSubmit, control, formState: { errors },
  } = useForm<ControlSchema>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<ControlSchema> = async (data) => {
    await dispatch(fetchAuthorization(data));
    console.log(data);
    dispatch(changeIsOpenModalAuth(false));
    dispatch(changeIsAuth(true));
  };

  const keyHandler = (e: { key: string; }) => {
    if (e.key === 'Escape') {
      dispatch(changeIsOpenModalAuth(false));
    }
  };

  const ref = useRef <HTMLDivElement>(null) as React.MutableRefObject<HTMLInputElement>;

  useOutsideClick(ref, () => dispatch(changeIsOpenModalAuth(false)));

  useEffect(() => {
    document.addEventListener('keydown', keyHandler, false);
    return () => {
      document.removeEventListener('keydown', keyHandler, false);
    };
  }, []);

  const modalClassName = cx('modal');

  return (
    <form className={modalClassName} onSubmit={handleSubmit(onSubmit)}>
      <div className={style.authorization} ref={ref}>
        <Button
          onClick={() => dispatch(changeIsOpenModalAuth(false))}
          className={style.authorization__closeBtn}
        >
          <Exit />
        </Button>
        <span className={style.authorization__nameModal}>AUTHORIZATION</span>
        <Input
          control={control}
          {...register('email')}
          type="email"
          placeholder="Email"
          name="email"
          className={style.authorization__input}
          errorMessage={errors.email?.message || false}
        >
          <UserLogo />
        </Input>
        <Input
          control={control}
          {...register('password')}
          type="password"
          placeholder="Password"
          name="password"
          className={style.authorization__input}
          errorMessage={errors.password?.message || false}
        >
          <LockLogo />
        </Input>
        <Button
          onClick={handleSubmit(onSubmit)}
          className={style.authorization__logInBtn}
          isFilled
          type="submit"
        >
          LOG IN
        </Button>
        <span className={style.authorization__link}>
          if you dont have an account yet,
          {' '}
          <MyLink onClick={() => {
            dispatch(changeIsOpenModalAuth(false));
            dispatch(changeRegistration(true));
          }}
          >
            please sing up
          </MyLink>
        </span>
      </div>
    </form>
  );
};

export default Authorization;
