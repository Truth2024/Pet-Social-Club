import { useDocumentData } from 'react-firebase-hooks/firestore';
import { BackButton } from '../ui/BackButton';
import { PostList } from '../ui/PostList';
import { SendPost } from '../ui/SendPost';
import { Spinner } from '../ui/Spiner';
import { db, doc } from '../firebase/firebaseConfig';
import { useAuth } from '../components/AuthContext';
import { Navigate } from 'react-router-dom';

const ProfilePage = () => {
  const { user, loading, error } = useAuth();

  const [userData, userLoading] = useDocumentData(user ? doc(db, 'users', user.uid) : null);

  if (userLoading || loading) {
    return <Spinner />;
  }
  if (error) return <div>{error.message} </div>;
  if (!user) return <Navigate to="/login" />;
  return (
    <div className="w-full min-h-screen">
      <div className="p-4 h-[53px] flex items-center gap-4">
        <BackButton />
        <span className="text-xl font-bold pb-[1px]">{userData?.name}</span>
      </div>
      <SendPost />
      <PostList uid={user.uid} />
    </div>
  );
};

export default ProfilePage;
