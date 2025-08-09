import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, type LoginSchemaType } from '../../../validation';
import { Input } from '../../../ui/Input';
import { login as loginInputs } from '../../../constants/auth';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../firebase/firebaseConfig';
import { useState } from 'react';
import { FirebaseError } from 'firebase/app';
import { useAuth } from '../../../components/AuthContext';
import { getFirebaseErrorMessage } from '../../../utils/getFirebaseErrorMessage';
import { setOpen } from '../../../features/Auth';
import { useAppDispatch } from '../../../hooks/redux';

export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
  });
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [firebaseError, setFirebaseError] = useState<string | null>(null);
  const { loading: authLoading } = useAuth();

  const onSubmit = async (data: LoginSchemaType) => {
    const { email, password } = data;
    setLoading(true);
    setFirebaseError(null);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      dispatch(setOpen(false));
    } catch (err) {
      console.log(err);
      const error = err as FirebaseError;
      setFirebaseError(getFirebaseErrorMessage(error.code));
    } finally {
      setLoading(false);
    }
  };

  const isSubmitting = loading || authLoading;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
      <h2 className="text-center font-black text-2xl mb-[40px]">Sign in</h2>

      <ul className="space-y-[15px] mb-[30px]">
        {loginInputs.map((input) => (
          <div key={input.name}>
            <Input className={errors[input.name] ? 'border-red-400' : ''} {...input} {...register(input.name)} />
            {errors[input.name] && <span className="text-sm text-red-400">{errors[input.name]?.message}</span>}
          </div>
        ))}
      </ul>

      {firebaseError && <div className="mb-4 text-center text-red-500 text-sm">{firebaseError}</div>}

      <div className="relative mb-[25px]">
        <button
          disabled={isSubmitting}
          type="submit"
          className={`h-[56px] w-[340px] rounded-[28px] flex items-center justify-center text-lg font-bold border border-gray-300 transition-colors
            ${isSubmitting ? 'bg-gray-100 cursor-not-allowed' : 'hover:bg-gray-100 hover:border-gray-400'}
          `}
        >
          {isSubmitting ? 'Loading...' : 'Continue'}
        </button>
      </div>
    </form>
  );
};
