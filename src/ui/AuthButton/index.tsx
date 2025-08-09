import React from 'react';
import { setOpen } from '../../features/Auth';
import { useAppDispatch } from '../../hooks/redux';
import styles from '../../constants/nav/nav.module.scss';
import { useAuth } from '../../components/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase/firebaseConfig';

export const AuthButton = () => {
  const { user } = useAuth();
  const dispatch = useAppDispatch();
  const [isLoading, setLoading] = React.useState(false);

  const handleClick = async () => {
    if (!user) {
      dispatch(setOpen(true));
    } else {
      try {
        setLoading(true);
        await signOut(auth);
      } catch (error) {
        console.error('Ошибка выхода:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer h-[50px] flex items-center gap-[16px] p-[20px] rounded-full transition-colors hover:bg-gray-200 w-fit"
    >
      <svg className={styles.svg} height={25} width={25} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
        <g>
          <path
            fill="currentColor"
            d="M155.81,0v173.889h33.417V33.417h235.592l-74.87,50.656c-8.469,5.727-13.535,15.289-13.535,25.503v286.24
H189.227V282.079H155.81v147.154h180.604v70.93c0,4.382,2.423,8.404,6.29,10.451c3.867,2.056,8.558,1.811,12.189-0.644
l119.318-80.736V0H155.81z"
          />
          <path
            d="M228.657,290.4c0,1.844,1.068,3.524,2.75,4.3c1.664,0.775,3.638,0.514,5.042-0.685l78.044-66.035
l-78.044-66.034c-1.404-1.2-3.378-1.46-5.042-0.686c-1.681,0.775-2.75,2.456-2.75,4.3v33.392H37.79v58.064h190.868V290.4z"
          />
        </g>
      </svg>
      <span className="hidden 2xl:text-2xl xl:text-xl lg-text-xl md:block text-gray-400">
        {isLoading ? 'loading' : user ? 'Log out' : 'Log in'}
      </span>
    </div>
  );
};
