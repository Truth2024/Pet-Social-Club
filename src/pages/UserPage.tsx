import { useLocation, useParams } from 'react-router-dom';
import { PostList } from '../ui/PostList';
import type { UserType } from '../types/Auth/user';
import { UserAbout } from '../components/UserAbout';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { db, doc } from '../firebase/firebaseConfig';
import { Spinner } from '../ui/Spiner';

const UserPage = () => {
  const { uid } = useParams<{ uid: string }>();
  const location = useLocation();
  const userFromState = location.state as UserType | undefined;

  // Загружаем только если нет userFromState
  const [userFromServer, loading] = useDocumentData(!userFromState && uid ? doc(db, 'users', uid) : null);

  const user = userFromState || userFromServer;

  if (!user && loading) {
    return <Spinner />;
  }

  return (
    <div className="w-full min-h-screen">
      {user && <UserAbout userInfo={user} />}
      <PostList uid={uid} />
    </div>
  );
};

export default UserPage;
