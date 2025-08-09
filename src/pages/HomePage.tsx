import { SendPost } from '../ui/SendPost';
import { PostList } from '../ui/PostList';

import { Spinner } from '../ui/Spiner'; // если хочешь показывать спиннер во время загрузки

export const HomePage = () => {
  return (
    <div className="w-full min-h-screen">
      {<SendPost />}
      <PostList />
    </div>
  );
};
