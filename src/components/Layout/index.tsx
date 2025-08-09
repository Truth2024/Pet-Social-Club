import { Outlet, useLocation, useSearchParams } from 'react-router-dom';
//COMPONENTS
import { Authorization } from '../Authorization';
import { Header } from '../Header';
import { Chat } from '../Chat';

export const Layout = () => {
  const [searchParams] = useSearchParams();
  const location = useLocation();

  const uid = searchParams.get('uid');
  const isMessagesPage = location.pathname === '/messages' && uid;
  return (
    <>
      <Header />
      <Authorization />
      <main className="main overflow-auto border-r border-gray-300">
        <Outlet />
      </main>
      {isMessagesPage && <Chat />}
    </>
  );
};
