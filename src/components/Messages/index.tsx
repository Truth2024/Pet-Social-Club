import { useNavigate, useSearchParams } from 'react-router-dom';
import { Avatar } from '../../ui/Avatar';

import { useDocumentData } from 'react-firebase-hooks/firestore';
import { db, doc } from '../../firebase/firebaseConfig';
import type { ChatMessage } from '../../types/Chat';

export const Messages = ({ lastMessage, user }: ChatMessage) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const uidFromUrl = searchParams.get('uid');
  const [userFromServer] = useDocumentData(lastMessage?.from ? doc(db, 'users', user) : null);

  const handleChatClick = () => {
    if (!user) return;

    navigate(`/messages?uid=${user}`);
    console.log(user);
  };
  const avatarSize = user == uidFromUrl ? 'w-[40px] h-[40px] bg-white' : 'w-[40px] h-[40px]';

  return (
    <div
      onClick={handleChatClick}
      className={`p-[12px] w-full h-[73px] border-b border-b-gray-200 flex items-center cursor-pointer gap-2 ${
        user == uidFromUrl ? 'bg-[#40C0E7] text-white' : 'hover'
      }`}
    >
      <Avatar name={userFromServer?.name} photoURL={userFromServer?.photoURL} size={avatarSize} />
      <div className="flex flex-col">
        <span className="font-medium text-sm text-black">{userFromServer?.name}</span>
        <p
          className={`text-sm md:text-base font-normal text-gray-600 truncate max-w-[200px] ${
            user == uidFromUrl ? ' text-white' : ''
          }`}
        >
          {lastMessage?.text || 'No messages yet'}
        </p>
      </div>
    </div>
  );
};
