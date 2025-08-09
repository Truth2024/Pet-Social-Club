import type { UserType } from '../../types/Auth/user';
import { Avatar } from '../../ui/Avatar';
import { useNavigate } from 'react-router-dom';
import { formatRegistrationDate } from '../../utils/formatRegistrationDate';
import { useAuth } from '../AuthContext';
import { Spinner } from '../../ui/Spiner';
import { setOpen } from '../../features/Auth';
import { useAppDispatch } from '../../hooks/redux';
import type { DocumentData } from 'firebase/firestore';

interface TimestampLike {
  seconds: number;
  nanoseconds: number;
}

interface UserAboutProps {
  userInfo: DocumentData | (UserType & { createdAt?: string | TimestampLike | null });
}

export const UserAbout = ({ userInfo }: UserAboutProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user, loading } = useAuth();
  const registeredAgo = formatRegistrationDate(userInfo.createdAt);
  const handleSend = () => {
    if (!user) {
      dispatch(setOpen(true));
    }
    navigate(`/messages?uid=${userInfo.uid}`);
  };
  if (loading) return <Spinner />;

  return (
    <div className="flex flex-col items-center gap-2 border-t border-b border-gray-200 p-[16px] relative">
      <div className="flex flex-col items-center">
        <Avatar name={userInfo.name} photoURL={userInfo.photoURL} size="w-[60px] h-[60px] rounded-[39px]" />
        <span className="text-gray-500 text-[13px] absolute right-2 top-4">Зарегистрирован {registeredAgo}</span>
        <span>{userInfo.name}</span>
      </div>
      <div className="w-full flex justify-end">
        <div
          onClick={handleSend}
          className="w-[40px] h-[40px] hover border border-gray-300 rounded-[25px] flex justify-center items-center text-gray-600"
        >
          <svg width={20} height={20} viewBox="0 0 24 24" aria-hidden="true">
            <g>
              <path
                fill="currentColor"
                d="M1.998 5.5c0-1.381 1.119-2.5 2.5-2.5h15c1.381 0 2.5 1.119 2.5 2.5v13c0 1.381-1.119 2.5-2.5 2.5h-15c-1.381 0-2.5-1.119-2.5-2.5v-13zm2.5-.5c-.276 0-.5.224-.5.5v2.764l8 3.638 8-3.636V5.5c0-.276-.224-.5-.5-.5h-15zm15.5 5.463l-8 3.636-8-3.638V18.5c0 .276.224.5.5.5h15c.276 0 .5-.224.5-.5v-8.037z"
              ></path>
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
};
