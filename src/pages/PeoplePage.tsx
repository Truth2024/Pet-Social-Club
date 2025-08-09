import { People } from '../components/People';
import { useNavigate } from 'react-router-dom';
import { Spinner } from '../ui/Spiner';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { db, collection } from '../firebase/firebaseConfig';
import { useAuth } from '../components/AuthContext';

const PeoplePage = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const handleNavigate = (id: string, user: any) => {
    navigate(`${id}`, { state: user });
  };
  const [users, loadingUsers] = useCollectionData(collection(db, 'users'));
  if (loadingUsers || loading) return <Spinner />;

  return (
    <div className="w-full min-h-screen">
      <ul>
        {users?.map((u) => (
          <People
            onClick={() => handleNavigate(u.uid, u)}
            name={u.name}
            photoURL={u.photoURL}
            itsYou={user?.uid == u.uid}
          />
        ))}
      </ul>
    </div>
  );
};

export default PeoplePage;
