import { useCollection } from 'react-firebase-hooks/firestore';
import { useAuth } from '../components/AuthContext';
import { collection, db, orderBy, query, where } from '../firebase/firebaseConfig';
import { Messages } from '../components/Messages';
import type { Chat } from '../types/Chat';

const MessagePage = () => {
  const { user } = useAuth();

  const [snapshot, loading, error] = useCollection(
    user
      ? query(
          collection(db, 'chats'),
          where('members', 'array-contains', user.uid),
          orderBy('lastMessage.createdAt', 'desc'),
        )
      : null,
  );

  if (loading)
    return (
      <div className="flex h-[200px] items-center justify-center w-[300px] space-x-1">
        <div className="h-2 w-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '0s' }}></div>
        <div className="h-2 w-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        <div className="h-2 w-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
      </div>
    );
  if (error) return <div className="text-center">Error: {error.message}</div>;
  if (!snapshot || (snapshot.empty && !loading)) return <div className="text-center">No chats yet</div>;

  const chats: Chat[] = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<Chat, 'id'>),
  }));

  return (
    <div className="w-full md:min-h-screen h-[200px]">
      <ul className="divide-y divide-gray-200">
        {chats.map((chat) => {
          const otherUserId = chat.members.find((memberId) => memberId !== user?.uid);
          const otherUser = otherUserId ? otherUserId : '';
          return <Messages key={chat.id} user={otherUser} lastMessage={chat.lastMessage} />;
        })}
      </ul>
    </div>
  );
};

export default MessagePage;
