import React from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import styles from './modal.module.scss';
//COMPONENTS
import { Login } from './Login';
import { Register } from './Register';
//FEATURES
import { setOpen, setMode } from '../../features/Auth';
import { useClickOutside } from '../../hooks/useClickOutside';

export const Authorization = () => {
  const dispatch = useAppDispatch();
  const { mode, isOpen } = useAppSelector((state) => state.authorization);

  const modalRef = React.useRef<HTMLDivElement>(null);
  useClickOutside(modalRef, () => {
    if (isOpen) dispatch(setOpen(false));
  });

  return (
    <div ref={modalRef} className={`${styles.modal} ${isOpen ? '' : styles.hidden} p-[40px] relative`}>
      <div
        onClick={() => dispatch(setOpen(false))}
        className="absolute hover right-4 top-4 rounded-[20px] h-[40px] w-[40px] flex items-center justify-center"
      >
        <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M10.5859 12.25L2.79297 4.45706L4.20718 3.04285L12.0001 10.8357L19.793 3.04285L21.2072 4.45706L13.4143 12.25L21.2072 20.0428L19.793 21.4571L12.0001 13.6642L4.20718 21.4571L2.79297 20.0428L10.5859 12.25Z"
            fill="black"
          />
        </svg>
      </div>
      {mode === 'login' && <Login />}
      {mode === 'reg' && <Register />}

      <span onClick={() => dispatch(setMode())} className={`${styles.changeMod}`}>
        {mode === 'login' ? `Don't have an account?` : 'Already have an account?'}
      </span>
    </div>
  );
};
