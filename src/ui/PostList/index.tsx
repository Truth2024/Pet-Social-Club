import { collection, query, where, orderBy } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import { db } from '../../firebase/firebaseConfig';
import { Spinner } from '../Spiner';
import { Tweet } from '../Tweet';

interface PostListProps {
  uid?: string;
}

type Post = {
  id: string;
  authorId: string;
  createdAt: number;
  text: string;
};

export const PostList = ({ uid }: PostListProps) => {
  const postsRef = collection(db, 'posts');

  const q = uid
    ? query(postsRef, where('authorId', '==', uid), orderBy('createdAt', 'desc'))
    : query(postsRef, orderBy('createdAt', 'desc'));

  const [snapshot, loading, error] = useCollection(q);

  if (loading) return <Spinner />;
  if (error) return <p className="text-red-500">Error: {error.message}</p>;
  if (!snapshot?.docs.length) return <p className="text-gray-500 mt-4 text-center">No posts yet</p>;

  // Преобразуем snapshot.docs в массив Post с id
  const posts: Post[] = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<Post, 'id'>),
  }));

  return (
    <ul className="min-h-[300px] flex flex-col">
      {posts.map((post) => (
        <Tweet key={post.id} tweet={post} postId={post.id} />
      ))}
    </ul>
  );
};
