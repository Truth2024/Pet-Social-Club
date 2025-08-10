import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
//SCHEME/CONST/TYPES
import { registerSchema, type RegisterSchemaType } from '../../../validation';
import { register as regInputs } from '../../../constants/auth';
//UI/COMPONENTS
import { Input } from '../../../ui/Input';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db, doc, serverTimestamp, setDoc } from '../../../firebase/firebaseConfig';
import React from 'react';
import { FirebaseError } from 'firebase/app';
import { useAppDispatch } from '../../../hooks/redux';
import { setOpen } from '../../../features/Auth';

export const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<RegisterSchemaType>({
    resolver: zodResolver(registerSchema),
  });
  const dispatch = useAppDispatch();
  const [serverError, setServerError] = React.useState<string | null>(null);
  const onSubmit = async (data: RegisterSchemaType) => {
    try {
      setServerError(null);
      const { email, password, name } = data;

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential?.user;

      if (user) {
        await setDoc(doc(db, 'users', user.uid), {
          name,
          uid: user.uid,
          email: user.email,
          photoURL: '',
          createdAt: serverTimestamp(),
        });

        reset();
        dispatch(setOpen(false));
      }
    } catch (error) {
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case 'auth/email-already-in-use':
            setServerError('Этот email уже используется');
            break;
          case 'auth/weak-password':
            setServerError('Пароль слишком слабый');
            break;
          case 'auth/invalid-email':
            setServerError('Неверный формат email');
            break;
          default:
            setServerError('Произошла ошибка при регистрации');
            console.error('Ошибка регистрации:', error);
        }
      } else {
        setServerError('Неизвестная ошибка');
        console.error('Неизвестная ошибка:', error);
      }
    }
  };
  return (
    <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-center font-black text-2xl mb-[40px]">Sign up</h2>
      <ul className="space-y-[15px] mb-[30px]">
        {regInputs.map((input) => (
          <div key={input.name}>
            <Input
              className={errors[input.name as keyof RegisterSchemaType] ? 'border-red-400' : ''}
              {...input}
              {...register(input.name as keyof RegisterSchemaType)}
            />
            {errors && (
              <span className="text-sm text-red-400">{errors[input.name as keyof RegisterSchemaType]?.message}</span>
            )}
          </div>
        ))}
      </ul>
      <div className="mb-[25px]">
        <button
          disabled={false}
          type="submit"
          className="h-[56px] w-[340px] rounded-[28px] flex items-center justify-center text-lg font-bold border border-gray-300 hover mb-[10px]"
        >
          {isSubmitting ? 'Loading...' : 'Continue'}
        </button>
        {serverError && <div className="text-center flex justify-center text-red-400">{serverError}</div>}
      </div>
    </form>
  );
};
