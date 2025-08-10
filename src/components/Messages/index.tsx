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

  return (
    <div
      onClick={handleChatClick}
      className={`p-[12px] w-full h-[73px] border-b border-b-gray-200 hover flex items-center cursor-pointer gap-2 ${
        user == uidFromUrl ? 'border-r-2 border-[#40C0E7]' : ''
      }`}
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
