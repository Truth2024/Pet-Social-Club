import { SendPost } from '../ui/SendPost';
import { PostList } from '../ui/PostList';

export const HomePage = () => {
  return (
    <div className="w-full min-h-screen">
      {<SendPost />}
      <PostList />
    </div>
  );
};
