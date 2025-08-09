import { useLocation, useNavigate } from 'react-router-dom';
import { Avatar } from '../../ui/Avatar';
import { useAppSelector } from '../../hooks/redux';
import { Spinner } from '../../ui/Spiner';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { db, doc } from '../../firebase/firebaseConfig';

type Chat = {
  lastMessage?: {
    id: string;
    text: string;
    from: string;
    createdAt: number;
  };
  user: string;
};
export const Messages = ({ lastMessage, user }: Chat) => {
  const navigate = useNavigate();

  const location = useLocation();
  const [userFromServer, loading] = useDocumentData(lastMessage?.from ? doc(db, 'users', user) : null);

  const handleChatClick = () => {
    if (!user) return;

    navigate(`/messages?uid=${user}`);
    console.log(user);
  };

  return (
    <div
      onClick={handleChatClick}
      className={`p-[12px] w-full h-[73px] border-b border-b-gray-200 hover flex items-center cursor-pointer gap-2 `}
    >
      <Avatar name={userFromServer?.name} photoURL={userFromServer?.photoURL} />
      <div className="flex flex-col">
        <span className="font-medium text-sm">{userFromServer?.name}</span>
        <p className="text-sm font-normal text-gray-600 truncate max-w-[200px]">
          {lastMessage?.text || 'No messages yet'}
        </p>
      </div>
    </div>
  );
};
