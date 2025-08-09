import { useDocumentData } from 'react-firebase-hooks/firestore';
import { Avatar } from '../Avatar';
import { Spinner } from '../Spiner';
import { db, doc } from '../../firebase/firebaseConfig';
import { useAuth } from '../../components/AuthContext';
import { deleteDoc } from 'firebase/firestore';
import React from 'react';

type Post = {
  id: string;
  authorId: string;
  createdAt: number;
  text: string;
};
interface Props {
  tweet: Post;
  postId: string;
}

export const Tweet = ({ tweet, postId }: Props) => {
  const { user, loading } = useAuth();
  const [userFromServer, userLoading] = useDocumentData(doc(db, 'users', tweet.authorId));
  const [deleting, setDeleting] = React.useState(false);

  const handleDelete = async () => {
    if (!window.confirm('delete this post?')) return;
    setDeleting(true);
    try {
      await deleteDoc(doc(db, 'posts', postId));
      console.log('Deleted successfully');
    } catch (error) {
      console.error('Ошибка удаления:', error);
    } finally {
      setDeleting(false);
    }
  };
  if (userLoading || loading) return <Spinner />;
  return (
    <li className="relative border-b border-gray-200 flex w-full hover">
      <div className="p-4 flex w-full">
        <div className="w-[40px] mr-0.5 md:mr-2">
          {<Avatar name={userFromServer?.name} photoURL={userFromServer?.photoURL} />}
        </div>

        <div className="flex-1 flex-col">
          <div className="flex items-baseline">
            <span className="md:text-black text-base font-medium md:font-bold mr-0.5 md:mr-2">
              @{userFromServer?.name || '...'}
            </span>
            <span className="text-sm text-gray-400">{new Date(tweet.createdAt).toLocaleString()}</span>
          </div>

          <p className="text-sm max-w-[430px] mt-1">{tweet.text}</p>
        </div>

        {user?.uid === tweet.authorId && (
          <div className="absolute right-6 top-4">
            <button onClick={handleDelete} disabled={deleting} className="text-red-500 hover:text-red-700 text-sm">
              {deleting ? 'destroy...' : 'delete'}
            </button>
          </div>
        )}
      </div>
    </li>
  );
};
